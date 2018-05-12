const async = require('async');
var exec = require('child_process').exec;
const logfile = './logs/logs.txt'

function _command (command, cb){
    var child = exec(command, function(err, stdout, stderr){
        if(err != null){
            return cb(new Error(err), null);
        }else if(typeof(stderr) != "string"){
            return cb(new Error(stderr), null);
        }else{
            return cb(null, stdout);
        }
    });
}

async.series(
        [
            function (callback) { // remove previous eth-phishing-detect installations
                _command("rmdir /S /Q eth-phishing-detect > " + logfile , function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log(response);
                    callback();
                });
            }
        ],
          function _allGood(err, results) {
              if (err) {
                  console.log("Error was found")
              }
              else {
                  console.log("CleanUp Completed")
              }
          }
      );
