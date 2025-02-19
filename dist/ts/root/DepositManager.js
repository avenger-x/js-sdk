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
var ContractsBase_1 = __importDefault(require("../common/ContractsBase"));
var MapPromise_1 = require("../common/MapPromise");
var DepositManager = /** @class */ (function (_super) {
    __extends(DepositManager, _super);
    function DepositManager(options, web3Client, registry) {
        var _this = _super.call(this, web3Client, options.network) || this;
        _this.depositManagerContract = new _this.web3Client.parentWeb3.eth.Contract(options.network.abi('DepositManager'), options.depositManager);
        _this.registry = registry;
        return _this;
    }
    DepositManager.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var childChainAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registry.registry.methods.getChildChainAndStateSender().call()];
                    case 1:
                        childChainAddress = (_a.sent())[0];
                        this.childChainContract = new this.web3Client.web3.eth.Contract(this.network.abi('ChildChain'), childChainAddress);
                        return [2 /*return*/];
                }
            });
        });
    };
    DepositManager.prototype.depositStatusFromTxHash = function (txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var deposits, depositReceipt, depositEvents;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deposits = [];
                        return [4 /*yield*/, this.web3Client.parentWeb3.eth.getTransactionReceipt(txHash)];
                    case 1:
                        depositReceipt = _a.sent();
                        if (!depositReceipt) {
                            throw new Error('Transaction hash not found');
                        }
                        depositEvents = depositReceipt.logs.filter(function (l) { return l.topics[0].toLowerCase() === DepositManager.NEW_DEPOSIT_EVENT_SIG; });
                        if (!(depositEvents.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, MapPromise_1.mapPromise(depositEvents, function (event) { return __awaiter(_this, void 0, void 0, function () {
                                var data, depositId, _a, _b, _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            data = event.data;
                                            depositId = '0x' + data.substring(data.length - 64);
                                            _b = (_a = deposits).push;
                                            _c = {
                                                depositId: depositId
                                            };
                                            return [4 /*yield*/, this.isDepositProcessed(depositId)];
                                        case 1:
                                            _b.apply(_a, [(_c.isProcessed = _d.sent(),
                                                    _c)]);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, { receipt: depositReceipt, deposits: deposits }];
                }
            });
        });
    };
    DepositManager.prototype.isDepositProcessed = function (depositId) {
        return this.childChainContract.methods.deposits(depositId).call();
    };
    DepositManager.prototype.approveERC20 = function (token, amount, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txObject = this.getERC20TokenContract(token, true).methods.approve(this.depositManagerContract.options.address, this.encode(amount));
                        return [4 /*yield*/, this.web3Client.fillOptions(txObject, true /* onRootChain */, options)];
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
    DepositManager.prototype.approveMaxERC20 = function (token, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txObject = this.getERC20TokenContract(token, true).methods.approve(this.depositManagerContract.options.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
                        return [4 /*yield*/, this.web3Client.fillOptions(txObject, true /* onRootChain */, options)];
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
    DepositManager.prototype.allowanceOfERC20 = function (userAddress, token, options) {
        return __awaiter(this, void 0, void 0, function () {
            var allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (options && (!token || !userAddress)) {
                            throw new Error('token address or user address is missing');
                        }
                        return [4 /*yield*/, this.getERC20TokenContract(token, true)
                                .methods.allowance(userAddress, this.depositManagerContract.options.address)
                                .call()];
                    case 1:
                        allowance = _a.sent();
                        return [2 /*return*/, allowance];
                }
            });
        });
    };
    DepositManager.prototype.depositERC20 = function (token, amount, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txObject = this.depositManagerContract.methods.depositERC20(token, this.encode(amount));
                        return [4 /*yield*/, this.web3Client.fillOptions(txObject, true /* onRootChain */, options)];
                    case 1:
                        web3Options = _a.sent();
                        if (web3Options.encodeAbi) {
                            return [2 /*return*/, Object.assign(web3Options, { data: txObject.encodeABI(), to: this.depositManagerContract.options.address })];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, web3Options, options)];
                }
            });
        });
    };
    DepositManager.prototype.depositERC721 = function (token, tokenId, options) {
        return this.web3Client.send(this.depositManagerContract.methods.depositERC721(token, tokenId), options);
    };
    DepositManager.prototype.depositBulk = function (tokens, amountOrTokenIds, user, options) {
        return this.web3Client.send(this.depositManagerContract.methods.depositBulk(tokens, amountOrTokenIds, user), options);
    };
    DepositManager.prototype.depositERC20ForUser = function (token, amount, user, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txObject = this.depositManagerContract.methods.depositERC20ForUser(token, user, this.encode(amount));
                        return [4 /*yield*/, this.web3Client.fillOptions(txObject, true /* onRootChain */, options)];
                    case 1:
                        web3Options = _a.sent();
                        if (web3Options.encodeAbi) {
                            return [2 /*return*/, Object.assign(web3Options, { data: txObject.encodeABI(), to: this.depositManagerContract.options.address })];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, web3Options, options)];
                }
            });
        });
    };
    DepositManager.prototype.depositERC721ForUser = function (token, tokenId, user, options) {
        return this.web3Client.send(this.depositManagerContract.methods.depositERC721ForUser(token, user, tokenId), options);
    };
    DepositManager.prototype.depositEther = function (amount, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var txObject, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txObject = this.depositManagerContract.methods.depositEther();
                        return [4 /*yield*/, this.web3Client.fillOptions(txObject, true /* onRootChain */, Object.assign(options, { value: this.encode(amount) }))];
                    case 1:
                        web3Options = _a.sent();
                        if (web3Options.encodeAbi) {
                            return [2 /*return*/, Object.assign(web3Options, { data: txObject.encodeABI(), to: this.depositManagerContract.options.address })];
                        }
                        return [2 /*return*/, this.web3Client.send(txObject, web3Options, options)];
                }
            });
        });
    };
    DepositManager.prototype.getAddress = function () {
        return this.depositManagerContract.options.address;
    };
    DepositManager.NEW_DEPOSIT_EVENT_SIG = '0x1dadc8d0683c6f9824e885935c1bec6f76816730dcec148dda8cf25a7b9f797b';
    return DepositManager;
}(ContractsBase_1.default));
exports.default = DepositManager;
