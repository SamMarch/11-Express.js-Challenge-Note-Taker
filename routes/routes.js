const fs = require("fs");
const path = require("path");
const { readDb, writeDb } = require("../utils/databaseaccess");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  // Setup notes variable
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    // var notes = JSON.parse(data);

    // API ROUTES
    // ========================================================

    // Setup the /api/notes get route
    app.get("/api/notes", async function (req, res) {
      const notes = await readDb();
      // Read the db.json file and return all saved notes as JSON.
      res.json(notes);
    });

    // Setup the /api/notes post route
    app.post("/api/notes", async function (req, res) {
      // Receives a new note, adds it to db.json, then returns the new note
      try {
        const notes = await readDb();
        let newNote = req.body;
        newNote.id = uuidv4();
        notes.push(newNote);
        console.log("Added new note: " + newNote.title);
        await writeDb(notes);
        res.sendStatus(201);
      } catch (error) {
        res.sendStatus(500);
      }
    });

    // Retrieves a note with specific id
    app.get("/api/notes/:id", function (req, res) {
      // display json for the notes array indices of the provided id
      res.json(notes[req.params.id]);
    });

    // Deletes a note with specific id
    app.delete("/api/notes/:id", async function (req, res) {
      try {
        const notes = await readDb();
        const i = notes.findIndex((note) => note.id === req.params.id);
        notes.splice(i, 1);
        console.log("Deleted note with id " + req.params.id);
        await writeDb(notes);
        res.sendStatus(200);
      } catch (error) {
        res.sendStatus(500);
      }
    });

    // VIEW ROUTES
    // ========================================================

    // Display notes.html when /notes is accessed
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // Display index.html when all other routes are accessed
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });
};
