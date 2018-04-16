/******
localstorage management Start
******/
//log localstorage.notes if any
if (localStorage.notes) {
    console.log('js start--fetch localstorage JSON String: ');
    console.log(localStorage.notes);
} else {
    console.log('localStorage.notes is empty');
}

//grab ls if any...
var notesBackup = localStorage.notes;
//console to see if notesbackup exists
if (notesBackup) {
    var arrNotes = JSON.parse(notesBackup);
    //console.log('arrNotes: ', arrNotes);
    buildClassList(arrNotes);
} else {
    console.log('notesBackup does not exist at this point');
    var arrNotes = [];
    console.log('arrNotes: localStorage Empty');
}

//send arrNotes to backup
function updateBackup(array) {
    localStorage.setItem('notes', JSON.stringify(array));
}
/******
localstorage management End
******/

//base variables
var form = document.querySelector('form');
var textArea = form.querySelector('[name=textarea]');
var date = form.querySelector('[name=date]');

/******
Validation Portion Start
******/
//set min date to today(prevent past date submit)
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
today = today.getFullYear() + '-' + mm + '-' + dd;
date.setAttribute("min", today);

//grab info from form after submit
form.addEventListener('submit', function(event) {
    //prevent submission
    event.preventDefault();
    if (textArea == "" || textArea == null) {
        alert('textarea empty');
        return false;
    }
    if (date == "" || date == null) {
        alert('textarea empty');
        return false;
    }
    console.log('textarea: ', textArea.value, ' date: ', date.value);
    //create note object.
    var newNotesObj = {
        textRem: textArea.value,
        dateRem: date.value,
        idRem: arrNotes.length + 1
    }
    arrNotes.push(newNotesObj);
    console.log('newNotesObj: ', newNotesObj, 'arrNotes: ', arrNotes);
    updateBackup(arrNotes);
    location.reload();
});
/******
Validation Portion End
******/

/****
 * DOM note display management start
 * */
//generate html note
function createNote(newNotesObj) {
    //creat main panel
    var divNoteCasing = document.createElement('div');
    divNoteCasing.classList.add("col-sm-3", "panel", "panel-default");

    //put date as panel head
    var divDateHead = document.createElement('div');
    divDateHead.textContent = newNotesObj.dateRem;
    divDateHead.classList.add("panel-heading");
    //add delete button
    var btnDel = document.createElement('button');
    btnDel.textContent = '✖';
    btnDel.addEventListener('click', deleteNote);
    btnDel.classList.add("btn", "btn-danger", "pull-right");
    //append btn to heading
    divDateHead.append(btnDel);
    divNoteCasing.append(divDateHead);

    //put body with text
    var divNoteCasingBody = document.createElement('div');
    divNoteCasingBody.classList.add("panel-body");
    // var pText = document.createElement('p');
    // pText.textContent = newNotesObj.textRem;
    divNoteCasingBody.append(newNotesObj.textRem);
    divNoteCasing.append(divNoteCasingBody);

    //console.log('divNote Created: ', divNoteCasing);
    return divNoteCasing;
}

//get arrNotes and make a note for each iteration
function buildClassList(arrNotes) {
    var divList = document.querySelector('.list-reminder-note');
    for (var i = 0; i < arrNotes.length; i++) {
        var note = createNote(arrNotes[i]);
        //console.log('note: ' + i + ' fetched:' + JSON.stringify(note));
        divList.append(note);
    }
}

function deleteNote(event) {
    // console.log(event);
    var deleteBtn = event.target;
    var note = deleteBtn.parentNode.parentNode;
    //console.log(note);
    var notes = document.querySelectorAll('.panel-default');
    //set i for splice index value
    for (var i = 0; i < notes.length; i++) {
        if (notes[i] == note) {
            //console.log(notes[i], note);
            break;
        }
    }
    //text from html target element
    textDiv = note.childNodes[1].childNodes[0].textContent;
    // console.log('textDiv: ', textDiv);
    //date from html target element
    dateDiv = note.childNodes[0].childNodes[0].textContent;
    // console.log('dateDiv: ', dateDiv);
    //arrnotes text
    arrNotesText = arrNotes[i].textRem;
    //arrnotes date
    arrNotesDate = arrNotes[i].dateRem;
    // console.log(arrNotesText, arrNotesDate);
    // console.log(typeof textDiv, typeof dateDiv);
    console.log('arrNotes pre: ', arrNotes);
    if (arrNotesText == textDiv && arrNotesDate == dateDiv) {
        arrNotes.splice(i, 1);
        console.log('arrNotes pre: ', arrNotes);
    } else {
        console.log('no match');
    }
    /******/
    //update the localStorage
    updateBackup(arrNotes);
    location.reload();
}
/****
 * DOM note display management end
 * */