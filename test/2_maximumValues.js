const FessChain = artifacts.require('FessChain.sol');
const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

contract('FessChain Token Contract, Test for Maximum values', async (accounts) => {


    it('Should correctly initialize constructor values of FessChain Token Contract', async () => {

        this.tokenhold = await FessChain.new(accounts[0], { from: accounts[0], gas: 60000000 });

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

    it('Should be able to send marketing Tokens by owner only', async () => {

        let marketingTokens = await this.tokenhold.marketingTokens();
        assert.equal(marketingTokens / 10 ** 18, 10000000);
        let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOfBeneficiary, 0);
        await this.tokenhold.sendMarketingTokens(accounts[2], 10000000000000000000000000, { from: accounts[0], gas: 5000000 });
        let marketingTokensLater = await this.tokenhold.marketingTokens();
        assert.equal(marketingTokensLater / 10 ** 18, 0);
        let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[2]);
        assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 10000000);

    });

    it('Should be able to check marketing Token after sent to beneficiary', async () => {

        let marketingTokensLater = await this.tokenhold.marketingTokens();
        assert.equal(marketingTokensLater / 10 ** 18, 0);

    });

    it('Should be able to send Maintainance Tokens by owner only when not paused', async () => {

        let maintainanceTokens = await this.tokenhold.maintainanceTokens();
        assert.equal(maintainanceTokens / 10 ** 18, 1000000000);
        let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfBeneficiary / 10 ** 18, 10000000);
        await this.tokenhold.sendMaintainanceTokens(accounts[1], 1000000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
        let maintainanceTokensLater = await this.tokenhold.maintainanceTokens();
        assert.equal(maintainanceTokensLater / 10 ** 18, 0);
        let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 1010000000);

    });

    it('Should be able to check Maintainance Token after sent to beneficiary', async () => {

        let maintainanceTokensLater = await this.tokenhold.maintainanceTokens();
        assert.equal(maintainanceTokensLater / 10 ** 18, 0);

    });

    it('Should be able to send Air Drop In IEO Tokens by owner only', async () => {

        let airDropInIEO = await this.tokenhold.airDropInIEO();
        assert.equal(airDropInIEO / 10 ** 18, 20000000);
        let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfBeneficiary / 10 ** 18, 1010000000);
        await this.tokenhold.sendAirDropIEO(accounts[1], 20000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
        let airDropInIEOLater = await this.tokenhold.airDropInIEO();
        assert.equal(airDropInIEOLater / 10 ** 18, 0);
        let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 1030000000);

    });

    it('Should be able to check Air drop in IEO after sent to beneficiary', async () => {

        let airDropInIEOLater = await this.tokenhold.airDropInIEO();
        assert.equal(airDropInIEOLater / 10 ** 18, 0);

    });

    it('Should be able to Send Minting Tokens by owner only', async () => {

        let mintingTokens = await this.tokenhold.mintingTokens();
        assert.equal(mintingTokens / 10 ** 18, 2250000000);
        let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfBeneficiary / 10 ** 18, 1030000000);
        await this.tokenhold.sendMintingTokens(accounts[1], 2250000000*10**18, { from: accounts[0], gas: 5000000 });
        let mintingTokensLater = await this.tokenhold.mintingTokens();
        assert.equal(mintingTokensLater / 10 ** 18, 0);
        let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 3280000000);

    });

    it('Should be able to check Minting tokens after sent to beneficiary', async () => {

        let mintingTokensLater = await this.tokenhold.mintingTokens();
        assert.equal(mintingTokensLater / 10 ** 18, 0);

    });

    it('Should be able to Send bounty In IEO Tokens by owner only', async () => {

        let bountyInIEO = await this.tokenhold.bountyInIEO();
        assert.equal(bountyInIEO / 10 ** 18, 30000000);
        let balanceOfBeneficiary = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfBeneficiary / 10 ** 18, 3280000000);
        await this.tokenhold.sendBountyIEO(accounts[1], 30000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });
        let bountyInIEOLater = await this.tokenhold.bountyInIEO();
        assert.equal(bountyInIEOLater / 10 ** 18, 0);
        let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[1]);
        assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 3310000000);

    });

    it('Should be able to check bounty in IEO after sent to beneficiary', async () => {

        let bountyInIEOLater = await this.tokenhold.bountyInIEO();
        assert.equal(bountyInIEOLater / 10 ** 18, 0);

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

        await this.tokenhold.sendTeamTokens(accounts[4], 2400000000 * 10 ** 18, { from: accounts[0], gas: 5000000 });

        let teamTokenHolderLater = await this.tokenhold.teamTokenHolder(accounts[4]);
        assert.equal(teamTokenHolderLater, true);
        let teamTokenLater = await this.tokenhold.teamTokenInitially(accounts[4]);
        assert.equal(teamTokenLater / 10 ** 18, 2280000000);
        let teamTokensLeft = await this.tokenhold.teamTokens();
        assert.equal(teamTokensLeft / 10 ** 18, 0);
        let balanceOfBeneficiaryLater = await this.tokenhold.balanceOf(accounts[4]);
        assert.equal(balanceOfBeneficiaryLater / 10 ** 18, 120000000);

    });

})


