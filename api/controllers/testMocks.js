// FileSummarizer.js
'use strict';

const fs = require('fs');

function summarizeFilesInDirectorySync(directory) {
	return fs.writeFile(directory, 'what ever', {encoding:'utf8', flag: 'w'}, (err) => {
		return null
	})
}

exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;
