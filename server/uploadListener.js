var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs');

var mysecrets  = require ("./secrets.js").secrets();
var db_name = mysecrets.db_name;


var nano = require('nano')('http://localhost:5984');
var db = nano.use(db_name);


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

      var filename = files.file.path;


      // will need a proper way to name files, and associate them with metadata. filesystem-based? couch? something easier?
      var outpath = "./uploads/newfile.jpg";



      fs.createReadStream(filename).pipe(fs.createWriteStream(outpath));

      res.end(util.inspect({fields: fields, files: files}));
    });

    return;
  }

  
}).listen(3456);;