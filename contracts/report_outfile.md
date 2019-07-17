## Sūrya's Description Report

### Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| FessChain.sol | c4cc1482011d1bb2515dbb459e34743b7cdb3a3c |


### Contracts Description Table


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
| **FessChain** | Implementation | ERC20 |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Owned |
| └ | transfer | Public ❗️ | 🛑  | whenNotPaused |
| └ | transferFrom | Public ❗️ | 🛑  | whenNotPaused |
| └ | sendTeamTokens | External ❗️ | 🛑  | whenNotPaused onlyOwner |
| └ | sendMarketingTokens | External ❗️ | 🛑  | whenNotPaused onlyOwner |
| └ | sendMaintainanceTokens | External ❗️ | 🛑  | whenNotPaused onlyOwner |
| └ | sendAirDropIEO | External ❗️ | 🛑  | whenNotPaused onlyOwner |
| └ | sendBountyIEO | External ❗️ | 🛑  | whenNotPaused onlyOwner |
| └ | sendAirDropAndBountyDapps | External ❗️ | 🛑  | whenNotPaused onlyOwner |
| └ | sendMintingTokens | External ❗️ | 🛑  | whenNotPaused onlyOwner |
| └ | burn | External ❗️ | 🛑  | whenNotPaused |
| └ | withdrawTeamTokens | External ❗️ | 🛑  | whenNotPaused |


### Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |
