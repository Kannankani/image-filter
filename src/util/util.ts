import fs from 'fs';
// import path = require('path');
import path from 'path';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async (resolve, reject) => {

        var ret = false;
        const photo = await Jimp.read(inputURL)
                .catch(err => {reject(err); ret = true });
        if (ret)
            return;

        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+outpath, (img)=>{
            resolve(__dirname+outpath);
        });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}


export async function cleanup () {
    const currentDir = __dirname + '/tmp';
    const ageSeconds = 3600;

    console.log ('starting cleanup for: ' + currentDir);
    var filesInDir = fs.readdirSync(currentDir);
    var now = new Date().getTime()

    filesInDir.forEach(function (file) {
        const currentFile = path.join(currentDir, file);
        const stat = fs.statSync(currentFile);
        const mtime = stat.mtime.getTime();
        const expirationTime = (mtime + (ageSeconds * 1000));
        if (!stat.isDirectory() && now > expirationTime) {
            
            try {
                fs.unlinkSync(currentFile);
                console.log ("rm file: " + file);
            }
            catch {

            }
            
        }
    })
}