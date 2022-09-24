// declare db
const db = require('../config/db');

const userModel = {
    // router model list
    selectAll: () => {
        return new Promise((resolve, reject) => {
            const query = {
                text: 'SELECT * FROM tb_users ORDER by id ASC',
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
    createUser: (name, email, password, phone) => {
        return new Promise((resolve, reject) => {
            const level = 1;
            const is_active = 'false';
            const query = {
                text: `INSERT INTO tb_users 
                            (name, email, password, phone, level, is_active)
                            VALUES ($1, $2, $3, $4, $5, $6)`,
                values: [name, email, password, phone, level, is_active],
            }

            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },
    register: ({name, email, password, phone, photo}) => {
        return new Promise((resolve, reject) => {
            const level = 1;
            const is_active = 'false';
            const query = {
                text: `INSERT INTO tb_users 
                            (name, email, password, phone, photo, level, is_active)
                            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                values: [name, email, password, phone, photo, level, is_active],
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
    searchUser: (getName) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `SELECT * FROM tb_users WHERE name ILIKE $1`,
                values: [`%${getName}%`]
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
                text: `SELECT * FROM tb_users WHERE id = $1`,
                values: [id],
            }
            db.query(query, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            })
        })
    },
    editUser: ({id, name, email, phone, photo}) => {

        return new Promise((resolve, reject) => {
            const updated_at = 'now()';
            const query = {
                text: `UPDATE tb_users SET 
                        name = $1, 
                        email = $2, 
                        phone = $3, 
                        photo = $4, 
                        updated_at = $5 
                        where id = $6`,
                values: [name, email, phone, photo, updated_at, id],
            }
            db.query(query, (err, result) => {
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
                text: `DELETE FROM tb_users WHERE id = $1`,
                values: [id]
            }
            db.query(query, (err, result) => {
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
                text: `SELECT * FROM tb_users order by id ASC LIMIT $1 OFFSET $2`,
                values: [perPage, offset]
            }
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    checkEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = {
                text: `SELECT * FROM tb_users WHERE email = $1`,
                values: [email],
            }
        db.query(query, (err, res) => {
            if (err) {
                reject(err);
            } 
            resolve(res);
        })
        })
    }
};
module.exports = userModel;
