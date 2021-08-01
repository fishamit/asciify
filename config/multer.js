const multer = require('multer');

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './static/images');
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

module.exports = upload;
