const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require('uuid');
const router = express.Router();

const dbPath = path.join(__dirname, "..", "db", "db.json");

function getNotes() {
    return JSON.parse(fs.readFileSync(dbPath, "utf-8")) || [];
}

function saveNotes(content){
    fs.writeFileSync(dbPath, content);
}

router.get("/api/notes", (req, res) => {
    const notes = getNotes();

    res.json(notes);
});

router.post("/api/notes", (req, res) => {

    const notes = getNotes();

    const text = req.body.text;
    const title = req.body.title;
    const id = uuid.v4();

    notes.push({
        text,
        title,
        id,
    });

    saveNotes(JSON.stringify(notes));

    res.json({
        data: "success"
    })
});

router.delete('/api/notes/:id', (req, res) => {
    const notes = getNotes();

    const filtered = notes.filter((note) => {
        return note.id !== req.params.id
    })

    saveNotes(JSON.stringify(filtered));

    res.json({
        data: "deleted"
    })
})

module.exports = router;