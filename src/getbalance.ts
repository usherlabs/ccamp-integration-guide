import { _getClient, _getWalletAndProvider } from "./utils/functions";
import config from "../config.json";
import { ENV, Principal } from "@ccamp/lib";

const ACCOUNT = "0x8BD65aBDAa622DC0fD56450Be433eAA792B9262D".toLowerCase();

async function withdrawFunds() {
  // instantiate the client
  const client = _getClient(config.privateKey, ENV.prod);

  // get the parameters from the canisters and facilitate a withdrawal from the smart contract
  const { remittanceCanister } = client.getCCampCanisters();

  const accountBalance = await remittanceCanister.get_available_balance(
    config.testTokenAddress,
    config.chainIdentifier,
    ACCOUNT,
    Principal.from(client.canisterIds.dataCollection)
  );
  console.log({
    accountBalance,
    dataCollection: client.canisterIds.dataCollection,
  });
}

withdrawFunds();
