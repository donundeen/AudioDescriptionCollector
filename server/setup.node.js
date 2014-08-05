/*
creating db structure, other setup and configuration stuff


*/


/*
things:
- tours
-- tour name
- descriptions
-- tour
-- images []
-- audio
-- username


*/
var mysecrets  = require ("./secrets.js").secrets();
var db_name = mysecrets.db_name;


var nano = require('nano')('http://localhost:5984');
var db = nano.use(db_name);



var design  = {
	_id : "_design/"+db_name,
	updates :  {

	},
	views : {
	    "tours" : {
	      "map" : "function(doc){ "+
	//        " if((!doc.assigned_for_tagging) && (!doc.tags || !doc.tags.faces || doc.tags.faces.length < 2)){ " +
	      " if(doc.tour_name){ " +
	      "   ready = true; " +
	      "   emit(ready, doc); " + 
	      " } else{ " + 
	      "   ready = false ;" +
	      " } " +
	      "} " 
	    },
	    "descriptions_for_tour" : {
	      "map" : "function(doc){ "+
	//        " if((!doc.assigned_for_tagging) && (!doc.tags || !doc.tags.faces || doc.tags.faces.length < 2)){ " +
	      " var tour_name = ''; " + 
	      " if(doc.tour_name && doc.audios){ " +
	      "   tour_name = doc.tour_name; " +
	      " } " +
	      "   emit(tour_name, doc); " + 
	      "} " 
	    },

	},
};




/*
db.get("_design/"+db_name, function(err, body){
  if(err){
    console.log("error getting design");
    console.log(err);
    db.insert(design,
      function (error,http_body,http_headers) {
        if(error) {
          if(error.message === 'no_db_file') {
            // create database and retry
            return nano.db.create(db_name, function () {
              console.log("created");
            });
          }
          else { return console.log(error); }
        }
      
        console.log(http_body);
    });    
  }else{
    console.log("got design, going to destroy " + body);
    db.destroy(body._id, body._rev, function(err2, body2){
      if(err){  
        console.log("error destroying design");
        console.log(err);
      }else{
        db.insert(design,
          function (error,http_body,http_headers) {
            if(error) {
              if(error.message === 'no_db_file') {
                // create database and retry
                return nano.db.create(db_name, function () {
                  console.log("created");
                });
              }
              else { return console.log(error); }
            }
          
            console.log(http_body);
        });      
      }
    });
  }
});

*/





nano.db.create(db_name, function () {
  console.log("created");
});



/*
insert test record:

*/

console.log("trying to insert.");

var tour = {
	_id : "tours/tour1",
	tour_name : "tour1"
};

var desc = {
	"_id" : "desc/tour1desc1",
	tour_name : "tour1",
	images : [
		{filename : "bac.jpg"},
		{filename : "bac2.jpg"},
	],
	audios : [
		{filename :"audio.mp3"}
	]
};

var desc2 = {
	"_id" : "desc/tour1desc2",
	tour_name : "tour1",
	images : [
		{filename : "xxx.jpg"},
		{filename : "yyy.jpg"},
	],
	audios : [
		{filename :"audio2.mp3"}
	]
};

/*
db_insert(db, tour);

db_insert(db, desc);
db_insert(db, desc2);
*/

function db_insert(db, doc){
	db.insert(doc,
	  function (error,http_body,http_headers) {
	    if(error) {
	      if(error.message === 'no_db_file') {
	      	console.log("no db file");
	        // create database and retry
	      }
	      else {
	      	console.log("error in insert"); 
	      	console.log(error); 
	      	console.log(doc);
	      }
	    }else{
	    	console.log("seems ok");
	    }
	  
	    console.log(http_body);
	});    

}





// test select 
/*
db.get("testid", {}, function(err, body){
	if(err){
		console.log("error in get testis");
		console.log(err);
	}
	console.log("body get testid");
	console.log(body);
});


db.list(function(err, body) {
  if (!err) {
  	console.log("listing all");
    body.rows.forEach(function(doc) {
      console.log(doc);
    });
  }else{
  	console.log("error in listing all");
  }
});
*/

// get tours

/*
console.log("get tours");

db.view("audio_collector", "tours", {} , 
  	function(err, body){
		if(err){
			console.log("error in gettours");
			console.log(err);
		}
		console.log("body gettours");
		console.log(body);
	}
);
*/

console.log("get descs");
// get descriptions for tour
var tourname = "tour1";
db.view("audio_collector", "descriptions_for_tour", { keys : [tourname]},
  	function(err, body){
		if(err){
			console.log("error get descs");
			console.log(err);
		}else{
			console.log("body get descs");
			console.log(body);
		    body.rows.forEach(function(doc) {
		      console.log(doc);
		    });
			
		}
	}
);

