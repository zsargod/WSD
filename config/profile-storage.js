'use strict';

const storage = [];

/**
 * The function will save the user's profile to the temporary storage object if key id does not exists
 * @param  profile   Object type user profile
 * @return           Object type user profile
 */
function save(profile) {
    if(!profile || !profile.id) return;

    let userProfile = this.fetch(profile.id);

    if(!userProfile) {
        storage.push(profile);
    }

    return profile;
}
/**
 * The function will fetch users profile Object from the temporary storage object by the key id
 * @param  id   String id of the record
 * @return      If found the profile Object if not, it will be undefined
 */
function fetch(id) {
    if(id) {
        return storage.find(profile => profile.id === id);
    }
}

module.exports = {
    save,
    fetch
};