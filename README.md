# CCAMP: Cross-chain Asset Management Protocol Integration Guide

This guide provides step-by-step instructions on how to integrate with the CCAMP (Cross-Chain Asset Management Protocol) network using the `CCAMPClient` library. The examples below demonstrate depositing and withdrawing funds, as well as manual data publishing to the Protocol Data Collection canister.

## Prerequisites

Before you begin, ensure you have the following:

- Ethereum private key
- Infura API key
- Test token address on the Ethereum network
- Chain identifier (e.g., "ethereum:5" for Goerli testnet)

## Installation

Install the required dependencies:

```bash
npm install @ccamp/lib ethers
```

## Example Integration

```typescript
import { ethers } from "ethers";
import {
  CCAMPClient,
  ENV,
  CANISTER_TYPES,
  Environment,
  ProtocolDataCollectionCanister,
  RemittanceCanister,
  DataCollectionCanister,
} from "@ccamp/lib";

// Replace with your own values
const privateKey = "YOUR_ETHEREUM_PRIVATE_KEY";
const chain = "goerli";
const infuraKey = "YOUR_INFURA_API_KEY";
const testTokenAddress = "YOUR_TEST_TOKEN_ADDRESS";
const chainIdentifier = "ethereum:5";

// Helper function to get wallet and provider
const _getWalletAndProvider = () => {
  const infuraProvider = new ethers.providers.InfuraProvider(chain, infuraKey);
  const wallet = new ethers.Wallet(privateKey, infuraProvider);

  return {
    wallet,
    provider: infuraProvider,
  };
};

// Helper function to instantiate CCAMPClient
const _getClient = (privateKey: string, env: Environment) =>
  new CCAMPClient(privateKey, { env: env });

// Deposit funds into the protocol
async function depositFunds() {
  const client = _getClient(privateKey, ENV.prod);
  const { wallet } = _getWalletAndProvider();

  // Approve the locker contract to take funds from your account into the network
  const depositAmount = 1000;
  const approvalTx = await client.approveLockerContract(
    testTokenAddress,
    depositAmount,
    wallet
  );
  await approvalTx.wait();

  // Deposit some funds into the protocol
  // Add your deposit logic here
}

// Withdraw funds from the protocol
async function withdrawFunds() {
  const client = _getClient(privateKey, ENV.prod);
  const { wallet } = _getWalletAndProvider();

  // Get the parameters from the canisters and facilitate a withdrawal from the smart contract
  const withdrawAmount = 1000;
  const deposit = await client.withdraw(
    withdrawAmount,
    testTokenAddress,
    chainIdentifier,
    wallet
  );
  // Add your withdrawal logic here
}

// Get instances of CCAMP canisters
function getCCampCanisters(client: CCAMPClient) {
  const pdcCanister: ProtocolDataCollectionCanister =
    client.getCanisterInstance(CANISTER_TYPES.PROTOCOL_DATA_COLLECTION);
  const remittanceCanister: RemittanceCanister = client.getCanisterInstance(
    CANISTER_TYPES.REMITTANCE
  );
  const dcCanister: DataCollectionCanister = client.getCanisterInstance(
    CANISTER_TYPES.DATA_COLLECTION
  );

  return {
    pdcCanister,
    remittanceCanister,
    dcCanister,
  };
}

// Manual data publishing to the Protocol Data Collection canister
async function manualPublishToPDC() {
  const SAMPLE_DEPOSIT_EVENT = {
    event_name: "FundsDeposited",
    canister_id: "CANISTER_ID",
    account: "ACTOR_ONE",
    amount: "DEPOSIT_AMOUNT",
    chain: "CHAIN",
    token: "TOKEN",
  };

  const client = _getClient(privateKey, ENV.prod);

  // Get pdc canister
  const { pdcCanister } = getCCampCanisters(client);
  const response = await pdcCanister.manual_publish(
    JSON.stringify(SAMPLE_DEPOSIT_EVENT)
  );
  // Add your publishing logic here
}
```



This example demonstrates basic interactions with the CCAMP network, covering fund deposit, withdrawal, and manual data publishing to the Protocol Data Collection canister. Ensure to replace placeholder values with your actual credentials and adapt the code according to your integration needs. For more detailed information on all the methods available for each canister, please consult the documentation of the canisters
