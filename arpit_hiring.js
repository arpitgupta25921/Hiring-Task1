// Default Modules
var http = require("http"); 
var formidable = require('formidable');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var mv = require('mv');

// setting global variables
var candidate_name;
var candidate_email;
var candidate_resume;
var pos_applied;
var max_qualificaton;

// creating Server
http.createServer(function (req, res) {
  if (req.url == '/fileupload') {

    var form = new formidable.IncomingForm();

    // to fetch form submitted data
    form.parse(req, function (err, fields, files) {
      candidate_name = fields.candidate_name;
      candidate_email = fields.candidate_email;
      candidate_resume = files.candidate_resume.name;
      pos_applied = fields.pos_applied;
      max_qualificaton = fields.max_qualificaton;
      
      console.log(candidate_name);
      console.log(candidate_email);
      console.log(candidate_resume);
      console.log(pos_applied);
      console.log(max_qualificaton);

      // for file upload
      var oldpath = files.candidate_resume.path;
      var newpath = 'D:/Apps/Task2/' + files.candidate_resume.name;
      // fs.rename(oldpath, newpath, function (err) {
      //   if (err) throw err;
      // });


      mv(oldpath,newpath,function(err) {
        if (err) throw err;
      });

      // insert data into database
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { "candidate_name" : candidate_name, "candidate_email" : candidate_email , "candidate_resume" : candidate_resume , "pos_applied" : pos_applied , "max_qualificaton" : max_qualificaton };
        //var myobj = { candidate_name: "Arpit Kumar1", candidate_email: "Arpit1@gmail.com" , candidate_resume: "resume.pdf" , pos_applied: "Software Developer" , max_qualificaton: "BTECH" };
        dbo.collection("hiring").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 row inserted");
          db.close();
        });
      });

   });


    res.write('Candidate Details Entered Successfuly!');
    res.end();
    
    
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<body>');
    res.write('<form action="/fileupload" method="post" enctype="multipart/form-data">');
    res.write('Name : <br>');
    res.write('<input type="text" name="candidate_name"><br><br>');

    res.write('Email : <br>');
    res.write('<input type="text" name="candidate_email"><br><br>');

    res.write('Resume : <br>');
    res.write('<input type="file" name="candidate_resume"><br><br>');

    res.write('Position Applied : <br>');
    res.write('<input type="text" name="pos_applied"><br><br>');

    res.write('Highest Qualification : <br>');
    res.write('<input type="text" name="max_qualificaton"><br><br>');

    res.write('<input type="submit">');
    res.write('</form>');
    res.write('</body>');
    return res.end();
  }
}).listen(8080);


//npm install formidable
//npm install mongodb