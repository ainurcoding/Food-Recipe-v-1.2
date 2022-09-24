const fs = require('fs');
const userModel = require('../model/user.model');
const recipeModel = require('../model/foodRecipe.model');

const remove = async (req, res, next) => {
    const id = req.params.id;
    const data = await userModel.selectDetail(id)
    if (data.rows[0].photo === 'undefined') {
        next();
    } else {
        
        // res.json();
        const file = data.rows[0].photo
        console.log(file);
        fs.unlink(`./public/img/${String(file)}`, (err) => {
            if (err) {
                console.log(err);
                next()
            }
        })
        next()
    }
}



module.exports = remove;