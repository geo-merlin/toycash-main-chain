var BlockDoubtToken = artifacts.require("BlockDoubtToken");

module.exports = function (deployer) {
    deployer.deploy(BlockDoubtToken,10000);
};