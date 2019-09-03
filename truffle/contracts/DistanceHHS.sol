pragma solidity ^0.5.0;

contract DistanceHHS {
   event DistanceHHSLog(uint256 distance)  ;   // declaring event  
   function StoreDistanceHHS(uint256 distance) public {
      emit DistanceHHSLog(distance);// logging event
   }
}
