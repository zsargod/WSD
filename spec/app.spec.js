const profileStorage = require('../config/profile-storage');

describe('Profile storage functionality', () => {
    const profile = {
        id: 1
    };

    it('Save profile', () => {
        expect(profileStorage.save(profile)).toEqual(profile);
    });

    it('Save undefined profile', () => {
        expect(profileStorage.save()).toEqual(undefined);
    });

    it('Save empty profile', () => {
        expect(profileStorage.save({})).toEqual({});
    });

    it('Get user profile', () => {
        expect(profileStorage.fetch(1)).toEqual(profile);
    });

    it('Get non existing profile', () => {
        expect(profileStorage.fetch(10)).toEqual(undefined);
    });
});