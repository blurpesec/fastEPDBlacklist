var fs    = require('fs');
var https = require('follow-redirects').https;

options = {
      host               : "raw.githubusercontent.com",
      port               : 443,
      path               : "/MetaMask/eth-phishing-detect/master/src/config.json",
      method             : 'GET',
      rejectUnauthorized : false,
      requestCert        : true,
      agent              : false
};
var file = fs.createWriteStream("../eth-phishing-detect/src/config.json", function(err,cb){
  if(err) console.log("Err: " + err + " > ../logs/downloadlogs.txt")
  else return(cb)
});
var request = https.get(options, function(response){
  response.pipe(file);
  file.on("finish", function(){
    return('0');
    file.close();
  });
});
  request.end();
  request.on('error', function(err){
    throw (err);
    return('1');
  });
