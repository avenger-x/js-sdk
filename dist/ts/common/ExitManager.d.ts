import Web3Client from './Web3Client';
import ContractsBase from './ContractsBase';
import RootChain from '../root/RootChain';
import { MaticClientInitializationOptions } from '../types/Common';
export default class ExitManager extends ContractsBase {
    private rootChain;
    private networkApiUrl;
    constructor(rootChain: RootChain, options: MaticClientInitializationOptions, web3Client: Web3Client);
    buildPayloadForExitTron(burnTxHash: any, logEventSig: any, requestConcurrency?: any, tronObj?: any): Promise<any>;
    buildPayloadForExit(burnTxHash: any, logEventSig: any, requestConcurrency?: any): Promise<any>;
    buildPayloadForExitFastMerkle(start: any, end: any, blockNumber: any): Promise<any>;
    buildPayloadForExitHermoine(burnTxHash: any, logEventSig: any): Promise<any>;
    getExitHash(burnTxHash: any, logEventSig: any, requestConcurrency?: any): Promise<string>;
    private _encodePayload;
}
