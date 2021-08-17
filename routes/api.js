const express = require('express');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const router = express.Router();

const dbPath = path.join(__dirname, '..', 'db', 'db.json');

// converts JSON string into an array
function getNotes() {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8')) || [];
} 

// Saves the notes into the db.json file
function saveNotes(content) {
    fs.writeFileSync(dbPath, content);
}

router.get('/api/notes', (req, res) => {
    const notes = getNotes();

    res.json(notes);
});

router.post('api/notes', (req, res) => {
    const notes = getNotes();

    const text = req.body.text;
    const title = req.body.title;
    const id = uuid.v4;

    notes.push({
        text,
        title,
        id,
    });

    saveNotes(JSON.stringify(notes));

    res.json({
        data: "successfully saved"
    })
});



module.exports = router;