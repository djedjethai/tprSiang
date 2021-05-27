// __mocks__/fs.js
'use strict';

const path = require('path');

const fs = jest.createMockFromModule('fs');

	const writeFileMock = jest
		.spyOn(fs, 'writeFile')
		.mockImplementationOnce(
		(filename, input, options, callback) => {
      			return null;
    		});

	const readFileMock = jest
		.spyOn(fs, 'readFile')
		.mockImplementationOnce(
		(filename, options, callback) => {
      			return 'some data';
    		});


fs.writeFile = writeFileMock;
fs.readFile = readFileMock;

module.exports = fs;
