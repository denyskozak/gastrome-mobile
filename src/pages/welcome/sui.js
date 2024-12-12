import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { getFaucetHost, requestSuiFromFaucetV1 } from '@mysten/sui/faucet';
import { MIST_PER_SUI } from '@mysten/sui/utils';

// replace <YOUR_SUI_ADDRESS> with your actual address, which is in the form 0x123...
const MY_ADDRESS = '0x5db8d3ebbbad4e1083040d41d78bc7600f9b2f69deb43b5abb067872d3bb1c17';

// create a new SuiClient object pointing to the network you want to use
const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

// Convert MIST to Sui
const balance = (balance) => {
    return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
};

// store the JSON representation for the SUI the address owns before using faucet

suiClient.getBalance({
    owner: MY_ADDRESS,
}).then(a => console.log(a));
// store the JSON representation for the SUI the address owns after using faucet
