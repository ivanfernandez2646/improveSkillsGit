function doInit(e) {
    /* Dinamics global vars */
    days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    listDates = document.getElementById("listDates");
    btAddDate = document.getElementById("btAddDate");
    textAddNote = document.getElementById("textAddNote");
    listNotes = document.getElementById("listNotes");
    titleNote = document.getElementById("titleNote");
    textNote = document.getElementById("textNote");
    btAddNote = document.getElementById("btAddNote");

    /* No-dinamics global vars */
    selectedDateElement = undefined;
    selectedDateValue = undefined;
    countNotesSelected = undefined;

    /* Listeners */
    btAddDate.addEventListener("click", addDate);
    textAddNote.addEventListener("change", onChangeDate);
    btAddNote.addEventListener("click", addNote);
    titleNote.addEventListener("input", checkBtAddNote);
    textNote.addEventListener("input", checkBtAddNote);

    getDates();
}

/*
    Functions for dates
*/
function getDates() {
    listDates.innerHTML = "";
    fetch("/dates", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then((resp) => {
        if (resp.status == 200) {
            return resp.json();
        } else {
            throw new Error(resp.status);
        }
    }).then((json) => {
        //Converts date format(yyyy-MM-dd) to this format Ex: "lunes, 11 de abril de 2020"
        for (var i = 0; i < json["itemsDate"].length; i++) {
            json["itemsDate"][i].dateString = formatDateForListDates(new Date(json["itemsDate"][i].date));
        }

        var datesHTML = dateTemplate({
            listDatesToInsert: json
        });
        listDates.innerHTML += datesHTML;

        /* Set the event for onClick in the elements */
        var dates = document.getElementsByClassName("date");
        for (let i = 0; i < dates.length; i++) {
            dates[i].addEventListener("click", onClickItemListDates);
            dates[i].myParam = dates;
        };

        /* Set the event for remove a date in the button X */
        var deleteDateClass = document.getElementsByClassName("deleteDate");
        for (let i = 0; i < deleteDateClass.length; i++) {
            deleteDateClass[i].addEventListener("click", deleteDate);
        };
    }).catch((error) => {
        console.log(error);
    })
}

//Fetch request to add the new date. Then, we refresh the dates
function addDate() {
    var selectedDateFromDatePicker = new Date(textAddNote.value).toISOString().slice(0, 10);

    fetch("/dates", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "date": selectedDateFromDatePicker
        })
    }).then((resp) => {
        if (resp.status == 200) {
            getDates();
            textAddNote.value = "";
            btAddDate.disabled = true;
            listNotes.innerHTML = "";
            selectedDateValue = undefined;
            selectedDateElement = undefined;
            countNotesSelected = undefined;
            checkBtAddNote();
        } else {
            throw new Error(resp.status);
        }
    }).catch((error) => {
        console.log(error);
    })
}

function deleteDate(evt) {
    fetch("/dates/" + selectedDateValue, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => {
        if (resp.status == 200) {
            evt.target.parentNode.parentNode.remove();
        } else {
            throw new Error(resp.status);
        }
    }).catch((error) => {
        console.log(error);
    })
}

//When put a date in input date
function onChangeDate() {
    btAddDate.disabled = false;
}

function onClickItemListDates(evt) {
    var currentTarget = evt.currentTarget;
    var dates = currentTarget.myParam;
    selectedDateElement = currentTarget;
    selectedDateValue = currentTarget.id;

    for (let j = 0; j < dates.length; j++) {
        if (dates[j].classList.contains("active") && dates[j] != currentTarget) {
            dates[j].classList.remove("active");
            dates[j].getElementsByClassName("deleteDate")[0].disabled = true
        }
    }

    if (currentTarget.classList.contains("active")) {
        currentTarget.classList.remove("active");
        currentTarget.getElementsByClassName("deleteDate")[0].disabled = true
        selectedDateElement = undefined;
        selectedDateValue = undefined;
        countNotesSelected = undefined;
        listNotes.innerHTML = "";
    } else {
        currentTarget.classList.add("active");
        currentTarget.getElementsByClassName("deleteDate")[0].disabled = false
        countNotesSelected = parseInt(currentTarget.getElementsByClassName("countNotes")[0].innerText.split(" ")[0]);
        getNotes();
    }

    checkBtAddNote();
}

//Returns date in format (lunes, 11 de mayo de 2020) from "2020-05-11"
function formatDateForListDates(date) {
    var dateBuffer = [];

    dateBuffer.push(getDayOfWeekString(date.getDay()));
    dateBuffer.push(", ");
    dateBuffer.push(date.getDate());
    dateBuffer.push(" de ");
    dateBuffer.push(getMonthOfDayString(date.getMonth()));
    dateBuffer.push(" de ");
    dateBuffer.push(date.getFullYear());

    return dateBuffer.join("");
}

