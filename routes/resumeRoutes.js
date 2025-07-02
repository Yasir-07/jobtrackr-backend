const express = require('express');
const router = express.Router();
const multer = require('multer');
const protect = require('../middlewares/authMiddleware');
const parseResumeAndMatch = require('../controllers/resumeController');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({storage: storage});

router.post('/uploadmatch', protect, upload.single('resume'), parseResumeAndMatch);

module.exports = router;