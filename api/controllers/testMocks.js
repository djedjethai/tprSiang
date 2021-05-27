// FileSummarizer.js
'use strict';

const fs = require('fs');
// jest.mock('fs')


function summarizeFilesInDirectorySync(directory) {
	// return fs.writeFile(directory, 'what ever', {encoding:'utf8', flag: 'w'}, (err) => {
	// 	return null
	// })
	return fs.readFile(directory, 'utf8', (err, dt) => {
		return dt
	})

}

// function summarizeFilesInDirectorySync(directory) {
//   return fs.readdirSync(directory).map(fileName => ({
//     directory,
//     fileName,
//   }));
// }


exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;
