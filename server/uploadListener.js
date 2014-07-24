var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
	console.log(req.url);
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      console.log(util.inspect({fields: fields, files: files}));

      console.log(files.file.path);

      res.end(util.inspect({fields: fields, files: files}));
    });

    return;
  }
}).listen(3456);;