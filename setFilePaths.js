/* Module Description */
/* Establishes the directories used by other modules */

/* Put dependencies here */
const fs = require('fs');

module.exports = (course, stepCallback) => {

    var setDirectory = (filepath, folderName, cb) => {
        fs.readdir(filepath, (err, files) => {
            if (err) {
                course.fatalError(err);
                stepCallback(err, course);
            } else {
                if (files.includes(folderName)) {
                    setDirectory(filepath, folderName + '-Copy', cb);
                } else {
                    cb(`${filepath}\\${folderName}`);
                }
            }
        });
    };

    var setZipPath = (filepath, fileName, cb) => {
        fs.readdir(filepath, (err, files) => {
            if (err) {
                course.fatalError(err);
                stepCallback(err, course);
            } else {
                if (files.includes(fileName)) {
                    setZipPath(filepath, fileName.split('.zip')[0] + '-Copy.zip', cb);
                } else {
                    cb(`${filepath}\\${fileName}`);
                }
            }
        });
    };

    /* Set the filepath we will be unzipping to */
    setDirectory(course.info.unzippedPath, course.info.fileName.split('.zip')[0], (newDir) => {
        course.info.unzippedPath = newDir;
        setDirectory(course.info.processedPath, course.info.fileName.split('.zip')[0], (newDir) => {
            course.info.processedPath = newDir;
            setZipPath(course.info.uploadZipPath, course.info.fileName, (newDir) => {
                course.info.uploadZipPath = newDir;
                stepCallback(null, course);
            });
        });
    });
};
