let config = require('../config');
let mongoRepository = require('mongoRepository');
let mongoDataProvider = new mongoRepository(config.mongodb.uri,config.mongodb.database);

class userRepository extends Date {
  constructor(_date) {
    super(_date);
 }
 saveNewUser(validatedUserData) {
  	   let userModel ={
                "user_name" : validatedUserData.user_name,
                "password" : validatedUserData.password,
 				"phone"  : validatedUserData.phone,
 				"city"  : validatedUserData.city,
 				"state"  : validatedUserData.state,
 				"country" : validatedUserData.country
 				"date_added" `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}` 
            };
        return mongoDataProvider.save(userModel);        
 }
 showAllUsers() {
  	   let _query ={};
  	   let _projection = {};
       return mongoDataProvider.find(_query,_projection);
 }

}