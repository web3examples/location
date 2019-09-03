var DistanceHHS = artifacts.require("DistanceHHS");
module.exports = function(deployer) {
    deployer.deploy(DistanceHHS);
    // Additional contracts can be deployed here
};