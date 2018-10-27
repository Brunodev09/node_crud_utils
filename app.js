const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
let user = os.userInfo();

const args = yargs
    .command('add', 'Adds a new note', {
        title: {
            describe: 'Title of your note',
            demand: true,
            alias: 't' //provides shortcut for the user, instead of --title it goes to -t
        }, 
        body: {
            describe: 'Body of note',
            demand: true,
            alias: 'b'

        }
    })
    .command('list', 'Lists current file content')
    .command('read', 'Reads a specific note on the file', {
        title: {
            describe: 'Title of the note you want to read',
            demand: true,
            alias: 'r'
        }
    })
    .command('remove', 'Removes a specific note from file', {
        title: {
            describe: 'Title of the note you want to delete',
            demand: true,
            alias: 'rm'
        }
    })
    .help()
    .argv; //Custom yargs config

arguments();



function arguments() {
    // console.log('Natural node processess >>', process.argv); //First two paramaters are not important. Every paramater you insert through the terminal (like in C/C++) gets stored into the > 3 slot. node app.js command
    // console.log('Yargs processess version >>', yargs.argv);

    // let myParam = process.argv[2]; Use this if not using Yargs
    let myParam = args._[0]; // Commands are located on the first item of Yargs array
    console.log('Command running >>', myParam);

    //COULD USE yargs.argv.title and ...body
    if (myParam === 'add') {
        notes.addNote(args.title, args.body);
    } else if (myParam === 'list') {
        notes.getAll();
    } else if (myParam === 'removeAll') {
        notes.removeAll();
    } else if (myParam === 'read') {
        notes.getNote(args.title);
    } else if (myParam === 'remove') {
        notes.removeNote(args.title);
    } else console.log('Command not recognized!');

}



