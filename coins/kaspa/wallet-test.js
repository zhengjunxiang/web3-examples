const { Wallet, initKaspaFramework } = require('@kaspa/wallet');
const { RPC } = require('@kaspa/grpc-node');
const Address = require('@caldera-network/kaspa-core-lib/lib/address');

const exportAddressAndPrivateKey = (rpc, index, network) => {
  const wallet = new Wallet(null, null, {network, rpc});
  const walletFromMnemonic = Wallet.fromMnemonic(
    wallet.mnemonic,
    { network, rpc },
    {disableAddressDerivation:true}
  );

  const toBuffer = walletFromMnemonic.HDWallet.hdPublicKey.publicKey.toBuffer();
  console.log(index, network,'privateKey: ', walletFromMnemonic.HDWallet.privateKey.toString())
  // const addresss = Address.fromPublicKeyBuffer(publicKey, 'livenet').toString()
  const addresss = Address.fromPublicKeyBuffer(toBuffer, network).toString()
  console.log(index, network, 'address: ', addresss)
  // console.log(index,'address: ', kaspa.addressFromPrvKey(walletFromMnemonic.HDWallet.privateKey.toString()))
}

(async () => {

  await initKaspaFramework();

  const rpc = new RPC({ clientConfig:{ host : 'kas.nownodes.io' } });
  // 从助记符创建
  Array(5).fill(1).forEach((item, idex) => {
    // exportAddressAndPrivateKey(rpc, idex, 'kaspa')
    exportAddressAndPrivateKey(rpc, idex, 'kaspatest')
  })
})();
