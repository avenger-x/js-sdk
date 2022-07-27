import TronContractsBase from '../common/TronContractsBase';
import { MaticClientInitializationOptions } from '../types/Common';
import TronWeb3Client from '../common/TronWeb3Client';
import BN from 'bn.js';
export default class TronRootChain extends TronContractsBase {
    static BIG_ONE: BN;
    static BIG_TWO: BN;
    static CHECKPOINT_ID_INTERVAL: BN;
    rootChain: any;
    constructor(options: MaticClientInitializationOptions, web3Client: TronWeb3Client);
    getTronRootChainContract(): Promise<any>;
    getLastChildBlock(): Promise<any>;
    getCheckpointInclusion(burnTxHash: any): Promise<any>;
    findHeaderBlockNumber(childBlockNumber: BN | string | number): Promise<BN>;
}
