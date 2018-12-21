
/**
 * @description Creates an Parse.ACL object with the specified write and read permissions
 *
 * @author Cam Tullos {cam@tullos.ninja}
 * @since 2.0.0
 *
 * @param write {Array|String|Parse.User} The roles and/or Parse.User Object to grant write privileges to. Valid values: public | Administrator | Moderator | Publisher | Contributor
 * @param read {String|Parse.User} The roles and/or Parse.User Object to grant read privileges to. Valid values: public | Administrator | Moderator | Publisher | Contributor
 *
 * @example create(['Administrator', 'Moderator', USER], ['public'])
 *
 * @returns {Parse.ACL}
 */
const create = (write, read) => {
    read = read || ['public'];
    read = (!_.isArray(read)) ? [read] : read;

    write = write || ['public'];
    write = (!_.isArray(write)) ? [write] : write;

    let ACL  = new Parse.ACL();

    read.forEach((item) => {
        if (typeof item !== 'string') {
            ACL.setReadAccess(item, true);
        } else {
            if (item === 'public') {
                ACL.setPublicReadAccess(true);
            } else {
                ACL.setRoleReadAccess(item, true);
            }
        }
    });

    write.forEach((item) => {
        if (typeof item !== 'string') {
            ACL.setWriteAccess(item, true);
        } else {
            if (item === 'public') {
                ACL.setPublicWriteAccess(true);
            } else {
                ACL.setRoleWriteAccess(item, true);
            }
        }
    });

    return ACL;
};

module.exports = create;
