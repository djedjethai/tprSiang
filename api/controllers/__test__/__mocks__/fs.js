// __mocks__/fs.js
'use strict';

const path = require('path');

const fs = jest.createMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}


// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
// const cbfunc = jest.fn((err) => null)
// function writeFile(directoryPath, cbfunc)

const writeFileMock = jest
		.spyOn(fs, 'writeFile')
		.mockImplementationOnce(
		(filename, input, options, callback) => {
      			callback(null);
    		});

fs.__setMockFiles = __setMockFiles;
fs.writeFile = writeFileMock;

module.exports = fs;
