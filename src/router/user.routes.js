// declare express
const express = require('express');

// The following variables call several methods from the user controller
const { listUser , insertUser, nameUser, updateUser, detail, deleteUser, sortUser } = require('../controller/user.controller');
const { register, login, deleteFile } = require('../controller/auth.controller');


const { application } = require('express');

const app = express();
const cors = require('cors');



const router = express.Router();
// middleware
const {isAdmin, isCustomer} = require('../middleware/authorization');
const upload = require('../middleware/upload');
const remove = require('../middleware/remove');
const jwtAuth = require('../middleware/jwtAuth');

router.get('/', cors(), (req, res) => {
    const data = 'test routes';
    res.json(data);
});

router
    // endpoint cannot be the same
    // router user
    /**
     * this path handles all user data
     */
    .get('/users', jwtAuth, isCustomer,  listUser)
    .get('/user/:name', nameUser)
    .get('/user/id/:id', detail)
    .post('/user', insertUser)
    .put('/user/update', updateUser)
    // .delete('/user/delete/:id', deleteUser)
    .get('/sort', sortUser)
    // register
    .post('/register', upload, register)
    // login
    .post('/login', login)
    // delete
    .delete('/delete/:id', remove, deleteUser)
    // update
    .put('/update/:id', remove, upload, updateUser);

    

module.exports = router;
