var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBgqLwvfDDJIn-cOEFid640Y-9u6yYR1Hg",
    authDomain: "servicionotasv2.firebaseapp.com",
    databaseURL: "https://servicionotasv2.firebaseio.com",
    projectId: "servicionotasv2",
    storageBucket: "servicionotasv2.appspot.com",
    messagingSenderId: "936343143308",
    appId: "1:936343143308:web:1a6f5914bd6d7f84938ca9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
dbCloudFirestore = firebase.firestore();

module.exports.getDates = async function () {
    var res = {};
    res.itemsDate = [];

    var dateCloudFirestore = {};
    var dateFinalSpain = {};
    await dbCloudFirestore.collection("itemsFecha").orderBy("date").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dateCloudFirestore = new Date(doc.data().date.seconds * 1000);
                dateFinalSpain = new Date(dateCloudFirestore.getFullYear(), dateCloudFirestore.getMonth(), dateCloudFirestore.getDate() + 1)
                    .toISOString().slice(0, 10);

                res.itemsDate.push({
                    "date": dateFinalSpain,
                    "countNotes": doc.data().countNotes
                });
            });
            console.log("getDates() completed successfully!!");
        }).catch(function (error) {
            console.log("ERROR. getDates()", error);
        });

    return res;
}

module.exports.addDate = async function (date) {
    var ok = true;

    await dbCloudFirestore.collection("itemsFecha").doc(date.toISOString()).set({
        "date": date,
        "countNotes": 0
    }).then(() => {
        console.log("Date added successfully!!");
    }).catch(function (error) {
        console.log("ERROR. addDate()", error);
        ok = false;
    });

    return ok;
}

module.exports.deleteDate = async function (date) {
    var ok = true;

    await dbCloudFirestore.collection("itemsFecha").doc(date.toISOString()).delete()
        .then(function () {
            console.log("Date deleted successfully!");
        }).catch(function (error) {
            console.log("ERROR. deleteDate()", error);
            ok = false;
        });

    return ok;
}

module.exports.getNotes = async function (date) {
    var res = {};
    res.notes = [];

    await dbCloudFirestore.collection("itemsFecha").doc(date.toISOString()).get()
        .then(function (doc) {
            if (doc.exists) {
                var notes = doc.data().notes;
                var dateCloudFirestore = {};

                if (notes) {
                    for (var [key, value] of Object.entries(notes)) {
                        dateCloudFirestore = new Date(value.datetime.seconds * 1000);
                        var offset = new Date().getTimezoneOffset();
                        dateFinalSpain = new Date((dateCloudFirestore * 1) + ((-(offset)) * 60 * 1000));

                        res.notes.push({
                            "id": key,
                            "title": value.title,
                            "text": value.text,
                            "datetime": dateFinalSpain,
                            "color": value.color
                        });
                    }
                }
                console.log("getNotes() completed successfully!!");
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("ERROR. getNotes()", error);
        });

    return res;
}

module.exports.addNote = async function (date, note, isNewNote) {
    var ok = true;
    var noteToAdd = "notes." + note.id;

    await dbCloudFirestore.collection("itemsFecha").doc(date.toISOString()).update({
        [noteToAdd]: note
    }).then(async function () {
        if(isNewNote){
            await refreshCountNotesForADate(date, note.id);
        }
        console.log("Note added successfully!");
    }).catch(function (error) {
        console.log("ERROR. addNote()", error);
        ok = false;
    });

    return ok;
}

module.exports.deleteNote = async function (date, idNote, currentCountNotes) {
    var ok = true;
    var noteToDelete = "notes." + idNote;
    
    await dbCloudFirestore.collection("itemsFecha").doc(date.toISOString()).update({
        [noteToDelete] : ok = firebase.firestore.FieldValue.delete() 
    }).catch(function (error) {
        console.log("ERROR. deleteNote()", error);
    });

    if(!ok){
        ok = false;
    }else{
        await refreshCountNotesForADate(date, currentCountNotes - 1);
        ok = true;
        console.log("Note deleted successfully!");
    }

    noteToDelete = undefined;
    return ok;
}

module.exports.getCountNotesForADate = async function (date) {
    var countNotes = 0;

    await dbCloudFirestore.collection("itemsFecha").doc(date.toISOString()).get()
        .then(function (doc) {
            if (doc.exists) {
                countNotes = doc.data().countNotes + 1;
            } else {
                console.log("No such document!");
                countNotes = -1;
            }
        }).catch(function (error) {
            console.log("ERROR. getCountNotesForADate()", error);
            countNotes = -1;
        });

    return countNotes;
}

async function refreshCountNotesForADate(date, countNotes) {
    var ok = true;

    await dbCloudFirestore.collection("itemsFecha").doc(date.toISOString()).update({
        "countNotes": countNotes
    }).then(function () {
        console.log("Count Notes refresh successfully!");
    }).catch(function (error) {
        console.log("ERROR. refreshCountNotesForADate()", error);
        ok = false;
    });

    return ok;
}