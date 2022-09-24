const fs = require('fs');

const recipeModel = require('../model/foodRecipe.model');

const removeRecipe = async (req, res, next) => {
    const id = req.params.id;
    const data = await recipeModel.selectDetail(id)
    if (data.rows[0].photo) {
        const file = data.rows[0].photo
        console.log(file);
        fs.unlink(`./public/img/${String(file)}`, (err) => {
            if (err) {
                // console.log(err);
                next()
            }
        })
        next()
        
        
    } else {
        next();
        
    }
}

module.exports = removeRecipe;