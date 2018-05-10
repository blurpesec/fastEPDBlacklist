const async = require('async');
var exec = require('child_process').exec;
var random = Math.floor(Math.random() * (9999 - 1) + 1);
process.chdir(__dirname);

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
            function (callback) { // `git remote add upstream` cmd
                _command("git remote add upstream https://github.com/metamask/eth-phishing-detect.git", function (err, response) {
                    if (err) {
                        console.log("ERR: " + err);
                        callback();
                    }
                    console.log("------------Added Upstream remote");
                    callback();
                });
            },
            function (callback) { // `git fetch upstream` cmd
                _command("git fetch upstream", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Fetch Upstream Complete");
                    callback();
                });
            },
            function (callback) { // `git merge upstream/master` cmd
                _command("git merge upstream/master", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Merge Upstream Complete");
                    callback();
                });
            },
            function (callback) { // `git psuh origin` cmd
                _command("git push origin", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Upstream Push Complete");
                    callback();
                });
            },
            function (callback) { // `git reset --hard origin/master` cmd
                _command("git reset --hard origin/master", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Branch Reset Complete");
                    callback();

                });
            },
            function (callback) { // `git checkout -b blacklist_domains` cmd
                _command("git checkout -b blacklist_domains_" + random, function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------New blacklist_domains_" + random + " Branch Created");
                    callback();
                });
            },
            function (callback) { // Download current config.json using download.js
                _command("node ../copyfiles/download.js > ../logs/downloadlog.txt", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Download Completed");
                    callback();
                });
            },
            function (callback) { // Make additions using `makeNew.js`
                _command("node ../copyfiles/makeNew.js > ../logs/makeNew.txt", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------New Additions Made");
                    callback();
                });
            },
            function (callback) { // `git add *` cmd
                _command("git add src/config.json", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Git Add Completed");
                    callback();
                });
            },
            function (callback) { // `git commit -b blacklist_domains` cmd
                _command("git commit -m blacklist_domains_" + random, function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Git Commit Completed");
                    callback();
                });
            },
            function (callback) { // `git push origin` has begun
                _command("git push origin blacklist_domains_" + random, function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Git Push Completed");
                    callback();
                });
            },
            function (callback) { //Navigate to github
                _command("start /max https://github.com/MetaMask/eth-phishing-detect/", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Navigating to github to create the PR");
                    callback();
                });
            },/*
            function (callback) {
                _command("git checkout master", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------Branch changed to master");
                    callback();
                });
            },
            function (callback) {
                _command("git branch -D blacklist_domains_" + random, function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err);
                    }
                    console.log("------------" + response);
                    callback();
                });
            },*/
            function (callback) {
                _command("node ../cleanup.js > ../logs/cleanupLogs.txt", function (err, response) {
                    if (err) {
                        return console.log("ERR: " + err + "CurrentDir: " + __dirname);
                    }
                    console.log("------------Finalization has begun");
                    callback();
                });
            }
        ],
        function _allGood(err, results) {
            if (err) {
                console.log("------------Error was found")
            }
            else {
                console.log("------------Completed rungit successfully")
            }
        }
    );
