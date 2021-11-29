# Contract security measures

## Overflow Underflow

use solidity version `0.8.*` with embedded safe math library.

## SWC-100 (Function Default Visibility)

All function visibility is set.

## SWC-103 (Floating pragma)

Specific compiler pragma `0.8.10` used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## SWC-105 (Unprotected Ether Withdrawal)

`refund` is protected with `isFunder` modifier.

`claimFunds` is protected with `OnlyCreator` modifier.

## Modifiers used only for validation

All modifiers in contract(s) only validate data with `require` statements.

## Pull over push

All functions that modify state are based on receiving calls rather than making contract calls.
