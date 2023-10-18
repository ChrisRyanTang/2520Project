// /*
//  * Project: Milestone 1
//  * File Name: IOhandler.js
//  * Description: Collection of functions for files input/output related operations
//  *
//  * Created Date:
//  * Author:
//  *
//  */

// /**
//  * Description: decompress file from given pathIn, write to given pathOut
//  *
//  * @param {string} pathIn
//  * @param {string} pathOut
//  * @return {promise}
//  */
const fs = require("fs");
const unzipper = require("unzipper");
const PNG = require("pngjs").PNG;
const path = require("path");
const { WriteStream, ReadStream } = require("fs");

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

// /**
//  * Description: read all the png files from given directory and return Promise containing array of each png file path
//  *
//  * @param {string} path
//  * @return {promise}
//  */

const readDir = (dir) => {
  return new Promise((resolve, reject) => {
      fs.readdir(dir)
      .then((files) => {
        const filePng = files.filter((files) => files.extname(files).toLowerCase() === ".png");
        const filePath = filePng.map((files) => path.join(dir, files));
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

const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(new PNG())
      .on("parsed", function () {
        for (let y = 0; y < this.height; y++) {
          for (let x = 0; x < this.width; x++) {
            const idx = (this.width * y + x) << 2;
            const gray =
              (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
            this.data[idx] = gray;
            this.data[idx + 1] = gray;
            this.data[idx + 2] = gray;
          }
        }
        this.pack()
          .pipe(fs.createWriteStream(pathOut))
          .on("finish", () => {
            resolve(pathOut);
          })
          .on("error", (err) => {
            reject("Nothing", err);
          });
      });
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
