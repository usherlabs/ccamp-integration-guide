import { _getClient, _getWalletAndProvider } from "./utils/functions";
import config from "../config.json";
import { ENV } from "@ccamp/lib";
import { Principal } from "@dfinity/principal";
// import { Principal } from "@dfinity/principal";

const ACCOUNT = "0x1AE26a1F23E2C70729510cdfeC205507675208F2";

async function withdrawFunds() {
  // instantiate the client
  const client = _getClient(config.privateKey, ENV.dev);
  const response = await client.agent.getPrincipal();

  const principalString = response.toString();

  console.log({
    principalString,
  });
}

withdrawFunds();
