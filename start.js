const async = require('async');
var exec = require('child_process').exec;
const logfile = 'logs.txt'

// Run commands in asynchronously, in series.
async.series(
        [
            function (callback) { // Initizalize by removing previous content
                _command("node cleanup > " + logfile, function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Initialization Completed---------");
                    callback();
                });
            },
            function (callback) { // Clone Github repo
                _command("git clone https://github.com/hahnmichaelf/eth-phishing-detect.git", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Clone Complete---------");
                    callback();
                });
            },
            function (callback) { // Copy rungit.js to eth-phishing-detect
                _command("copy rungit.js eth-phishing-detect", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------rungit.js copied---------");
                    callback();

                });
            },
            function (callback) { // Copy makenew.js to eth-phishing-detect
                _command("copy makenew.js eth-phishing-detect", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------makenew.js copied---------");
                    callback();
                });
            },
            function (callback) { // Copy gitignore to eth-phishing-detect
                _command("copy .gitignore eth-phishing-detect", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------.gitignore copied---------");
                    callback();
                });
            },
            function (callback) { // Run `node eth-phishing-detect/rungit.js`
                _command("node eth-phishing-detect/rungit.js > logs/logs.txt", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------/eth-phishing-detect/Rungit.js executed---------");
                    callback();
                });
            }
        ],
        function _allGood(err, results) {
            if (err) {
                console.log("-------------Error was found-------------")
            }
            else {
                console.log("-------------THANK FUCK IT FINALLY COMPLETED SUCCESSFULLY!-------------")
            }
        }
);

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
      