function getDayOfWeekString(index) {
    return days[index];
}

function getMonthOfDayString(index) {
    return months[index];
}

/*
    Functions for notes
*/
function getNotes() {
    listNotes.innerHTML = "";
    fetch("/dates/" + selectedDateValue + "/notes", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then((resp) => {
        if (resp.status == 200) {
            return resp.json();
        } else {
            throw new Error(resp.status);
        }
    }).then((json) => {
        for (var i = 0; i < json["notes"].length; i++) {
            var dateMalFormed = new Date(json["notes"][i].datetime);
            dateMalFormed.setMonth(dateMalFormed.getMonth() + 1);
            dateMalFormed.setHours(dateMalFormed.getHours() - 2);
            json["notes"][i].datetimeString = formatDateForTitleOfNote(dateMalFormed);
        }

        console.log(json)
        var notesHTML = noteTemplate({
            listNotesToInsert: json
        });
        listNotes.innerHTML += notesHTML;

        /* Set the event for remove a note in the button X */
        var deleteNoteClass = document.getElementsByClassName("deleteNote");
        for (let i = 0; i < deleteNoteClass.length; i++) {
            deleteNoteClass[i].addEventListener("click", deleteNote);
        };

        /* Set the event for change title in a note */
        var titleNoteClass = document.getElementsByClassName("titleNote");
        for (let i = 0; i < titleNoteClass.length; i++) {
            titleNoteClass[i].addEventListener("blur", updateNote);
        };

        /* Set the event for change text in a note */
        var textNoteClass = document.getElementsByClassName("textNote");
        for (let i = 0; i < textNoteClass.length; i++) {
            textNoteClass[i].addEventListener("blur", updateNote);
        };

        /* Set the event for change background colour in a note */
        var changeBackgroundNoteClass = document.getElementsByClassName("changeBackgroundNote");
        for (let i = 0; i < changeBackgroundNoteClass.length; i++) {
            changeBackgroundNoteClass[i].addEventListener("change", changeBackgroundNote);
        };
    }).catch((error) => {
        console.log(error);
    })
}

function addNote(evt) {
    fetch("/dates/" + selectedDateValue + "/notes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": titleNote.value,
            "text": textNote.value,
            "color": "#f1c40f"
        })
    }).then((resp) => {
        if (resp.status == 200) {
            getNotes();
            countNotesSelected += 1;
            selectedDateElement.children[1].innerText = countNotesSelected + " " + selectedDateElement.children[1].innerText.split(" ")[1];
        } else {
            throw new Error(resp.status);
        }
    }).catch((error) => {
        console.log(error);
    })
}

function updateNote(evt){
    var currentNote = evt.currentTarget;
    
    while(!currentNote.classList.contains('note')){
        currentNote = currentNote.parentNode;
    }

    fetch("/dates/" + selectedDateValue + "/notes/" + currentNote.id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": currentNote.children[2].children[0].children[0].innerText,
            "text": currentNote.children[2].children[1].innerText,
            "color": colorToHex(currentNote.style.backgroundColor)
        })
    }).then((resp) => {
        if (resp.status == 200) {
            getNotes();
        } else {
            throw new Error(resp.status);
        }
    }).catch((error) => {
        console.log(error);
    })
}

function deleteNote(evt) {
    var currentNote = evt.currentTarget.parentNode.parentNode;
    fetch("/dates/" + selectedDateValue + "/notes/" + currentNote.id, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "currentCountNotes": countNotesSelected
        })
    }).then((resp) => {
        if (resp.status == 200) {
            currentNote.remove();
            countNotesSelected -= 1;
            selectedDateElement.children[1].innerText = countNotesSelected + " " + selectedDateElement.children[1].innerText.split(" ")[1];
        } else {
            throw new Error(resp.status);
        }
    }).catch((error) => {
        console.log(error);
    })
}

function formatDateForTitleOfNote(datetime) {
    var dateString = addZero(datetime.getDate()) + "/" + addZero(datetime.getMonth()) + "/" + datetime.getFullYear() +
        " " + addZero(datetime.getHours()) + ":" + addZero(datetime.getMinutes()) + ":" + addZero(datetime.getSeconds());

    return dateString;
}

function addZero(i) {
    if (i.toString().length == 1) {
        return "0" + i;
    }
    return i;
}

function checkBtAddNote() {
    if (titleNote.value == "" || textNote.value == "" || selectedDateValue == undefined) {
        btAddNote.disabled = true;
    } else {
        btAddNote.disabled = false;
    }
}

function changeBackgroundNote(evt) {
    evt.currentTarget.
        parentNode.
        parentNode.
        parentNode.
        parentNode.style.backgroundColor  = evt.currentTarget.value;

    updateNote(evt);
}

function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16).padStart(6, '0');
};

document.addEventListener("DOMContentLoaded", doInit(event));