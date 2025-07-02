const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');

router.get('/dashboard', protect, (req, res) => {
    res.json({
        message: "This is a protected route.",
        user: req.user,
    })
})

module.exports = router;