const Web3 = require('web3');
var namehash = require('eth-ens-namehash')
const web3 = new Web3(Web3.givenProvider || "wss://ropsten.infura.io/ws/v3/40548c5748a04570b1859a7bd8f9e615" );

// https://manager.ens.domains/name/distancehhs.eth
// https://ropsten.etherscan.io/address/0xe4aADA3Af88e17C304305371D50f0Dac4382b4bb

web3.transactionConfirmationBlocks = 1; // default 24 // probably doesn't work anymore

async function ensReverse(Account) {
    //const DefaultReverseResolver ='0x5fBb459C49BB06083C33109fA4f14810eC2Cf358'; // for mainnet // check via https://manager.ens.domains/name/8e2a89ff2f45ed7f8c8506f846200d671e2f176f.addr.reverse
    const DefaultReverseResolver ='0x53350F4089B10E516c164497f395Dbbbc8675e20'; // for ropsten
    const ABI=[{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},] // found via https://etherscan.io/address/0x5fbb459c49bb06083c33109fa4f14810ec2cf358#contracts
    const ResolverContract = new web3.eth.Contract(ABI, DefaultReverseResolver);
    var lookup=Account.toLowerCase().substr(2) + '.addr.reverse'
    var nh=namehash.hash(lookup);
    //console.log(nh);
    return await ResolverContract.methods.name(nh).call();    
}


var  yourAccount = '0x8e2A89fF2F45ed7f8C8506f846200D671e2f176f';
ensReverse(yourAccount).then ((name) => console.log("Reverse of %s is %s",yourAccount,name));

const sleep = require('util').promisify(setTimeout);

// https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344  // kilometers
        
        dist = Math.round(dist * 1000) // meters
        return dist;
    }
}


async function processevent(object)
{     
     var ts=0
     var decoded=web3.eth.abi.decodeParameters(['uint256'], object.data);    
     console.log("Found block with transaction %s",object.blockNumber);
     
     var txHash=object.transactionHash;     
     const trx = await web3.eth.getTransaction(txHash);
     var from = trx.from;
     
     for (i = 0; i < 5; i++) {
        blockobject= await web3.eth.getBlock(object.blockNumber);  
        if (!blockobject) {
            await sleep(1000);
        }
     } 
     if (blockobject)
        ts = new Date(blockobject.timestamp * 1000); // javascript uses milliseconds     
        
     var dist=decoded['0'];
     console.log("%s From %s d=%s meters",ts,from,await ensReverse(from),dist);     
}

var subscription;
web3.eth.ens.getAddress('distancehhs.eth').then((address) => {
    console.log("Found contract address: %s",address);
    subscription= web3.eth.subscribe('logs', {fromBlock: '0x0',address: address} )
    .on("data", processevent )
    .on("changed", console.log)
    .on("error",console.log)    
});







console.log('Press key & enter to exit');
process.stdin.setRawMode=true
process.stdin.resume();
process.stdin.on('data', () =>
{ 
   console.log('Unsubscribing..');
   subscription.unsubscribe(function(error, success){
   if(success)
        console.log('Successfully unsubscribed!');
    process.exit(0);
   });
});


