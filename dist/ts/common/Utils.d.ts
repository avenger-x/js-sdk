export declare class Utils {
    getOrderHash(order: any): any;
    getTypedData({ token, spender, tokenIdOrAmount, data, expiration, chainId }: {
        token: any;
        spender: any;
        tokenIdOrAmount: any;
        data: any;
        expiration: any;
        chainId: any;
    }): {
        types: {
            EIP712Domain: {
                name: string;
                type: string;
            }[];
            TokenTransferOrder: {
                name: string;
                type: string;
            }[];
        };
        domain: {
            name: string;
            version: string;
            chainId: any;
            contract: any;
        };
        primaryType: string;
        message: {
            spender: any;
            tokenIdOrAmount: any;
            data: any;
            expiration: any;
        };
    };
    signEIP712TypedData(data: any, privateKey: any): any;
    createTronWeb(tronWebOptions: any): any;
    getTronContract(tronWeb: any, abi: any, token: any): Promise<any>;
    transferAddress(tronWeb: any, address: any, toHex: any): any;
}
