// declare db
const db = require('../config/db');

const foodRecipe = {
    // router model list
    selectAll: () => {
        return new Promise((resolve, reject) => {
            const query = {
                text: 'SELECT * FROM tb_recipes'
            }
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },

    // user create user
    createRecipe: ({title, ingredients, video, photo, user_id}) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `INSERT INTO tb_recipes (title, ingredients, video, photo, user_id)
                        VALUES
                        ($1, $2 ,$3 ,$4, $5)`,
                values: [title, ingredients, video, photo, user_id]
            }
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },

    // router spesifik search

    // usahakan parameter didalamnya jangan sama dengan nama field table   
    searchRecipe: (title) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `SELECT * FROM tb_recipes where title ILIKE $1`,
                values: [`%${title}%`]
            }
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },
    // by id
    selectDetail: (id) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `SELECT * FROM tb_recipes where id =$1`,
                values: [id],
            }
            db.query(query , (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
        })
    },
    editRecipe: ({id, title , ingredients , video , photo}) => {
        return new Promise((resolve, reject) => {
            const updated_at = 'now()';
            const query = {
                text: `UPDATE tb_recipes SET 
                        title = $1, 
                        ingredients = $2, 
                        video = $3, 
                        photo  = $4,
                        updated_at = $5
                        WHERE id = $6`,
                values: [title, ingredients, video, photo, updated_at, id],
            }
            db.query(query , (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `DELETE FROM tb_recipes WHERE id = $1`,
                values: [id],
            }
            db.query(query ,(err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    // implementation of pagination
    sorting: (perPage, offset) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `SELECT * FROM  tb_recipes ORDER BY id ASC LIMIT $1 OFFSET $2`,
                values: [perPage, offset],
            }
            db.query(query ,(err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
        })
    }
};
module.exports = foodRecipe;
