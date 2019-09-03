pragma solidity ^0.5.0;

contract DistanceHHS {
   event DistanceHHSLog(int256 distance)  ;   // declaring event  
   function StoreDistanceHHS(int256 distance) public {
      emit DistanceHHSLog(distance);// logging event
   }
}
