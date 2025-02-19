"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var MapPromise_1 = require("../common/MapPromise");
var BN = require('bn.js');
var Trie = require('merkle-patricia-tree');
var EthereumTx = require('ethereumjs-tx');
var ethUtils = require('ethereumjs-util');
var MerkleTree = require('./MerkleTree');
var EthereumBlock = require('ethereumjs-block/from-rpc');
var rlp = ethUtils.rlp;
var logger = {
    info: require('debug')('maticjs:Web3Client'),
    debug: require('debug')('maticjs:debug:Web3Client'),
};
// TODO: remove proofs util and use plasma-core library
var ProofsUtil = /** @class */ (function () {
    function ProofsUtil() {
    }
    ProofsUtil.getBlockHeader = function (block) {
        var n = new BN(block.number).toArrayLike(Buffer, 'be', 32);
        var ts = new BN(block.timestamp).toArrayLike(Buffer, 'be', 32);
        var txRoot = ethUtils.toBuffer(block.transactionsRoot);
        var receiptsRoot = ethUtils.toBuffer(block.receiptsRoot);
        return ethUtils.keccak256(Buffer.concat([n, ts, txRoot, receiptsRoot]));
    };
    ProofsUtil.buildCheckpointRoot = function (web3, start, end) {
        return __awaiter(this, void 0, void 0, function () {
            var tree;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('buildCheckpointRoot...');
                        return [4 /*yield*/, ProofsUtil.buildBlockHeaderMerkle(web3, start, end)];
                    case 1:
                        tree = _a.sent();
                        return [2 /*return*/, ethUtils.bufferToHex(tree.getRoot())];
                }
            });
        });
    };
    ProofsUtil.buildBlockProof = function (web3, start, end, blockNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var proof;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('buildBlockProof...', start, end, blockNumber);
                        return [4 /*yield*/, ProofsUtil.getFastMerkleProof(web3, blockNumber, start, end)];
                    case 1:
                        proof = _a.sent();
                        return [2 /*return*/, ethUtils.bufferToHex(Buffer.concat(proof.map(function (p) {
                                return ethUtils.toBuffer(p);
                            })))];
                }
            });
        });
    };
    ProofsUtil.buildBlockProofHermoine = function (web3, start, end, blockNumber, networkApiUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var tree, proof, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger.debug('buildBlockProof...', start, end, blockNumber);
                        return [4 /*yield*/, ProofsUtil.buildBlockHeaderMerkleHermoine(start, end, networkApiUrl)];
                    case 1:
                        tree = _e.sent();
                        _b = (_a = tree).getProof;
                        _d = (_c = ProofsUtil).getBlockHeader;
                        return [4 /*yield*/, web3.eth.getBlock(blockNumber)];
                    case 2:
                        proof = _b.apply(_a, [_d.apply(_c, [_e.sent()])]);
                        return [2 /*return*/, ethUtils.bufferToHex(Buffer.concat(proof))];
                }
            });
        });
    };
    ProofsUtil.queryRootHash = function (web3, startBlock, endBlock) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = (_a = ethUtils).toBuffer;
                        _c = "0x";
                        return [4 /*yield*/, web3.bor.getRootHash(startBlock, endBlock)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c + (_d.sent())])];
                    case 2:
                        err_1 = _d.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProofsUtil.recursiveZeroHash = function (n, web3) {
        if (n === 0)
            return '0x0000000000000000000000000000000000000000000000000000000000000000';
        var subHash = this.recursiveZeroHash(n - 1, web3);
        return ethUtils.keccak256(ethUtils.toBuffer(web3.eth.abi.encodeParameters(['bytes32', 'bytes32'], [subHash, subHash])));
    };
    ProofsUtil.getFastMerkleProof = function (web3, blockNumber, startBlock, endBlock) {
        return __awaiter(this, void 0, void 0, function () {
            var merkleTreeDepth, reversedProof, offset, targetIndex, leftBound, rightBound, _loop_1, this_1, depth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        merkleTreeDepth = Math.ceil(Math.log2(endBlock - startBlock + 1));
                        reversedProof = [];
                        offset = startBlock;
                        targetIndex = blockNumber - offset;
                        leftBound = 0;
                        rightBound = endBlock - offset;
                        _loop_1 = function (depth) {
                            var nLeaves, pivotLeaf, newLeftBound, subTreeMerkleRoot, newRightBound, expectedHeight, subTreeMerkleRoot, subTreeHeight, heightDifference, remainingNodesHash, leafRoots_1, leaves, subTreeMerkleRoot;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        nLeaves = Math.pow(2, (merkleTreeDepth - depth));
                                        pivotLeaf = leftBound + nLeaves / 2 - 1;
                                        if (!(targetIndex > pivotLeaf)) return [3 /*break*/, 2];
                                        newLeftBound = pivotLeaf + 1;
                                        return [4 /*yield*/, this_1.queryRootHash(web3, offset + leftBound, offset + pivotLeaf)];
                                    case 1:
                                        subTreeMerkleRoot = _a.sent();
                                        reversedProof.push(subTreeMerkleRoot);
                                        leftBound = newLeftBound;
                                        return [3 /*break*/, 6];
                                    case 2:
                                        newRightBound = Math.min(rightBound, pivotLeaf);
                                        expectedHeight = merkleTreeDepth - (depth + 1);
                                        if (!(rightBound <= pivotLeaf)) return [3 /*break*/, 3];
                                        subTreeMerkleRoot = this_1.recursiveZeroHash(expectedHeight, web3);
                                        reversedProof.push(subTreeMerkleRoot);
                                        return [3 /*break*/, 5];
                                    case 3:
                                        subTreeHeight = Math.ceil(Math.log2(rightBound - pivotLeaf));
                                        heightDifference = expectedHeight - subTreeHeight;
                                        return [4 /*yield*/, this_1.queryRootHash(web3, offset + pivotLeaf + 1, offset + rightBound)
                                            // The remaining leaves will hold the merkle root of a zero-filled tree of height subTreeHeight
                                        ];
                                    case 4:
                                        remainingNodesHash = _a.sent();
                                        leafRoots_1 = this_1.recursiveZeroHash(subTreeHeight, web3);
                                        leaves = Array.from({ length: Math.pow(2, heightDifference) }, function () { return ethUtils.toBuffer(leafRoots_1); });
                                        leaves[0] = remainingNodesHash;
                                        subTreeMerkleRoot = new MerkleTree(leaves).getRoot();
                                        reversedProof.push(subTreeMerkleRoot);
                                        _a.label = 5;
                                    case 5:
                                        rightBound = newRightBound;
                                        _a.label = 6;
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        depth = 0;
                        _a.label = 1;
                    case 1:
                        if (!(depth < merkleTreeDepth)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(depth)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        depth += 1;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, reversedProof.reverse()];
                }
            });
        });
    };
    ProofsUtil.buildBlockHeaderMerkleHermoine = function (start, end, networkApiUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var logDetails, logs, headers, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(networkApiUrl + '/generate-proof?start=' + start + '&end=' + end)];
                    case 1:
                        logDetails = _a.sent();
                        logs = logDetails.data.merkle_headerblocks;
                        headers = new Array(end - start + 1);
                        for (i = 0; i < end - start + 1; i++) {
                            headers[i] = ProofsUtil.getBlockHeader(logs[i]);
                        }
                        return [2 /*return*/, new MerkleTree(headers)];
                }
            });
        });
    };
    ProofsUtil.buildBlockHeaderMerkle = function (web3, start, end) {
        return __awaiter(this, void 0, void 0, function () {
            var headers;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = new Array(end - start + 1);
                        return [4 /*yield*/, MapPromise_1.mapPromise(headers, 
                            // eslint-disable-next-line
                            function (_, i) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, _c, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            logger.debug('fetching block', i + start);
                                            _a = headers;
                                            _b = i;
                                            _d = (_c = ProofsUtil).getBlockHeader;
                                            return [4 /*yield*/, web3.eth.getBlock(i + start)];
                                        case 1:
                                            _a[_b] = _d.apply(_c, [_e.sent()]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, { concurrency: 20 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new MerkleTree(headers)];
                }
            });
        });
    };
    ProofsUtil.getTxProof = function (tx, block) {
        return __awaiter(this, void 0, void 0, function () {
            var txTrie, stateSyncTxHash, _loop_2, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txTrie = new Trie();
                        stateSyncTxHash = ethUtils.bufferToHex(ProofsUtil.getStateSyncTxHash(block));
                        _loop_2 = function (i) {
                            var siblingTx, path, rawSignedSiblingTx;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        siblingTx = block.transactions[i];
                                        if (siblingTx.hash === stateSyncTxHash) {
                                            return [2 /*return*/, "continue"];
                                        }
                                        path = rlp.encode(siblingTx.transactionIndex);
                                        rawSignedSiblingTx = ProofsUtil.getTxBytes(siblingTx);
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                txTrie.put(path, rawSignedSiblingTx, function (err) {
                                                    if (err) {
                                                        reject(err);
                                                    }
                                                    else {
                                                        resolve({});
                                                    }
                                                });
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < block.transactions.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_2(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: 
                    // promise
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            txTrie.findPath(rlp.encode(tx.transactionIndex), function (err, rawTxNode, reminder, stack) {
                                if (err) {
                                    return reject(err);
                                }
                                if (reminder.length > 0) {
                                    return reject(new Error('Node does not contain the key'));
                                }
                                var prf = {
                                    blockHash: ethUtils.toBuffer(tx.blockHash),
                                    parentNodes: stack.map(function (s) { return s.raw; }),
                                    root: ProofsUtil.getRawHeader(block).transactionsTrie,
                                    path: rlp.encode(tx.transactionIndex),
                                    value: rlp.decode(rawTxNode.value),
                                };
                                resolve(prf);
                            });
                        })];
                }
            });
        });
    };
    ProofsUtil.getTxBytes = function (tx) {
        var txObj = new EthereumTx(ProofsUtil.squanchTx(tx));
        return txObj.serialize();
    };
    ProofsUtil.squanchTx = function (tx) {
        tx.gasPrice = '0x' + parseInt(tx.gasPrice).toString(16);
        tx.value = '0x' + parseInt(tx.value).toString(16) || '0';
        tx.gas = '0x' + parseInt(tx.gas).toString(16);
        tx.data = tx.input;
        return tx;
    };
    ProofsUtil.getRawHeader = function (_block) {
        if (typeof _block.difficulty !== 'string') {
            _block.difficulty = '0x' + _block.difficulty.toString(16);
        }
        var block = new EthereumBlock(_block);
        return block.header;
    };
    ProofsUtil.getReceiptProof = function (receipt, block, web3, requestConcurrency, receipts) {
        if (requestConcurrency === void 0) { requestConcurrency = Infinity; }
        return __awaiter(this, void 0, void 0, function () {
            var stateSyncTxHash, receiptsTrie, receiptPromises, _loop_3, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stateSyncTxHash = ethUtils.bufferToHex(ProofsUtil.getStateSyncTxHash(block));
                        receiptsTrie = new Trie();
                        receiptPromises = [];
                        if (!!receipts) return [3 /*break*/, 2];
                        block.transactions.forEach(function (tx) {
                            if (tx.hash === stateSyncTxHash) {
                                // ignore if tx hash is bor state-sync tx
                                return;
                            }
                            receiptPromises.push(web3.eth.getTransactionReceipt(tx.hash));
                        });
                        return [4 /*yield*/, MapPromise_1.mapPromise(receiptPromises, function (val) {
                                return val;
                            }, {
                                concurrency: requestConcurrency,
                            })];
                    case 1:
                        receipts = _a.sent();
                        _a.label = 2;
                    case 2:
                        _loop_3 = function (i) {
                            var siblingReceipt, path, rawReceipt;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        siblingReceipt = receipts[i];
                                        path = rlp.encode(siblingReceipt.transactionIndex);
                                        rawReceipt = ProofsUtil.getReceiptBytes(siblingReceipt);
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                receiptsTrie.put(path, rawReceipt, function (err) {
                                                    if (err) {
                                                        reject(err);
                                                    }
                                                    else {
                                                        resolve({});
                                                    }
                                                });
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < receipts.length)) return [3 /*break*/, 6];
                        return [5 /*yield**/, _loop_3(i)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: 
                    // promise
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            receiptsTrie.findPath(rlp.encode(receipt.transactionIndex), function (err, rawReceiptNode, reminder, stack) {
                                if (err) {
                                    return reject(err);
                                }
                                if (reminder.length > 0) {
                                    return reject(new Error('Node does not contain the key'));
                                }
                                var prf = {
                                    blockHash: ethUtils.toBuffer(receipt.blockHash),
                                    parentNodes: stack.map(function (s) { return s.raw; }),
                                    root: ProofsUtil.getRawHeader(block).receiptTrie,
                                    path: rlp.encode(receipt.transactionIndex),
                                    value: rlp.decode(rawReceiptNode.value),
                                };
                                resolve(prf);
                            });
                        })];
                }
            });
        });
    };
    ProofsUtil.getReceiptBytes = function (receipt) {
        var encodedData = rlp.encode([
            ethUtils.toBuffer(receipt.status !== undefined && receipt.status != null ? (receipt.status ? '0x1' : '0x') : receipt.root),
            ethUtils.toBuffer(receipt.cumulativeGasUsed),
            ethUtils.toBuffer(receipt.logsBloom),
            // encoded log array
            receipt.logs.map(function (l) {
                // [address, [topics array], data]
                return [
                    ethUtils.toBuffer(l.address),
                    l.topics.map(ethUtils.toBuffer),
                    ethUtils.toBuffer(l.data),
                ];
            }),
        ]);
        if (receipt.status !== undefined && receipt.status !== null && receipt.type !== '0x0' && receipt.type !== '0x') {
            encodedData = Buffer.concat([ethUtils.toBuffer(receipt.type), encodedData]);
        }
        return encodedData;
    };
    // getStateSyncTxHash returns block's tx hash for state-sync receipt
    // Bor blockchain includes extra receipt/tx for state-sync logs,
    // but it is not included in transactionRoot or receiptRoot.
    // So, while calculating proof, we have to exclude them.
    //
    // This is derived from block's hash and number
    // state-sync tx hash = keccak256("matic-bor-receipt-" + block.number + block.hash)
    ProofsUtil.getStateSyncTxHash = function (block) {
        return ethUtils.keccak256(Buffer.concat([
            ethUtils.toBuffer('matic-bor-receipt-'),
            ethUtils.setLengthLeft(ethUtils.toBuffer(block.number), 8),
            ethUtils.toBuffer(block.hash),
        ]));
    };
    return ProofsUtil;
}());
exports.default = ProofsUtil;
