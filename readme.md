# Set File Paths
### *Package Name*: set-file-paths
### *Child Type*: Shell
### *Platform*: All
### *Required*: Required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose
This shell module names the directories used for unzipping, altering, and re-zipping the D2L export files. It ensures each run has it's own empty directories to start with, so old courses run through the tool don't get joined/mixed.

## How to Install

```
npm install set-file-paths
```

## Run Requirements
This child module requires the following fields in the course.info object:
* `fileName`
* `unzippedPath`
* `processedPath`
* `uploadZipPath`


## Options
None

## Outputs
This shell module doesn't create any new properties on the course object, but it does update the following properties located in course.info:
* `unzippedPath`
* `processedPath`
* `uploadZipPath`

## Process
1. Check if directory exists
2. If yes, add `-copy` to it & try again. Else, save the dir name to the course object

## Log Categories
This module does not use course.log anywhere.


## Requirements
Set folder names used in pre-import so we always have a clean slate for unzipping, updating, and re-zipping. Allows us to run the same course multiple times without cleaning up these directories.