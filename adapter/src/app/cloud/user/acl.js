
Parse.Cloud.define('acl', (req, res) => {
    let user = req.user;
    let ACL  = new Parse.ACL();

    ACL.setPublicReadAccess(true);
    ACL.setRoleWriteAccess("Moderator", true);
    ACL.setRoleWriteAccess("Administrator", true);

    if (typeof user !== 'undefined') {
        ACL.setWriteAccess(user.id, true);
    }

    res.success(ACL);
});
