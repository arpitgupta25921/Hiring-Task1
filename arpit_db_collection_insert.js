var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { candidate_name: "Arpit Kumar", candidate_email: "Arpit@gmail.com" , candidate_resume: "resume.pdf" , pos_applied: "Software Developer" , max_qualificaton: "BTECH" };
  dbo.collection("hiring").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 row inserted");
    db.close();
  });
});