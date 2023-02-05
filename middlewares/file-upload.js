const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
}
const fileUpload = multer({
    limits: 5000,       // Storage size in bytes
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images')
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE[file.mimetype];
            // called call back
            cb(null, uuidv4() + '.' + ext)
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE[file.mimetype];
        let error = isValid ? null : new Error('Invalid Mime type')
        cb(error, isValid);
    }

})

module.exports = fileUpload;