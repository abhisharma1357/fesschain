const FessChain = artifacts.require('FessChain.sol');
const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

contract('FessChain Token Contract', async (accounts) => {

  it('Should correctly initialize constructor values of FessChain Token Contract', async () => {

    this.tokenhold = await FessChain.new(accounts[0], { from: accounts[0], gas: 60000000 });

  });

  it('Should check the Total Supply of FessChain Tokens', async () => {


    let totalSupply = await this.tokenhold.totalSupply();
    assert.equal(totalSupply / 10 ** 18, 10000000000);
  });

  it('Should check the Name of a token of FESS contract', async () => {

    let name = await this.tokenhold.name();
    assert.equal(name, 'FESS');

  });

  it('Should check the symbol of a token of Fesschain contract', async () => {

    let symbol = await this.tokenhold.symbol();
    assert.equal(symbol, 'FESS');

  });

  it('Should check the decimal of a token of Fesschainf contract', async () => {

    let decimal = await this.tokenhold.decimals();
    assert.equal(decimal.toNumber(), 18);

  });

  it('Should check the balance of a Owner', async () => {

    let balanceOfOwner = await this.tokenhold.balanceOf(accounts[0]);
    assert.equal(balanceOfOwner / 10 ** 18, 600000000);

  });

  it('Should check Tokens for Sale of Fess Chain', async () => {

    let tokenForSale = await this.tokenhold.tokenForSale();
    assert.equal(tokenForSale / 10 ** 18, 600000000);

  });

  it('Should check Team Tokens of Fess Chain', async () => {

    let teamTokens = await this.tokenhold.teamTokens();
    assert.equal(teamTokens / 10 ** 18, 2400000000);

  });

  it('Should check Maintainance Tokens of Fess Chain', async () => {

    let maintainanceTokens = await this.tokenhold.maintainanceTokens();
    assert.equal(maintainanceTokens / 10 ** 18, 1000000000);

  });

  it('Should check Marketing Tokens of Fess Chain', async () => {

    let marketingTokens = await this.tokenhold.marketingTokens();
    assert.equal(marketingTokens / 10 ** 18, 10000000);

  });

  it('Should check air Drop IEO Tokens of Fess Chain', async () => {

    let airDropInIEO = await this.tokenhold.airDropInIEO();
    assert.equal(airDropInIEO / 10 ** 18, 20000000);

  });

  it('Should check bounty In IEO Tokens of Fess Chain', async () => {

    let bountyInIEO = await this.tokenhold.bountyInIEO();
    assert.equal(bountyInIEO / 10 ** 18, 30000000);

  });

  it('Should check Minting Tokens of Fess Chain', async () => {

    let mintingTokens = await this.tokenhold.mintingTokens();
    assert.equal(mintingTokens / 10 ** 18, 2250000000);

  });

  it('Should check air Drop With Dapps Tokens of Fess Chain', async () => {

    let airDropWithDapps = await this.tokenhold.airDropWithDapps();
    assert.equal(airDropWithDapps / 10 ** 18, 3690000000);

  });

  it('Should check tokens Released of Fess Chain', async () => {

    let totalReleased = await this.tokenhold.totalReleased();
    assert.equal(totalReleased / 10 ** 18, 600000000);

  });

  it("Should be able to pause Fesschain Token contract", async () => {

    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, false);
    await this.tokenhold.pause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, true);
  });

  it('Should Not be able to transfer tokens to accounts[1] of Sale tokens when paused', async () => {

    try {
      let balanceOfOwner = await this.tokenhold.balanceOf(accounts[0]);
      assert.equal(balanceOfOwner / 10 ** 18, 600000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
      assert.equal(balanceOfBeneficiary, 0);
      await this.tokenhold.transfer(accounts[1], 10000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });

    } catch (error) {

      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }

  });

  it("Should be able unPause Token contract", async () => {
    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, true);
    await this.tokenhold.unpause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, false);
  });

  it('Should be able to transfer tokens to accounts[1] of Sale tokens only by Owner when not paused', async () => {

    let balanceOfOwner = await this.tokenhold.balanceOf(accounts[0]);
    assert.equal(balanceOfOwner / 10 ** 18, 600000000);
    let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiary, 0);
    await this.tokenhold.transfer(accounts[1], 10000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    let balanceOfOwnerLater = await this.tokenhold.balanceOf(accounts[0]);
    assert.equal(balanceOfOwnerLater / 10 ** 18, 590000000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 10000000);

  });

  it("Should be able to pause Fesschain Token contract", async () => {

    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, false);
    await this.tokenhold.pause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, true);
  });

  it('Should Not be able to send marketing Tokens by owner When it is Paused', async () => {

    try {
      let marketingTokens = await this.tokenhold.marketingTokens();
      assert.equal(marketingTokens / 10 ** 18, 10000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[2]);
      assert.equal(balanceOfBeneficiary, 0);
      await this.tokenhold.sendMarketingTokens(accounts[2], 1000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    } catch (error) {

      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }


  });

  it("Should be able unPause Token contract", async () => {
    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, true);
    await this.tokenhold.unpause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, false);
  });

  it('Should be able to send marketing Tokens by Non Owner Account', async () => {

    try {
      let marketingTokens = await this.tokenhold.marketingTokens();
      assert.equal(marketingTokens / 10 ** 18, 10000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[2]);
      assert.equal(balanceOfBeneficiary, 0);
      await this.tokenhold.sendMarketingTokens(accounts[2], 1000000 * 10 ** 18, { from: accounts[1], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }

  });

  it('Should be able to send marketing Tokens by owner only', async () => {

    let marketingTokens = await this.tokenhold.marketingTokens();
    assert.equal(marketingTokens / 10 ** 18, 10000000);
    let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[2]);
    assert.equal(balanceOfBeneficiary, 0);
    await this.tokenhold.sendMarketingTokens(accounts[2], 1000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    let marketingTokensLater = await this.tokenhold.marketingTokens();
    assert.equal(marketingTokensLater / 10 ** 18, 9000000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[2]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 1000000);

  });

  it('Should be able to check marketing Token after sent to beneficiary', async () => {

    let marketingTokensLater = await this.tokenhold.marketingTokens();
    assert.equal(marketingTokensLater / 10 ** 18, 9000000);

  });

  it('Should Not be able to transfer tokens to accounts[6] by marketing token holder before 8 months', async () => {

    try {
      let marketingTokensLater = await this.tokenhold.marketingTokens();
      assert.equal(marketingTokensLater / 10 ** 18, 9000000);
      let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[2]);
      assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 1000000);
      await this.tokenhold.transfer(accounts[6], 10000000 * 10 ** 18, { from: accounts[2], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }
  });

  it("should Approve address to spend specific token ", async () => {

    this.tokenhold.approve(accounts[6], 10000000 * 10 ** 18, { from: accounts[2] });
    let allowance = await this.tokenhold.allowance.call(accounts[2], accounts[6]);
    assert.equal(allowance, 10000000 * 10 ** 18, "allowance is wrong when approve");

  });

  it('Should be able to check marketing Token holder or not', async () => {

    let marketingTokenHolder = await this.tokenhold.marketingTokenHolder(accounts[2]);
    assert.equal(marketingTokenHolder, true);

  });

  it("Should be able to pause Fesschain Token contract", async () => {

    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, false);
    await this.tokenhold.pause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, true);
  });

  it('Should Not be able to send Maintainance Tokens by owner when paused', async () => {

    try {
      let maintainanceTokens = await this.tokenhold.maintainanceTokens();
      assert.equal(maintainanceTokens / 10 ** 18, 1000000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
      assert.equal(balanceOfBeneficiary / 10 ** 18, 10000000);
      await this.tokenhold.sendMaintainanceTokens(accounts[1], 10000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }


  });

  it("Should be able unPause Token contract", async () => {
    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, true);
    await this.tokenhold.unpause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, false);
  });

  it('Should Not be able to send Maintainance Tokens by owner Non owner when not paused', async () => {

    try {
      let maintainanceTokens = await this.tokenhold.maintainanceTokens();
      assert.equal(maintainanceTokens / 10 ** 18, 1000000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
      assert.equal(balanceOfBeneficiary / 10 ** 18, 10000000);
      await this.tokenhold.sendMaintainanceTokens(accounts[1], 10000000 * 10 ** 18, { from: accounts[1], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }


  });

  it('Should be able to send Maintainance Tokens by owner only when not paused', async () => {

    let maintainanceTokens = await this.tokenhold.maintainanceTokens();
    assert.equal(maintainanceTokens / 10 ** 18, 1000000000);
    let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiary / 10 ** 18, 10000000);
    await this.tokenhold.sendMaintainanceTokens(accounts[1], 10000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    let maintainanceTokensLater = await this.tokenhold.maintainanceTokens();
    assert.equal(maintainanceTokensLater / 10 ** 18, 990000000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 20000000);

  });

  it('Should be able to check Maintainance Token after sent to beneficiary', async () => {

    let maintainanceTokensLater = await this.tokenhold.maintainanceTokens();
    assert.equal(maintainanceTokensLater / 10 ** 18, 990000000);

  });

  it("Should be able to pause Fesschain Token contract", async () => {

    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, false);
    await this.tokenhold.pause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, true);
  });

  it('Should Not be able to send Air Drop In IEO Tokens by owner when paused', async () => {

    try {
      let airDropInIEO = await this.tokenhold.airDropInIEO();
      assert.equal(airDropInIEO / 10 ** 18, 20000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
      assert.equal(balanceOfBeneficiary / 10 ** 18, 20000000);
      await this.tokenhold.sendAirDropIEO(accounts[1], 10000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }

  });

  it("Should be able unPause Token contract", async () => {
    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, true);
    await this.tokenhold.unpause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, false);
  });

  it('Should Not be able to send Air Drop In IEO Tokens by Non owner account', async () => {

    try {
      let airDropInIEO = await this.tokenhold.airDropInIEO();
      assert.equal(airDropInIEO / 10 ** 18, 20000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
      assert.equal(balanceOfBeneficiary / 10 ** 18, 20000000);
      await this.tokenhold.sendAirDropIEO(accounts[1], 10000000 * 10 ** 18, { from: accounts[1], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }


  });

  it('Should be able to send Air Drop In IEO Tokens by owner only', async () => {

    let airDropInIEO = await this.tokenhold.airDropInIEO();
    assert.equal(airDropInIEO / 10 ** 18, 20000000);
    let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiary / 10 ** 18, 20000000);
    await this.tokenhold.sendAirDropIEO(accounts[1], 10000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    let airDropInIEOLater = await this.tokenhold.airDropInIEO();
    assert.equal(airDropInIEOLater / 10 ** 18, 10000000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 30000000);

  });

  it('Should be able to check Air drop in IEO after sent to beneficiary', async () => {

    let airDropInIEOLater = await this.tokenhold.airDropInIEO();
    assert.equal(airDropInIEOLater / 10 ** 18, 10000000);

  });

  it('Should Not be able to Send bounty In IEO In IEO Tokens by Non owner account', async () => {

    try {
      let bountyInIEO = await this.tokenhold.bountyInIEO();
      assert.equal(bountyInIEO / 10 ** 18, 30000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
      assert.equal(balanceOfBeneficiary / 10 ** 18, 30000000);
      await this.tokenhold.sendBountyIEO(accounts[1], 10000000 * 10 ** 18, { from: accounts[1], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }

  });

  it('Should be able to Send bounty In IEO In IEO Tokens by owner only', async () => {

    let bountyInIEO = await this.tokenhold.bountyInIEO();
    assert.equal(bountyInIEO / 10 ** 18, 30000000);
    let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiary / 10 ** 18, 30000000);
    await this.tokenhold.sendBountyIEO(accounts[1], 10000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    let bountyInIEOLater = await this.tokenhold.bountyInIEO();
    assert.equal(bountyInIEOLater / 10 ** 18, 20000000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 40000000);

  });

  it('Should be able to check bounty in IEO after sent to beneficiary', async () => {

    let bountyInIEOLater = await this.tokenhold.bountyInIEO();
    assert.equal(bountyInIEOLater / 10 ** 18, 20000000);

  });

  it('Should Not be able to Send Minting Tokens by Non owner account', async () => {

    try {
      let mintingTokens = await this.tokenhold.mintingTokens();
      assert.equal(mintingTokens / 10 ** 18, 2250000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
      assert.equal(balanceOfBeneficiary / 10 ** 18, 40000000);
      await this.tokenhold.sendMintingTokens(accounts[1], 10000000 * 10 ** 18, { from: accounts[1], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }


  });

  it('Should be able to Send Minting Tokens by owner only', async () => {

    let mintingTokens = await this.tokenhold.mintingTokens();
    assert.equal(mintingTokens / 10 ** 18, 2250000000);
    let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiary / 10 ** 18, 40000000);
    await this.tokenhold.sendMintingTokens(accounts[1], 10000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    let mintingTokensLater = await this.tokenhold.mintingTokens();
    assert.equal(mintingTokensLater / 10 ** 18, 2240000000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 50000000);

  });

  it('Should be able to check Minting tokens after sent to beneficiary', async () => {

    let mintingTokensLater = await this.tokenhold.mintingTokens();
    assert.equal(mintingTokensLater / 10 ** 18, 2240000000);

  });

  it('Should Not be able to Send Air Drop With Dapps tokens by Non owner account', async () => {

    try {
      let airDropWithDapps = await this.tokenhold.airDropWithDapps();
      assert.equal(airDropWithDapps / 10 ** 18, 3690000000);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
      assert.equal(balanceOfBeneficiary / 10 ** 18, 50000000);
      await this.tokenhold.sendAirDropAndBountyDapps(accounts[1], 50000000 * 10 ** 18, { from: accounts[1], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }


  });

  it('Should be able to Send Air Drop With Dapps tokens by owner only', async () => {

    let airDropWithDapps = await this.tokenhold.airDropWithDapps();
    assert.equal(airDropWithDapps / 10 ** 18, 3690000000);
    let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiary / 10 ** 18, 50000000);
    await this.tokenhold.sendAirDropAndBountyDapps(accounts[1], 50000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
    let airDropWithDappsLater = await this.tokenhold.airDropWithDapps();
    assert.equal(airDropWithDappsLater / 10 ** 18, 3640000000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 100000000);

  });

  it('Should be able to check airDropWithDappsLater after sent to beneficiary', async () => {

    let airDropWithDappsLater = await this.tokenhold.airDropWithDapps();
    assert.equal(airDropWithDappsLater / 10 ** 18, 3640000000);

  });

  it("Should be able to pause Fesschain Token contract", async () => {

    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, false);
    await this.tokenhold.pause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, true);
  });

  it("Should Not be able unPause Token contract from Non Owner Accounts", async () => {

    try {
      var pauseStatusBefore = await this.tokenhold.paused.call();
      assert.equal(pauseStatusBefore, true);
      await this.tokenhold.unpause({ from: accounts[1] });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }

  });

  it("Should be able unPause Token contract", async () => {
    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, true);
    await this.tokenhold.unpause({ from: accounts[0] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, false);
  });

  it("should Approve address to spend specific token ", async () => {

    this.tokenhold.approve(accounts[3], 100 * 10 ** 18, { from: accounts[0] });
    let allowance = await this.tokenhold.allowance.call(accounts[0], accounts[3]);
    assert.equal(allowance, 100 * 10 ** 18, "allowance is wrong when approve");

  });

  it("should Increase the Approval ", async () => {

    let allowance1 = await this.tokenhold.allowance.call(accounts[0], accounts[3]);
    assert.equal(allowance1, 100 * 10 ** 18, "allowance is wrong when increase approval");
    this.tokenhold.increaseAllowance(accounts[3], 100 * 10 ** 18, { from: accounts[0] });
    let allowanceNew = await this.tokenhold.allowance.call(accounts[0], accounts[3]);
    assert.equal(allowanceNew, 200 * 10 ** 18, "allowance is wrong when increase approval done");

  });

  it("should Decrease the Approval ", async () => {

    let allowance1 = await this.tokenhold.allowance.call(accounts[0], accounts[3]);
    assert.equal(allowance1, 200 * 10 ** 18, "allowance is wrong when increase approval");
    this.tokenhold.decreaseAllowance(accounts[3], 100 * 10 ** 18, { from: accounts[0] });
    let allowanceNew = await this.tokenhold.allowance.call(accounts[0], accounts[3]);
    assert.equal(allowanceNew, 100 * 10 ** 18, "allowance is wrong when increase approval done");

  });

  it("Should be able to transfer ownership of token Contract ", async () => {

    await this.tokenhold.transferOwnership(accounts[9], { from: accounts[0] });
  });

  it("Should be able to Accept ownership of token Contract ", async () => {

    await this.tokenhold.acceptOwnership({ from: accounts[9] });

    let ownerNew = await this.tokenhold.owner.call();
    assert.equal(ownerNew, accounts[9], 'Transfered ownership');
  });

  it("Should be able to transfer Tokens on the behalf of accounts[0]", async () => {

    let allowanceNew = await this.tokenhold.allowance.call(accounts[0], accounts[3]);
    assert.equal(allowanceNew.toNumber(), 100 * 10 ** 18, "allowance is wrong before");
    var balance = await this.tokenhold.balanceOf.call(accounts[3]);
    assert.equal(balance.toNumber(), 0);
    await this.tokenhold.transferFrom(accounts[0], accounts[3], 90 * 10 ** 18, { from: accounts[3] });
    let allowanceNew1 = await this.tokenhold.allowance.call(accounts[0], accounts[3]);
    assert.equal(allowanceNew1.toNumber() / 10 ** 18, 10, "allowance is wrong After");
    var balanceLater = await this.tokenhold.balanceOf.call(accounts[3]);
    assert.equal(balanceLater.toNumber() / 10 ** 18, 90);

  });

  it("Should be able to pause Fesschain Token contract", async () => {

    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, false);
    await this.tokenhold.pause({ from: accounts[9] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, true);
  });

  it('Should be able to send team Tokens by owner only', async () => {

    try {
      let teamTokens = await this.tokenhold.teamTokens();
      assert.equal(teamTokens / 10 ** 18, 2400000000);
      let teamTokenHolder = await this.tokenhold.teamTokenHolder(accounts[4]);
      assert.equal(teamTokenHolder, false);
      let teamTokenInitially = await this.tokenhold.teamTokenInitially(accounts[4]);
      assert.equal(teamTokenInitially, 0);
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[4]);
      assert.equal(balanceOfBeneficiary, 0);
      await this.tokenhold.sendTeamTokens(accounts[4], 10000000 * 10 ** 18, { from: accounts[9], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }

  });

  it("Should be able unPause Token contract", async () => {
    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, true);
    await this.tokenhold.unpause({ from: accounts[9] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, false);
  });

  it('Should be able to send team Tokens by owner only', async () => {

    let teamTokens = await this.tokenhold.teamTokens();
    assert.equal(teamTokens / 10 ** 18, 2400000000);
    let teamTokenHolder = await this.tokenhold.teamTokenHolder(accounts[4]);
    assert.equal(teamTokenHolder, false);
    let teamTokenInitially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitially, 0);
    let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiary, 0);

    await this.tokenhold.sendTeamTokens(accounts[4], 10000000 * 10 ** 18, { from: accounts[9], gas: 5000000 });

    let teamTokenHolderLater = await this.tokenhold.teamTokenHolder(accounts[4]);
    assert.equal(teamTokenHolderLater, true);
    let teamTokenLater = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenLater / 10 ** 18, 9500000);
    let teamTokensLeft = await this.tokenhold.teamTokens();
    assert.equal(teamTokensLeft / 10 ** 18, 2390000000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 500000);

  });

  it('Should Not be able to withdraw tokens when caller is not a team member  ', async () => {


    try {
      let teamTokenHolder = await this.tokenhold.teamTokenHolder(accounts[2]);
      assert.equal(teamTokenHolder, false);
      await this.tokenhold.withdrawTeamTokens(950000 * 10 ** 18, { from: accounts[2], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert not a team member';
      assert.equal(error.message, error_, 'Reverted ');
    }

  });

  it('Should be able to withdraw 10% tokens after 3 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(8035200));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber(), 0);
    let teamTokenLater = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenLater / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(950000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 1450000);
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 950000);
  });

  it('Should be able to withdraw 20% tokens after 6 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(8035200));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber() / 10 ** 18, 950000);
    let teamTokenInitaially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitaially / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(950000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 1900000);
  });

  it('Should be able to withdraw 30% tokens after 9 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(8035200));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber() / 10 ** 18, 1900000);
    let teamTokenInitaially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitaially / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(90000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 1990000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 2490000);

  });

  it('Should be able to withdraw 40% tokens after 12 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(8035200));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber() / 10 ** 18, 1990000);
    let teamTokenInitaially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitaially / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(950000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 2940000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 3440000);

  });

  it('Should be able to withdraw 50% tokens after 15 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(8035200));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber() / 10 ** 18, 2940000);
    let teamTokenInitaially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitaially / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(950000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 3890000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 4390000);

  });

  it('Should be able to withdraw 60% tokens after 18 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(8035200));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber() / 10 ** 18, 3890000);
    let teamTokenInitaially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitaially / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(950000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 4840000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 5340000);

  });

  it('Should be able to withdraw 70% tokens after 21 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(8035200));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber() / 10 ** 18, 4840000);
    let teamTokenInitaially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitaially / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(950000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 5790000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 6290000);

  });

  it('Should be able to withdraw 80% tokens after 24 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(8035200));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber() / 10 ** 18, 5790000);
    let teamTokenInitaially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitaially / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(800000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 6590000, 'Team token sent later');
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 7090000, 'balance after token get is wrong');

  });

  it('Should be able to withdraw 90% tokens after 27 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(8035200));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber() / 10 ** 18, 6590000);
    let teamTokenInitaially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitaially / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(950000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 7540000, 'Team token sent later');
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 8040000, 'balance after token get is wrong');

  });

  it("Should be able to pause Fesschain Token contract", async () => {

    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, false);
    await this.tokenhold.pause({ from: accounts[9] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, true);
  });

  it('Should Not be able to burn tokens when paused', async () => {

    try {
      let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[4]);
      assert.equal(balanceOfBeneficiary / 10 ** 18, 8040000);
      await this.tokenhold.burn(10000000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert';
      assert.equal(error.message, error_, 'Reverted ');
    }

  });

  it("Should be able unPause Token contract", async () => {
    var pauseStatusBefore = await this.tokenhold.paused.call();
    assert.equal(pauseStatusBefore, true);
    await this.tokenhold.unpause({ from: accounts[9] });
    var pauseStatusAfter = await this.tokenhold.paused.call();
    assert.equal(pauseStatusAfter, false);
  });

  it('Should be able to withdraw 100% tokens after 30 months ', async () => {

    this.openingTime = (await latestTime());
    await increaseTimeTo(this.openingTime + duration.seconds(77760000));
    let teamTokenSent = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSent.toNumber() / 10 ** 18, 7540000);
    let teamTokenInitaially = await this.tokenhold.teamTokenInitially(accounts[4]);
    assert.equal(teamTokenInitaially / 10 ** 18, 9500000);
    await this.tokenhold.withdrawTeamTokens(1960000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
    assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 9500000);
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 10000000);
  });

  it('Should Not be able to withdraw tokens after all tokens sent ', async () => {

    try {
      this.openingTime = (await latestTime());
      await increaseTimeTo(this.openingTime + duration.seconds(77760000));
      let teamTokenSentLater = await this.tokenhold.teamTokenSent(accounts[4]);
      assert.equal(teamTokenSentLater.toNumber() / 10 ** 18, 9500000);
      let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
      assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 10000000);
      await this.tokenhold.withdrawTeamTokens(5610000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    } catch (error) {
      var error_ = 'VM Exception while processing transaction: revert already withdraw 100 % tokens';
      assert.equal(error.message, error_, 'Reverted ');
    }

  });

  it('Should be able to burn tokens', async () => {

    let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiary / 10 ** 18, 10000000);
    await this.tokenhold.burn(1000000 * 10 ** 18, { from: accounts[4], gas: 5000000 });
    let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
    assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 9000000);
  });

  it('Should check the Total Supply of FessChain Tokens after token burnt', async () => {


    let totalSupply = await this.tokenhold.totalSupply();
    assert.equal(totalSupply / 10 ** 18, 9999000000);
  });
  it('Should be able check owner of the contract', async () => {

    let ownerNew = await this.tokenhold.owner.call();
    assert.equal(ownerNew, accounts[9], 'Transfered ownership');

  });

})


