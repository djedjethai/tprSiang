// __tests__/FileSummarizer-test.js
'use strict';

jest.mock('fs');

describe('listFilesInDirectorySync', () => {

  beforeEach(() => {
    const fs = require('fs')
   
  });

  test('includes all files in the directory in the summary', () => {
    const FileSummarizer = require('../testMocks');
    const fileSummary =
      FileSummarizer.summarizeFilesInDirectorySync('/opt/app/tmp/token.txt');

	  console.log('archhh: ', fileSummary)
      expect(fileSummary).toBe('some data');

  });
});
