import BN from 'bn.js';
import TronWeb3Client from './TronWeb3Client';
import { address } from '../types/Common';
import { Utils } from '../common/Utils';
export default class TronContractsBase {
    static MATIC_CHILD_TOKEN: address;
    web3Client: TronWeb3Client;
    network: any;
    utils: Utils;
    constructor(web3Client: TronWeb3Client, network: any);
    encode(number: BN | string | number): string;
    getERC20TokenContract(token: address, parent?: boolean): any;
    getERC721TokenContract(token: address, parent?: boolean): any;
    getChildMaticContract(): import("web3-eth-contract").Contract;
    getPOSERC20TokenContract(token: address, parent?: boolean): any;
    getPOSERC721TokenContract(token: address, parent?: boolean): any;
    getPOSERC1155TokenContract(token: address, parent?: boolean): any;
}
