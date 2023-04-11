const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require("../modeles/Notes")
const { body, validationResult } = require('express-validator');
const { findById } = require("../modeles/Notes");
// Get all the notes using GET
router.get('/fetchallnotes', fetchuser, async (req, res) => {
        try {
                const notes = await Notes.find({ user: req.user.id });
                res.send(notes);
                //res.send('Hello World!')            
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Some Error occurred")
        }
})
//Save all notes
router.post('/addnote', fetchuser, [
        body('title', "please enter a valid title").isLength({ min: 3 }),
        body('description', "please enter a valid descripyion").isLength({ min: 5 }),
], async (req, res) => {
        try {
                const { title, description, tag } = req.body;
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                }
                const note = new Notes({
                        title, description, tag, user: req.user.id
                })
                const saveNote = await note.save();
                res.json(saveNote);
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Some Error occurred")
        }
})
// Update notes
router.put('/updatenote/:id', fetchuser,
        async (req, res) => {
                try {
                const { title, description, tag } = req.body;
                // create a new note object
                const newNote = {};
                if (title) { newNote.title = title };
                if (description) { newNote.description = description };
                if (tag) { newNote.tag = tag };
                // Find the note to be updated
                let note = await Notes.findById(req.params.id);
                if (!note) { return res.status(404).send("Not Found") }

                if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not Allowed")
                }
                note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
                res.json({ note })
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Some Error occurred")          
        }
        })
        // Delete notes
        router.delete('/deletenote/:id', fetchuser,
        async (req, res) => {
                
                try {
                // Find the note to be updated
                let note = await Notes.findById(req.params.id);
                 if (!note) { return res.status(404).send("Not Found") }
                // Allow deletion only if user owen Notes        
                if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not Allowed")
                }
                note = await Notes.findByIdAndDelete(req.params.id)
                res.json({"Success":"Note has been deleted", note:note})
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Some Error occurred")          
        }
        })
        
module.exports = router