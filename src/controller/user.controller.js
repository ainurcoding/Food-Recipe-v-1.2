const userModel = require('../model/user.model');

const userModelController = {
    // methond
    listUser: (req, res) => {
        userModel
            .selectAll()
            .then((results) => {
                res.json(results);
            }).catch((err) => {
                res.json(err);
            });
    },
    insertUser: (req, res) => {
        const { name, email, password, phone, photo } = req.body;
        userModel
            .createUser(name, email, password, phone, photo)
            .then((results) => {
                res.json(results);
            }).catch((err) => {
                res.json(err);
            });
    },

    nameUser: (req, res) => {
        const getName = req.params.name;
        userModel
            .searchUser(getName)
            .then((results) => {
                res.json(results);
            }).catch((err) => {
                res.json(err);
            });
    },
    detail: (req, res) => {
        const id = req.params.id;
        userModel
            .selectDetail(id).then((results) => {
                res.json(results);
            }).catch((err) => {
                res.json(err)
            })
    },
    updateUser: (req, res) => {
        // get data
        const id = req.params.id;
        const photo = req.file.filename;
        const { name, email, phone } = req.body;

        // integrated data
        const data = {
            id, name, email, phone, photo
        }

        // send data to model
        userModel
            .editUser(data)
            .then((results) => {
                res.json(results)
            }).catch((err) => {
                res.json(err)
            })
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        userModel
            .delete(id)
            .then((results) => {
                res.json(results)
            }).catch((err) => {
                res.json(err)
            })
    },
    // implementation of pagination
    sortUser: (req, res) => {
        const currentPage = req.query.page || 1 ;
        const perPage = req.query.perPage || 2 ;
        const offset = (currentPage - 1) * perPage;
        userModel
            .sorting(perPage, offset)
            .then((results) => {
                res.json(results.rows)
            }).catch((err) => {
                res.json(err);
            })
    }

}


module.exports = userModelController;
