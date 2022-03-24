const fs = require('fs')

// console.log(Buffer.from('bW9uZ29kYitzcnY6Ly9zaWFuZ3RvZ3JpdDppTG92ZURyaXZpbmdNb3RvcmJpa2VAY2x1c3RlcjAuNjd0OXoubW9uZ29kYi5uZXQvdHByY2FyP3JldHJ5V3JpdGVzPXRydWUmdz1tYWpvcml0eQ==', 'base64').toString())


console.log(Buffer.from(fs.readFileSync(`./toDel`, 'utf8'), 'base64').toString());
