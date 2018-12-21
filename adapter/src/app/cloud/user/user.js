/**
 * ----------------------------------------
 * Functions
 * ----------------------------------------
 */
const session = (token) => {
    let qry = new Parse.Query(Parse.Session);
    qry.equalTo('sessionToken', token);
    qry.include('user');

    return qry.first({useMasterKey: true});
};

const sessions = (lookup) => {
    let qry = new Parse.Query(Parse.Session);
    qry.ascending('createdAt');
    qry.limit(1000);

    if (typeof lookup === 'string') {
        return session(lookup).then((result) => {

            if (result) {
                qry.equalTo('user', result.get('user'));
            } else {
                qry.equalTo('objectId', 'none');
            }

            return qry.find({useMasterKey: true});
        });
    } else {
        qry.equalTo('user', lookup);
        return qry.find({useMasterKey: true});
    }
};

const user_role_set = (req, res, max = 5) => {

    if (!req.user) {
        res.error(400, 'user is a required parameter');
    }

    let roles = req.params['roles'] || [];
    roles     = (Array.isArray(roles)) ? [roles] : roles;
    roles     = roles.join(',');
    roles     = String(roles).toLowerCase();
    roles     = roles.split(',');

    req.params['roles'] = [];

    let qry = new Parse.Query(Parse.Role);
    qry.find().then((results) => {
        if (results.length > 0) {
            results.forEach((role) => {
                let name = String(role.get('name')).toLowerCase();
                let lvl = role.get('level');
                if (max < lvl) { return; }

                if (roles.indexOf(name) > -1) {
                    role.getUsers().add([req.user]);
                    req.params.roles.push(role);
                } else {
                    role.getUsers().remove([req.user]);
                }
            });

            return Parse.Object.saveAll(results, {useMasterKey: true});
        } else {
            let user = req.user.toJSON();
            delete user.ACL;
            res.success(user);
        }
    }).then(() => {

        let robj = {};

        req.params.roles.forEach((role) => {
            robj[String(role.get('name')).toLowerCase()] = {
                objectId    : role.id,
                level       : role.get('level')
            };
        });

        req.user.set('roles', robj);

        return req.user.save(null, {useMasterKey: true});

    }).then((u) => {
        res.success(u);
    }).catch((err) => {
        res.error(err.message);
    });
};

const user_save = (req, res) => {
    let session    = (typeof req.user !== 'undefined') ? req.user.getSessionToken() : undefined;
    let params     = Object.assign({}, req.params);
    let roles      = (params.hasOwnProperty('roles')) ? params.roles : undefined;
    let obj        = new Parse.User();

    delete params.roles;

    Object.keys(params).forEach((k) => { obj.set(k, params[k]); });

    // Current user lvl
    //let lvl = (typeof req.user !== 'undefined') ? _.max(_.map(_.values(req.user.get('roles')), 'level')) : 5;
    let lvl = (typeof req.user !== 'undefined') ? _.maxBy(Object.values(req.user.get('roles')), 'level') : 5;

    obj.save(null, {sessionToken: session}).then((user) => {
        if (roles) {
            let r = Object.assign({}, req);
            r['user'] = user;
            r['params']['roles'] = roles;
            user_role_set(r, res, lvl);
        } else {
            user = user.toJSON();
            delete user.ACL;
            delete user.__type;
            delete user.className;

            res.success(user);
        }
    }).catch((err) => {
        res.error(400, err.message);
    });
};

/**
 * ----------------------------------------
 *  Cloud Definitions
 * ----------------------------------------
 */
Parse.Cloud.define('sign-in', (req, res) => {

    if (!req.params.hasOwnProperty('username')) {
        res.error(400, 'username is a require parameter');
        return;
    }

    if (!req.params.hasOwnProperty('password')) {
        res.error(400, 'password is a required parameter');
        return;
    }

    Parse.User.logIn(req.params.username, req.params.password).then((user) => {
        user = user.toJSON();
        delete user.ACL;
        res.success(user);
    }).catch((err) => {
        res.error(401, err.message);
    });
});

Parse.Cloud.define('sign-out', (req, res) => {
    let lookup;
    let user = (req.params.hasOwnProperty('user')) ? req.params.user : undefined;
    if (user) {
        lookup = new Parse.User();
        lookup.set('objectId', user);
    } else {
        lookup = (req.params.hasOwnProperty('session')) ? req.params.session : undefined;
    }

    if (!lookup) {
        res.error(400, 'provide the `session` or `user` parameter');
    }

    sessions(lookup).then((results) => {
        return Parse.Object.destroyAll(results, {useMasterKey: true});
    }).then(() => {
        res.success({message: 'OK'});
    }).catch((err) => {
        res.error(err.code, err.message);
    });
});

Parse.Cloud.define('sign-up', (req, res) => {
    req.params['roles'] = ['User'];
    user_save(req, res);
});

Parse.Cloud.define('session', (req, res) => {
    if (!req.params.hasOwnProperty('session')) {
        res.error(400, 'session is a required parameter');
        return;
    }

    session(req.params.session).then((result) => {
        if (result) {
            let user = result.get('user');
            user = user.toJSON();
            user['sessionToken'] = req.params.session;
            delete user.ACL;
            res.success(user);
        } else {
            res.error(400, 'invalid session token');
        }
    }).catch((err) => {
        res.error(400, err.message);
    });
});

Parse.Cloud.define('user-save', user_save);

Parse.Cloud.define('user-delete', (req, res) => {

    if (typeof req.user === 'undefined') {
        res.error(403, 'permission denied');
        return;
    }

    req.user.fetch().then((user) => {
        let lvl       = 100;
        let roles     = user.get('roles');
        //let perm      = (_.max(_.map(_.values(roles), 'level')) >= lvl);
        let perm      = (_.maxBy(Object.values(roles), 'level') >= lvl);

        if (perm !== true) {
            res.error(403, 'permission denied');
            return;
        }

        if (!req.params.hasOwnProperty('user')) {
            res.error(400, 'user is a required parameter');
            return;
        }

        let obj = new Parse.User();
        obj.set('objectId', req.params.user);
        obj.destroy({useMasterKey: true}).then(() => {
            res.success({message: 'OK'});
        }).catch((err) => {
            res.error(400, err.message);
        });
    });
});

/**
 * ----------------------------------------
 *  Before Save
 * ----------------------------------------
 */
Parse.Cloud.beforeSave(Parse.User, (req, res) => {
    let fields    = [];
    let obj       = req.object.toJSON();

    if (!obj.hasOwnProperty('objectId')) {
        fields = ['email', 'username', 'password'];
    }

    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        if (!req.object.get(field)) {
            res.error(`${field} is a required parameter`);
            return;
        }
    }

    res.success();
});

/**
 * ----------------------------------------
 *  After Delete
 * ----------------------------------------
 */
Parse.Cloud.afterDelete(Parse.User, (req) => {
    sessions(req.object).then((results) => {
        return Parse.Object.destroyAll(results, {useMasterKey: true});
    });
});
