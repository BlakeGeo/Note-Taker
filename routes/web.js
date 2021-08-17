const express = require('express');
const path = require('path');
const router = express.Router();

// Notes page route
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', '/notes.html'));
});

// Homepage route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', '/index.html'));
});

module.exports = router;