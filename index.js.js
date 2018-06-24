/*jslint node: true */
"use strict";
const fs = require('fs');
const path = require('path');
const getFolderSize = require('get-folder-size');

const DEFAULT_MOVIE_DIR = `M:/Video/Movies`;

fs.readdir(DEFAULT_MOVIE_DIR, (error, folders) => {
  if (error) return console.log(error);

  folders.forEach(folder => {

    let folderDir = path.join(MOVIE_DIR, folder);

    // Remove empty directories
    // removeEmptyDirectory(folderDir);

    // Rename movie directories with YTS
    renameMovieFolder(folderDir);
  });

});

function renameMovieFolder(folderDir) {
  let name = path.basename(folderDir);
  let isYTS = /\[YTS.AG\]/ig.test(name);
  if (isYTS) {
    let newName = name.replace(' [YTS.AG]', '');
    let newFolderDir = path.join(path.dirname(folderDir), newName);
    fs.renameSync(folderDir, newFolderDir);
    console.log(`* Renamed ${name} to ${newName}`);
  }
}

function removeEmptyDirectory(folderDir) {
  getFolderSize(folderDir, (err, size) => {
    if (err) console.log('ERROR: ', err);

    if (size === 0) {

      let otherFolder = path.join(folderDir, 'Other');
      if (fs.existsSync(otherFolder)) {
        fs.rmdirSync(otherFolder);
      }
      fs.rmdirSync(folderDir);
      console.log('-', file, ' size: ', size, ' bytes');
    }
  });
}