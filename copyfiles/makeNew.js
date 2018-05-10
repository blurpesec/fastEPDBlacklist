const json = require ( 'json' );
const fs = require( 'fs' );
const filename =  '../newBlacklistItems.txt';
const writefilename = 'src/config.json'
var x = require('../src/config.json')

function readInTXT(filename, callback){
  fs.readFile(filename, "utf8", function(e, success) {
    if(e){
      callback(e);
    }
    callback(undefined, success);
  });
}
function writeToJSON(filename, data, callback){
  fs.readFile(filename, function(e, json){
    if(e){
      callback(e);
    }
    var c = 0
    json = JSON.parse(json)
    data = data.split(/\r?\n/);
    for(var c = 0; c < data.length-1; c++){
      datapiece = data[c];
      datapiece = datapiece .replace('http://','')
                            .replace('https://','')
                            .replace('[.]','.')
                            .replace('www.','')
                            .split(/[/?#]/)[0];
      json.blacklist.push(datapiece);
    }
    //console.log(JSON.stringify(json.blacklist));
    callback(undefined, JSON.stringify(json.blacklist, null, 4));

  })
}
function pushNewData( newData, filename, callback ) {
  fs.writeFile( filename, newData, 'utf8', function ( e, data ) {
    if(e){
      callback( e )
    }
    //console.log( JSON.parse(data) )
    callback( undefined, data)
  });
}
readInTXT('../newBlacklistItems.txt', function(e, success){
  if(e){
    console.log(e);
  }
  writeToJSON('../src/config.json', success, function(e,success){
    if(e){
      console.log(e);
    }
    pushNewData(success, '../src/config.json',  function(e, success){
      if(e){
        console.log(e)
      }
      //console.log(success);
    })
  });
});
