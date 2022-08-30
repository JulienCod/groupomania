import multer from 'multer';

//configuration des format d'image qui seront reconnu
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now()+ '.' + extension);
    }
});
export default multer({storage: storage}).single('image');