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

const privateKey =
  "5c84798ddd6c66759443f0f148aafd25f8c1c670e9014e901bbdd4fe7f24d0d1";
const chain = "goerli";
const infuraKey = "ee55daa43fd04742ac2cc4053af2e2be";
const testTokenAddress = "0xB24a30A3971e4d9bf771BDc81435c25EA69A445c";
const chainIdentifier = "ethereum:5";

const _getWalletAndProvider = () => {
  const infuraProvider = new ethers.providers.InfuraProvider(chain, infuraKey);
  const wallet = new ethers.Wallet(privateKey, infuraProvider);

  return {
    wallet,
    provider: infuraProvider,
  };
};

const _getClient = (privateKey: string, env: Environment) =>
  new CCAMPClient(privateKey, { env: env });

async function depositFunds() {
  // instantiate the client
  const client = _getClient(privateKey, ENV.prod);
  const { wallet } = _getWalletAndProvider();

  // approve the locker contract to take funds from your account into the network
  const depositAmount = 1000;
  const approvalTx = await client.approveLockerContract(
    testTokenAddress,
    depositAmount,
    wallet
  );
  await approvalTx.wait();

  // deposit some funds into the protocol
}

async function withdrawFunds() {
  // instantiate the client
  const client = _getClient(privateKey, ENV.prod);
  const { wallet } = _getWalletAndProvider();

  // get the parameters from the canisters and facilitate a withdrawal from the smart contract
  const withdrawAmount = 1000;
  const deposit = await client.withdraw(
    withdrawAmount,
    testTokenAddress,
    chainIdentifier,
    wallet
  );
}

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

// use the pdc canister to publish data from the PDC to the network
// ? note: to use this function the account generated from your private key has to be the one used to create the pdc
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

  // get pdc canister
  const { pdcCanister } = getCCampCanisters(client);
  const response = await pdcCanister.manual_publish(
    JSON.stringify(SAMPLE_DEPOSIT_EVENT)
  );
}
