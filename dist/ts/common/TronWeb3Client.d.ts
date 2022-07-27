import Web3 from 'web3';
import { SendOptions } from '../types/Common';
import TronWeb from 'tronweb';
import { Utils } from '../common/Utils';
export default class TronWeb3Client {
    parentWeb3: TronWeb;
    web3: Web3;
    parentDefaultOptions: SendOptions;
    maticDefaultOptions: SendOptions;
    events: any;
    utils: Utils;
    tronWebOptions: any;
    constructor(parentProvider: any, maticProvider: any, parentDefaultOptions: any, maticDefaultOptions: any, tronWebOptions: any);
    set wallet(_wallet: any);
    call(method: any, options?: SendOptions): Promise<any>;
    fillOptions(txObject: any, onRootChain: boolean, options?: SendOptions): Promise<{
        from: any;
        gas: any;
        gasLimit: any;
        gasPrice: any;
        nonce: any;
        chainId: any;
        callValue: any;
        to: any;
        data: any;
        encodeAbi: any;
    }>;
    private _fillOptions;
    wrapWeb3Promise(promise: any, callbacks: any): any;
    send(txObject: any, web3Options?: any, callbacks?: any): any;
    getParentWeb3(): any;
    getMaticWeb3(): Web3;
    getWallet(): import("web3-core").WalletBase;
    setParentDefaultOptions(options: any): void;
    setMaticDefaultOptions(options: any): void;
    setParentProvider(): void;
}
