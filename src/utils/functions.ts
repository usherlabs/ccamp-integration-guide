import { ethers } from "ethers";
import config from "../../config.json";
import { CCAMPClient, Environment } from "@ccamp/lib";

export const _getWalletAndProvider = () => {
  const infuraProvider = new ethers.providers.InfuraProvider(
    config.chain,
    config.infuraKey
  );
  const wallet = new ethers.Wallet(config.privateKey, infuraProvider);

  return {
    wallet,
    provider: infuraProvider,
  };
};

export const _getClient = (privateKey: string, env: Environment) =>
  new CCAMPClient(privateKey, { env: env });
