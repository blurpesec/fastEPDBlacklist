const async = require('async');
var exec = require('child_process').exec;

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
            function (callback) { // `git fetch origin` cmd
                _command("git fetch origin", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Fetch Complete---------");
                    callback();
                });
            },
            function (callback) { // `git reset --hard origin/master` cmd
                _command("git reset --hard origin/master", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Branch Reset Complete---------");
                    callback();

                });
            },
            function (callback) { // `git checkout -b blacklist_domains` cmd
                _command("git checkout -b blacklist_domains", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------New Branch Created---------");
                    callback();
                });
            },
            function (callback) { // Make additions using `makeNew.js`
                _command("node makeNew.js", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------New Additions Made---------");
                    callback();
                });
            },
            function (callback) { // `git add *` cmd
                _command("git add \"*\"", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Git Add Completed---------");
                    callback();
                });
            },
            function (callback) { // `git commit -b blacklist_domains` cmd
                _command("git commit -m blacklist_domains", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Git Commit Completed---------");
                    callback();
                });
            },
            function (callback) {
                _command("git push origin blacklist_domains", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Git Push Completed---------");
                    callback();
                });
            },
            function (callback) {
                _command("git checkout master", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Change Branch Completed---------");
                    callback();
                });
            },
            function (callback) {
                _command("git branch -D blacklist_domains", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------New Branch Deleted---------");
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