const express = require('express');
const app = express();
const port = process.env.PORT || 80;

const firebase = require('./firebase.js');

app.use(express.static("public"));
app.use(express.json());

//GET /dates
app.get('/dates', (req, res) =>
    firebase.getDates().then((dates) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(dates);
    }).catch((error) => {
        res.status(404);
        res.send(error);
    })
);

//POST /dates
app.post('/dates', (req, res) => {
    var date = new Date(req.body.date);
    firebase.addDate(date).then((ok) => {
        if (ok) {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.send();
        } else {
            throw new Error(res.status);
        }
    }).catch((error) => {
        res.status(404);
        res.send(error);
    })
});

//DELETE /dates/:date
app.delete('/dates/:date', (req, res) => {
    var date = new Date(req.params.date);
    firebase.deleteDate(date).then((ok) => {
        if (ok) {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.send();
        } else {
            throw new Error(res.status);
        }
    }).catch((error) => {
        res.status(404);
        res.send(error);
    })
});

//GET /dates/:date/notes
app.get('/dates/:date/notes', (req, res) => {
    var date = new Date(req.params.date);
    firebase.getNotes(date).then((notes) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(notes);
    }).catch((error) => {
        res.status(404);
        res.send(error);
    })
});

//POST /dates/:date/notes
app.post('/dates/:date/notes', async (req, res) => {
    var date = new Date(req.params.date);
    var countNotesForADate = await firebase.getCountNotesForADate(date);
    var note = {
        "id": countNotesForADate,
        "title": req.body.title,
        "text": req.body.text,
        "datetime": new Date(),
        "color": req.body.color
    }

    firebase.addNote(date, note, true).then((ok) => {
        if (ok) {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.send();
        } else {
            throw new Error(res.status);
        }
    }).catch((error) => {
        res.status(404);
        res.send(error);
    })
});

//PUT /dates/:date/notes/:id
app.put('/dates/:date/notes/:id', async (req, res) => {
    var date = new Date(req.params.date);
    var idNote = req.params.id;
    var note = {
        "id": idNote,
        "title": req.body.title,
        "text": req.body.text,
        "datetime": new Date(),
        "color": req.body.color
    }

    firebase.addNote(date, note, false).then((ok) => {
        if (ok) {
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.send();
        } else {
            throw new Error(res.status);
        }
    }).catch((error) => {
        res.status(404);
        res.send(error);
    })
});

//DELETE /dates/:date/notes/:id
app.delete('/dates/:date/notes/:id', async(req, res) => {
    var date = new Date(req.params.date);
    var idNote = req.params.id;
    var currentCountNotes = req.body.currentCountNotes;

    firebase.deleteNote(date, idNote, currentCountNotes).then((ok) => {
        if(ok){
            res.setHeader("Content-Type", "application/json");
            res.status(200);
            res.send();
        }else{
            throw new Error(res.status);
        }
    }).catch((error) => {
        res.status(404);
        res.send(error);
    })
});

app.listen(port, () => console.log(`Example app listening at ${port}`));