const json = require( 'json' );
const async = require( 'async' );
const fs = require( 'fs' );

// Begin the Adding Process
startAddProcess( './src/config.json', function( e, success ){
  if( e ){
    console.log( "startAddProcess error: " + e )
  } else{
    //console.log( 'Adding New Data to config.json' )
    addNewData( success, function( err, addSuccess ){
      if( err ){
        console.log( "addNewData error: " + err )
      } else{
        // Successful Add of New Data
        // Starting Push of New Data
        pushNewData( addSuccess, './src/config.json', function( error, pushSuccess ){
          if( error ){
            console.log( "pushNewData error: " + error )
          } else{
            console.log( "Successful Push of New Data" )
          }
        })
      }
    });
  }
});

// Start the add Process, read filedata in from filename
function startAddProcess( filename, callback ) {
  fs.readFile( filename, 'utf8', function ( e, data ) {
    //console.log(data);
    if( e ){
      callback( e )
    } else{
      //console.log(data);
      callback( undefined, data )
      //console.log(JSON.parse(data));
    }
  });
};

function addNewData( initData, callback ) {
  var parseInitData = JSON.parse( initData )
  parseInitData.blacklist.push( "5000eth.net" )
  var newData = JSON.stringify( parseInitData, null, 4 )
  callback( undefined, newData )
}

function pushNewData( newData, filename, callback ) {
  fs.writeFile( './src/config.json', newData, 'utf8', function ( e, data ) {
    if( e ){
      callback( e )
    }
    //console.log( JSON.parse(data) )
    callback( undefined, data )
  });
}
