var shell = require('./multishell');

// execute multiple commands in series
shell.series([
    'cd eth-phishing-detect',
    'git fetch origin',
    'git reset --hard origin/master',
    'git checkout -b blacklist_domains',
    'node makeNew.js',
    'git add \"*\"',
    'git commit -m blacklist_domains',
    'git push origin blacklist_domains',
    'git checkout master',
    'git branch -D blacklist_domains'
], function(err){
   console.log('executed many commands in a row');
});
