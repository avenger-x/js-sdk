export default class MerkleTree {
    leaves: any;
    layers: any;
    constructor(leaves?: any[]);
    createHashes(nodes: any): boolean;
    getLeaves(): any;
    getLayers(): any;
    getRoot(): any;
    getProof(leaf: any): any[];
    verify(value: any, index: any, root: any, proof: any): boolean;
}
