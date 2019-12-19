const db = require('../data/dbConfig');

module.exports={
    getUsers,
    getUserById,
    getUsersBy,
    registerUser,
}

function getUsers() {
    return db("users").select("id", "username", "department");
}

function getUserById(id) {
    return db("users")
        .select("id", "username", "department")
        .where({ id })
        .first();
}

function getUsersBy(filter) {
    return db("users")
        .select("id", "username", "password", "department") // make sure to return the password
        .where(filter);
}

function registerUser(user) {
    return db("users")
    .insert(user, "id")
    .then(ids => {
        const [id] = ids;
        return getUserById(id);
    });
}