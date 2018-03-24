let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let bodyParser = require('body-parser');
let http = require('http');

let index = require('./routes/index');

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb',type:'application/json' }));
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
});
/*
Create HTTP Server and set port
*/ 
var server = http.createServer(app);
server.listen(3000,()=>console.log("Server running on port 3000!"));

