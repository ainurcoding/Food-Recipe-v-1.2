// import multer
const multer = require('multer');
const crypto = require('crypto');
// import path
const path = require('path');

let id = crypto.randomBytes(10).toString('hex');
// for file managemet
const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/img');
        },
        filename: (req, file, cb) => {
            const baseName = path.basename(file.originalname);
            const ext = path.extname(file.originalname);
            const nameSplit = baseName.split(`${ext}`);
            console.log(baseName);
            var filename = nameSplit[0] + '-' + id + '' + ext;
            cb(null, filename)
        },
    }),

    // limit multer default by byte
    limits : {
        fileSize: 1000000
    },
    // validasi extension
    fileFilter: (req, file, cb) => {
        // console.log(req.files.fileSize);
        const ext = path.extname(file.originalname);
        // console.log(ext);
        if (ext === '.jpg' || ext === '.png') {
            cb(null, true);
        } else {
            const error = {
                message: 'file must be jpg or png'
            }
            cb(error, false);
        }
    }
})

// for middleware
const upload = (req, res, next) => {
    
    const multerSingle = multerUpload.single('photo');
    
    multerSingle(req, res, (err) => {
        if (err) {
            if(err.code === 'LIMIT_FILE_SIZE') {
                err.message = `File ${err.field} too large, max 1 mb`;
            }
            res.json({
                message: 'fail upload',
                error: err
            })
        } else {
            // res.on('data', (chunk) => {
            //     console.log(chunk.toString())
            // })
            
            
            

            // jangan menggunakan res.json untuk penanganan error
            next();
            // res.json({
            //     message: 'success upload image',
            // })
        }
    })
}

module.exports = upload;


