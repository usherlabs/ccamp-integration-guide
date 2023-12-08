import { _getClient, _getWalletAndProvider } from "./utils/functions";
import config from "../config.json";
import { ENV } from "@ccamp/lib";

const DEPOSIT_AMOUNT = 100000;

async function depositFunds() {
  // instantiate the client
  const client = _getClient(config.privateKey, ENV.prod);
  const { wallet } = _getWalletAndProvider();


  // approve the locker contract to take funds from your account into the network
  const depositAmount = DEPOSIT_AMOUNT;
  const approvalTx = await client.approveLockerContract(
    config.testTokenAddress,
    depositAmount,
    wallet
  );
  await approvalTx.wait();
  const deposit = await client.deposit(
    depositAmount,
    config.testTokenAddress,
    wallet
  );
  const reciept = await deposit.wait();
  console.log({ reciept });
  // deposit some funds into the protocol
}

depositFunds();
