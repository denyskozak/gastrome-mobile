import {generateNonce, generateRandomness} from '@mysten/zklogin';
// import {Ed25519Keypair} from '@mysten/sui/keypairs/ed25519';
// import {SuiClient} from "@mysten/sui/client";
import AsyncStorage from "@react-native-community/async-storage";

// const FULLNODE_URL = 'https://fullnode.devnet.sui.io'; // replace with the RPC URL you want to use
// export const suiClient = new SuiClient({url: FULLNODE_URL});
// const {epoch, epochDurationMs, epochStartTimestampMs} = await suiClient.getLatestSuiSystemState();

// const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.

// const NONCE_ASYNC_KEY = 'NONCE_ASYNC_KEY';

export const getNonce = async () => {
    // const savedNonce = await AsyncStorage.getItem(NONCE_ASYNC_KEY);
    // if (savedNonce) return savedNonce;
    // const ephemeralKeyPair = new Ed25519Keypair();
    // const randomness = generateRandomness();
    // const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
    // await AsyncStorage.setItem(NONCE_ASYNC_KEY, nonce);
    // return nonce;
    return 'asd'
}