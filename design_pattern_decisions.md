# Design patterns used

## Contract Factory

- `CampaignFactory` responsible for creating campaign contracts `CreateCampaign`

## Access Control Design Patterns

- `Ownable` design pattern from openZeppelin used in functions: `setMinGoal()`.
- `Context` from openZeppelin to use `_msgSender()`
- `OnlyCreator` used for campaign creators to claim funds: `claimFunds()`

## Inheritance and Interfaces

- `ICampaign` interface used for `Campaign.sol`.
- `ICampaignFactory` interface used for `CampaignFactory.sol`

