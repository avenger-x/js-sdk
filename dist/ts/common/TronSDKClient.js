"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var network_1 = __importDefault(require("@maticnetwork/meta/network"));
var TronContractsBase_1 = __importDefault(require("../common/TronContractsBase"));
var TronWeb3Client_1 = __importDefault(require("../common/TronWeb3Client"));
//import console from 'console'
var TronSDKClient = /** @class */ (function (_super) {
    __extends(TronSDKClient, _super);
    function TronSDKClient(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var web3Client = new TronWeb3Client_1.default(options.parentProvider || options.network.Main.RPC, options.maticProvider || options.network.Matic.RPC, options.parentDefaultOptions || {}, options.maticDefaultOptions || {}, options.tronWebOptions || {});
        _this = _super.call(this, web3Client, options.network) || this;
        return _this;
    }
    TronSDKClient.initializeNetwork = function (network, version) {
        if (network === void 0) { network = 'testnet'; }
        if (version === void 0) { version = 'mumbai'; }
        var _network = new network_1.default(network, version);
        if (!_network)
            throw new Error("network " + network + " - " + version + " is not supported");
        return _network;
    };
    TronSDKClient.prototype.setWallet = function (_wallet) {
        this.web3Client.wallet = _wallet;
    };
    TronSDKClient.prototype.balanceOfERC20 = function (userAddress, token, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tronWebOptions, contractAddress, contract, banlance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token || !userAddress) {
                            throw new Error('token address or user address is missing');
                        }
                        if (!options.parent) return [3 /*break*/, 3];
                        tronWebOptions = this.getERC20TokenContract(token, options.parent);
                        contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false);
                        return [4 /*yield*/, tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)];
                    case 1:
                        contract = _a.sent();
                        return [4 /*yield*/, contract.methods.balanceOf(userAddress).call()
                            //Smart contract is missing address
                        ];
                    case 2:
                        banlance = _a.sent();
                        //Smart contract is missing address
                        return [2 /*return*/, banlance];
                    case 3: return [2 /*return*/, this.getERC20TokenContract(token, options.parent)
                            .methods.balanceOf(userAddress)
                            .call()];
                }
            });
        });
    };
    TronSDKClient.prototype.balanceOfERC721 = function (userAddress, token, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tronWebOptions, contractAddress, contract, banlance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options && (!token || !userAddress)) {
                            throw new Error('token address or user address is missing');
                        }
                        if (!options.parent) return [3 /*break*/, 3];
                        tronWebOptions = this.getERC20TokenContract(token, options.parent);
                        contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false);
                        return [4 /*yield*/, tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)];
                    case 1:
                        contract = _a.sent();
                        return [4 /*yield*/, contract.methods.balanceOf(userAddress).call()
                            //Smart contract is missing address
                        ];
                    case 2:
                        banlance = _a.sent();
                        //Smart contract is missing address
                        return [2 /*return*/, banlance];
                    case 3: return [2 /*return*/, this.getERC721TokenContract(token, options.parent)
                            .methods.balanceOf(userAddress)
                            .call()];
                }
            });
        });
    };
    TronSDKClient.prototype.tokenOfOwnerByIndexERC721 = function (userAddress, token, index, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tronWebOptions, contractAddress, contract, tokenID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options && (!token || !userAddress)) {
                            throw new Error('token address or user address is missing');
                        }
                        if (!options.parent) return [3 /*break*/, 3];
                        tronWebOptions = this.getERC721TokenContract(token, options.parent);
                        contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false);
                        return [4 /*yield*/, tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)];
                    case 1:
                        contract = _a.sent();
                        return [4 /*yield*/, contract.methods.tokenOfOwnerByIndex(userAddress, index).call()
                            //Smart contract is missing address
                        ];
                    case 2:
                        tokenID = _a.sent();
                        //Smart contract is missing address
                        return [2 /*return*/, tokenID];
                    case 3: return [2 /*return*/, this.getERC721TokenContract(token, options.parent)
                            .methods.tokenOfOwnerByIndex(userAddress, index)
                            .call()];
                }
            });
        });
    };
    TronSDKClient.prototype.transferERC20Tokens = function (token, to, amount, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, tronWebOptions, contractAddress, contract, onRootChain, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options && (!options.from || !amount || !token || !to)) {
                            throw new Error('options.from, to, token or amount is missing');
                        }
                        txObject = null;
                        if (!options.parent) return [3 /*break*/, 3];
                        tronWebOptions = this.getERC20TokenContract(token, options.parent);
                        contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false);
                        return [4 /*yield*/, tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)];
                    case 1:
                        contract = _a.sent();
                        return [4 /*yield*/, contract.methods.transfer(to, this.encode(amount)).call()
                            //Smart contract is missing address
                        ];
                    case 2:
                        txObject = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        txObject = this.getERC20TokenContract(token, options.parent)
                            .methods.transfer(to, this.encode(amount))
                            .call();
                        _a.label = 4;
                    case 4:
                        onRootChain = options.parent ? true : false;
                        return [4 /*yield*/, this.web3Client.fillOptions(txObject, onRootChain, options)];
                    case 5:
                        web3Options = _a.sent();
                        if (web3Options.encodeAbi) {
                            return [2 /*return*/, Object.assign(web3Options, { data: txObject.encodeABI(), to: token })];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, web3Options, options)];
                }
            });
        });
    };
    TronSDKClient.prototype.transferERC721Tokens = function (token, to, tokenId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, tronWebOptions, contractAddress, contract, onRootChain, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options && (!options.from || !tokenId || !token || !to)) {
                            throw new Error('options.from, to, token or tokenId is missing');
                        }
                        txObject = null;
                        if (!options.parent) return [3 /*break*/, 3];
                        tronWebOptions = this.getERC721TokenContract(token, options.parent);
                        contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false);
                        return [4 /*yield*/, tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)];
                    case 1:
                        contract = _a.sent();
                        return [4 /*yield*/, contract.methods.transferFrom(options.from, to, tokenId).call()
                            //Smart contract is missing address
                        ];
                    case 2:
                        txObject = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        txObject = this.getERC721TokenContract(token, options.parent)
                            .methods.transferFrom(options.from, to, tokenId)
                            .call();
                        _a.label = 4;
                    case 4:
                        onRootChain = options.parent ? true : false;
                        return [4 /*yield*/, this.web3Client.fillOptions(txObject, onRootChain, options)];
                    case 5:
                        web3Options = _a.sent();
                        if (web3Options.encodeAbi) {
                            return [2 /*return*/, Object.assign(web3Options, { data: txObject.encodeABI(), to: token })];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, web3Options, options)];
                }
            });
        });
    };
    TronSDKClient.prototype.transferMaticEth = function (to, amount, options) {
        return __awaiter(this, void 0, void 0, function () {
            var token, txObject, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options && (!options.from || !amount || !to)) {
                            throw new Error('options.from, to or amount is missing');
                        }
                        token = TronContractsBase_1.default.MATIC_CHILD_TOKEN;
                        txObject = this.getChildMaticContract().methods.transfer(to, this.encode(amount));
                        options.value = this.encode(amount);
                        return [4 /*yield*/, this.web3Client.fillOptions(txObject, false /* onRootChain */, options)];
                    case 1:
                        web3Options = _a.sent();
                        if (web3Options.encodeAbi) {
                            return [2 /*return*/, Object.assign(web3Options, { data: txObject.encodeABI(), to: token })];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, web3Options, options)];
                }
            });
        });
    };
    return TronSDKClient;
}(TronContractsBase_1.default));
exports.default = TronSDKClient;
