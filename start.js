const async = require('async');
const json = require('json');
var config = require('./configuration.json');
var exec = require('child_process').exec;

const logfile = './logs/cleanupLog.txt'

// Run commands in asynchronously, in series.
async.series(
        [
            function (callback) { // Initizalize by removing previous content
                _command("node cleanup > " + logfile, function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Initialization Completed");
                    console.log("------------Cloning using: " + JSON.stringify(config.cloneUrl));
                    callback();
                });
            },
            function (callback) { // Clone Github repo
                _command("git clone " + config.cloneUrl, function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Clone Complete");
                    callback();
                });
            },
            function (callback) { // Copy rungit.js to eth-phishing-detect
                _command('xcopy copyfiles eth-phishing-detect', function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------File xcopy Complete");
                    callback();
                });
            },
            function (callback) { // Run `node eth-phishing-detect/rungit.js`
                _command("node eth-phishing-detect/rungit.js > logs/logs.txt", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------/eth-phishing-detect/Rungit.js has begun");
                    callback();
                });
            }
        ],
        function _allGood(err, results) {
            if (err) {
                console.log("------------Error was found")
            }
            else {
                console.log("------------Completed Start Process Successfully")
                console.log("------------Updating eth-phishing-detect now. Please wait.")
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
