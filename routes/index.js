let express = require('express');
let router = express.Router();
let config = require('../config');

let userDataProvider = require('./helpers/userRepository');
let userHandler;
(!userHandler) ? new userDataProvider(): userHandler;

/* Show all users */
router.get('/', (req, res, next) => {

try{
userHandler.showAllUsers().then((results) => {
  res.json({status:200,users:results});
  res.end();
  }).catch((err) => {
  res.json({status:208,error:err});
  res.end();
  }); 
}
catch(e){
  res.json({status:208,error:err});
  res.end();  
}

});

/*add new user*/
router.post('/add-user',(req,res){
    try{        
        let validatedData = validate(req.body);
        let successRes = {
                status:200,
                message:"User added successfully"
            };
        let errResponse = {
                status:208,
                error:"Error in adding user"
            };

        if(validatedData){
         userHandler.saveNewUser(validatedData).then((results) => {
           
            (results.writeResult > 0) ? res.json(successRes) : res.json(errResponse);
            res.end();

        }).catch((err) => {
            res.json(errResponse);
            res.end();
        });

        }
        else{
            res.json(errResponse);
            res.end();    
        }   

    }
    catch(e){
            res.json({err:e});
            res.end();
    }
 });
module.exports = router;
