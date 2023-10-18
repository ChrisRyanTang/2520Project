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
    const readStream = fs.createReadStream(pathIn);
    const extract = unzipper.Extract({ path: pathOut });

    readStream.pipe(extract);

    extract.on("close", () => {
      resolve("extracted");
    });

    extract.on("error", (err) => {
      reject("not extracted", err);
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
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.log("Error reading directory", err);
        reject(err);
      } else {
        const pngFiles = files.filter((file) => {
          return path.extname(file).toLowerCase() === ".png";
        });
        const filePath = pngFiles.map((file) => path.join(dir, file));
        resolve(filePath);
      }
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
    const readStream = fs.createReadStream(pathIn);
    const png = new PNG();

    readStream.pipe(png);

    png.on("parsed", function () {
      for (let y = 0; y < this.height; y++) {
        const idx = (this.width * y + x) << 2;
        const gray =
          (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
        this.data[idx] = gray;
        this.data[idx + 1] = gray;
        this.data[idx + 2] = gray;
      }

      const writeStream = fs.createWriteStream(pathOut);
      png.pack().pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("completed I hope");
        resolve(pathOut);
      });

      writeStream.on("error", (err) => {
        console.log("UGGGGGGGH", err);
        reject(err);
      });
    });
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
