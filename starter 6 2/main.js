const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

IOhandler.unzip(zipFilePath, pathUnzipped)
  .then((unZipResult) => {
    console.log(unZipResult);
    return IOhandler.readDir(pathUnzipped);
  })
  .then((pngFiles) => {
    console.log("Found png files", pngFiles);

    const grayscalePromises = pngFiles.map((pngFile) => {
      const outFile = path.join(pathProcessed, path.basename(pngFile));
      return IOhandler.grayscale(pngFile, pathProcessed);
    });
    return Promise.all(grayUnzip);
  })
  .then((result) => {
    console.log("Saved to", result);
  })
  .catch((err) => {
    console.log("Err", err);
  });
