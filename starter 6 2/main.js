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

const unZip = IOhandler.unzip(zipFilePath, pathUnzipped);
const grayUnzip = IOhandler.grayScale(zipFilePath, pathProcessed);

unZip 
    .then((result) => {
        console.log(result);
        resolve(grayUnzip);
    })
    .then((result) => {
        console.log("Saved to", result);
    })
    .catch((err) => {
        console.log("Err", err)
    });