import TronWeb3Client from './TronWeb3Client';
import TronContractsBase from './TronContractsBase';
import TronRootChain from '../root/TronRootChain';
import { MaticClientInitializationOptions } from '../types/Common';
export default class TronExitManager extends TronContractsBase {
    private rootChain;
    private networkApiUrl;
    constructor(rootChain: TronRootChain, options: MaticClientInitializationOptions, web3Client: TronWeb3Client);
    buildPayloadForExit(burnTxHash: any, logEventSig: any, requestConcurrency?: any): Promise<any>;
    buildPayloadForExitFastMerkle(start: any, end: any, blockNumber: any): Promise<any>;
    buildPayloadForExitHermoine(burnTxHash: any, logEventSig: any): Promise<any>;
    getExitHash(burnTxHash: any, logEventSig: any, requestConcurrency?: any): Promise<string>;
    private _encodePayload;
}
