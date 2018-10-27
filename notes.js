const fs = require('fs');

let fetchNotes = () => {
    try {
        let parsed = fs.readFileSync('notes-data.json');
        return JSON.parse(parsed);
    }catch (e) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


let addNote = (title, body) => {

    let notes = fetchNotes();
    let note = {
        title: title,
        body: body
    };

    let duplicates = notes.filter((n) => {
        return n.title === title; //Will either return true and store in array, or false and not store in array
    });

    if (duplicates.length === 0) {
        notes.push(note);
        saveNotes(notes);
        console.log('Note ' + note.title + ' has been successfully created');
    } else console.log('There is already a note with this title. Please reformulate the title name.');

};


let getAll = () => {
    let total = fetchNotes();
    if (total === []) console.log('File is empty.');
    for (let i = 0; i < total.length; i++) console.log((i+1) + ') ' + ' >> ' + ' ' + total[i].title);
};

let getNote = (title) => {
    let notes = fetchNotes();
    let readNotes = notes.filter((note) => {
        return note.title === title;
    });
    if (readNotes === []) console.log('No notes with this title could be found.');
    else {
        console.log('Note requested title >> ', readNotes[0].title); //No need to loop through because we can't have 2 notes with the same title
        console.log('Note requested body >> ', readNotes[0].body);
    }
};


let removeAll = () => {
    let total = [];
    saveNotes(total);
    console.log('All notes have been wiped.');
};


let removeNote = (title) => {
    let notes = fetchNotes();
    let notesToRemove = notes.filter((note) => {
        return note.title !== title;
    });
    saveNotes(notesToRemove);
    console.log('Note with the title ' + title + ' have been removed');
};


module.exports  = {
    addNote: addNote,
    getAll: getAll,
    removeAll: removeAll,
    getNote: getNote,
    removeNote: removeNote
};
