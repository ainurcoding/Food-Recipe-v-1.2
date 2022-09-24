// declare express
const express = require('express');

// The following variables call several methods from the user controller
const { listRecipe, insertRecipe, nameRecipe, updateRecipe, detail, deleteRecipe, sortRecipe } = require('../controller/foodRecipe.controller.js');

const router = express.Router();

// require middleware
const jwtAuth = require('../middleware/jwtAuth');
const upload = require('../middleware/upload');
const removeRecipe = require('../middleware/removeRecipe');
console.log(removeRecipe);

router.get('/', (req, res) => {
    const data = 'test routes';
    res.json(data);
});

router
    // endpoint cannot be the same
    // router user
    /**
     * this path handles all user data
     */
    .get('/foodRecipe', jwtAuth, listRecipe)
    .get('/foodRecipe/:title', jwtAuth, nameRecipe)
    .get('/foodRecipe/id/:id', jwtAuth ,detail)
    .get('/foodRecipe-sort', jwtAuth, sortRecipe)
    .post('/foodRecipe1/insert', jwtAuth, insertRecipe)
    .put('/foodRecipe/update', jwtAuth,  updateRecipe)
    .delete('/foodRecipe/delete/:id', jwtAuth, deleteRecipe)

    // image version
    .post('/addRecipe', jwtAuth, upload, insertRecipe)
    // delete
    .delete('/deleteRecipe/:id', removeRecipe , deleteRecipe)
    // update
    .put('/updateRecipe/:id', removeRecipe, upload, updateRecipe);



module.exports = router;
