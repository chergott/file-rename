/*jslint node: true */
"use strict";
const fs = require('fs');
const path = require('path');

const DIRECTORY = 'C:/Users/CHergott/Downloads/_qBittorrent/makes'

// iterate through each folder in directory
const folders = fs.readdirSync(DIRECTORY);

folders.forEach(folderName => {

  const folderPath = path.join(DIRECTORY, folderName);

  const isFolder = fs.lstatSync(folderPath).isDirectory();
  if (! isFolder) return;

  // rename files
  const files = fs.readdirSync(folderPath);

  files.forEach(oldFileName => {
    const newFileName = toNiceFileName(oldFileName);

    const oldFilePath = path.join(folderPath, oldFileName);
    const newFilePath = path.join(folderPath, newFileName);

    if (oldFilePath !== newFilePath) {
      fs.renameSync(oldFilePath, newFilePath);
      console.log(`- Renamed file ${oldFileName} to ${newFileName}`);
    }
  });

  // rename folder
  const newFolderName = toNiceFileName(folderName);

  const oldFolderPath = folderPath;
  const newFolderPath = path.join(path.dirname(folderPath), newFolderName);

  if (oldFolderPath !== newFolderPath) {
    fs.renameSync(oldFolderPath, newFolderPath);
    console.log(`Renamed folder ${folderName} to ${newFolderName}`);
  }
});


function toNiceFileName(filename = '') {
  filename = cleanFilename(filename);
  filename = filename.toLowerCase().replace(/[\s_]/, '-');
  return filename;
}

function cleanFilename(filename = '') {
  // remove extra extension if it exists
  const extension = path.extname(filename);
  const basename = path.basename(filename, extension).replace(extension, '');

  return `${basename}${extension}`;
}