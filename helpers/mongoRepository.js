let config = require('../config');
let mongoClient = require('mongodb').MongoClient;
let db;
class mongoRepository {
	constructor(){
		this.className = 'mongoClass';
		this.URI = uri;
		this.DB = database;
	}

 getDb (){
 	//use singleton pattern for db connection
 	if(!this.db){
		return new Promise ((resolve,reject) => {
		mongoClient.connect(this.URI, (err, client) => {
	  	if(!err){
	  	db = client.db(this.DB)
	  	resolve(client.db(this.DB));
	  	}
	  	else{
	  	reject("cannot connect to database");
	  	} 	
		});
	  });
 	}
 	else{
 		return this.db;
 	}
 }

 find(collectionName,query,projection){
    this.getDb.then(() => {
      return new Promise(resolve,reject){
      	    db.collection(collectionName).find(query,projection).toArray().then((err,data) => {
    		(!err) ? resolve(data):reject(err);
    	});
      }
    }).catch((err) => {
    		reject(err);
    });
 }

 save(collectionName,dataToSave){
    this.getDb.then(() => {
      return new Promise(resolve,reject){
      	    db.collection(collectionName).save(dataToSave).then((err,data) => {
    		(!err) ? resolve(data):reject(err);
    	});
      }
    }).catch((err) => {
    		reject(err);
    });
 }

}

module.exports = mongoRepository;