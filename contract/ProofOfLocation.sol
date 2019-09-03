pragma solidity ^0.5.0;

contract ProofOfLocation {
   event ProofOfLocationLog(address adr, int256 lat, int256 lon)  ;   // declaring event  
   function StoreProofOfLocation(int256 lat, int256 lon) public {
      emit ProofOfLocationLog(msg.sender,lat,lon);// logging event
   }
}
