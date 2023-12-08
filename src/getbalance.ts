import { _getClient, _getWalletAndProvider } from "./utils/functions";
import config from "../config.json";
import { ENV } from "@ccamp/lib";
import { Principal } from "@dfinity/principal";
// import { Principal } from "@dfinity/principal";

const ACCOUNT = "0x1AE26a1F23E2C70729510cdfeC205507675208F2";

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
  });
}

withdrawFunds();
