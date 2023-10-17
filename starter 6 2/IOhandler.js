/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(unzipper.Extract({ path: pathOut }))
      .on("close", () => {
        resolve("Extraction operation complete");
      })
      .on("error", () => {
        reject();
      });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    return fs.readdir(dir)
    .then((files) => {
      const filePng = files.filter((files.extname === ".png").lowerCase());
      const filePath = filePng.map((file));
      resolve(filePath);
    })
      .catch((err) => {
      console.log("Something went wrong", err);
      reject(err);
    });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

const unzipper = require("unzipper");
const fs = require("fs/promises");
const PNG = require("pngjs").PNG;
const path = require("path");

const grayScale = (pathIn, pathOut) => {};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
