# location
Checkin on a location


# Preparations

## PC

* Install the [Chrome browser](https://www.google.com/chrome)
* Install [Metamask](http://web3examples.com/ethereum/install/Install%20MetaMask%20Windows.html)
* Select the Ropsten network in Metamask
* Get [ropsten test ether](http://web3examples.com/ethereum/demo/Get%20Ropsten%20ETH%20via%20Faucet.html)

## Mobile phone (android)

* Install [Opera](https://www.opera.com/mobile).
* Select Ropsten network
    * Opera logo (right lower corner)
    * Crypto Wallet
    * Settings (right upper corner)
    * Network
    * Test Ethereum Network (Ropsten)
    * Back (upper left corner)
    * Back (upper left corner)
* Get Ropsten test ether
    * goto https://faucet.ropsten.be
    * Opera logo (right lower corner)
    * Crypto Wallet
    * Receive
    * Copy  (address)
    * Back (upper left corner)
    * In Field "Enter your testnet account address": paste
    * Press button "Send me test Ether"
    * Wait till you have received the test ether

# Checkin

* Goto  [https://web3examples.com/location](https://web3examples.com/location)
* Press: "Press here to determine location"
* Allow access to location
* Wait till map is loaded & check location is ok
* Press "Press here to save on blockchain"
* In the wallet popup press blue botton (lower right) to allow transaction
* Authorize via code or fingerprint
* Wait till transaction is processed



# Check who has checked in

* [List](https://web3examples.com/location/listlocation.html)


# Internals

The application calculates the distance from the center of the [Haagse Hogeschool](https://www.google.com/maps/search/?api=1&query=52.0672,4.3245) in meters. 
It saves this info on the Ethereum blockchain, on the Ropsten test network.


# Known issues

* No mobile browser for IOS has been tested/found yet
* The list of check ins doesn't work in Opera (neither mobile nor the opera browser on a PC)


