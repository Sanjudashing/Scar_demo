const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./public/files");
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    },
});

const filefilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null,true);
    } else {
        cb(null,false);
    }
}
const upload = multer({
    storage: multerStorage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: filefilter
});

module.exports = upload