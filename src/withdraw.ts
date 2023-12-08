import { _getClient, _getWalletAndProvider } from "./utils/functions";
import config from "../config.json";
import { ENV } from "@ccamp/lib";

const WITHDRAW_AMOUNT = 12344;

async function withdrawFunds() {
  // instantiate the client
  const client = _getClient(config.privateKey, ENV.prod);
  const { wallet } = _getWalletAndProvider();

  // get the parameters from the canisters and facilitate a withdrawal from the smart contract
  const withdrawAmount = WITHDRAW_AMOUNT;
  const deposit = await client.withdraw(
    withdrawAmount,
    config.testTokenAddress,
    config.chainIdentifier,
    wallet
  );

  const reciept = await deposit.wait();
  console.log({ reciept });
}

withdrawFunds();
