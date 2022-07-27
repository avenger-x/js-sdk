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
exports.TronWebClient = exports.BttcPOSClient = void 0;
var SDKClient_1 = __importDefault(require("./common/SDKClient"));
var TronSDKClient_1 = __importDefault(require("./common/TronSDKClient"));
var Utils_1 = require("./common/Utils");
var DepositManager_1 = __importDefault(require("./root/DepositManager"));
var POSRootChainManager_1 = __importDefault(require("./root/POSRootChainManager"));
var TronPOSRootChainManager_1 = __importDefault(require("./root/TronPOSRootChainManager"));
var Registry_1 = __importDefault(require("./root/Registry"));
var RootChain_1 = __importDefault(require("./root/RootChain"));
var TronRootChain_1 = __importDefault(require("./root/TronRootChain"));
var WithdrawManager_1 = __importDefault(require("./root/WithdrawManager"));
var MapPromise_1 = require("./common/MapPromise");
//import console from 'console'
var BttcPOSClient = /** @class */ (function (_super) {
    __extends(BttcPOSClient, _super);
    function BttcPOSClient(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        options.network = SDKClient_1.default.initializeNetwork(options.network, options.version);
        if (!options.rootChain) {
            options.rootChain = options.network.Main.Contracts.RootChainProxy;
        }
        _this = _super.call(this, options) || this;
        _this.rootChain = new RootChain_1.default(options, _this.web3Client);
        _this.posRootChainManager = new POSRootChainManager_1.default(options, _this.rootChain, _this.web3Client);
        return _this;
    }
    BttcPOSClient.prototype.approveERC20ForDeposit = function (rootToken, amount, options) {
        if (options && (!options.from || !amount || !rootToken)) {
            throw new Error('options.from, rootToken or amount is missing');
        }
        return this.posRootChainManager.approveERC20(rootToken, amount, options);
    };
    BttcPOSClient.prototype.approveMaxERC20ForDeposit = function (rootToken, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from, rootToken is missing');
        }
        return this.posRootChainManager.approveMaxERC20(rootToken, options);
    };
    BttcPOSClient.prototype.getERC20Allowance = function (userAddress, token, options) {
        if (options && (!token || !userAddress)) {
            throw new Error('user address, token is missing');
        }
        return this.posRootChainManager.allowanceOfERC20(userAddress, token, options);
    };
    BttcPOSClient.prototype.depositERC20ForUser = function (rootToken, user, amount, options) {
        if (options && (!options.from || !amount || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, or amount is missing');
        }
        return this.posRootChainManager.depositERC20ForUser(rootToken, amount, user, options);
    };
    BttcPOSClient.prototype.depositEtherForUser = function (user, amount, options) {
        if (options && (!options.from || !amount || !user)) {
            throw new Error('options.from, user or amount is missing');
        }
        return this.posRootChainManager.depositEtherForUser(amount, user, options);
    };
    BttcPOSClient.prototype.burnERC20 = function (option, options) {
        if (!this.web3Client.web3.utils.isAddress(option.childToken)) {
            throw new Error(option.childToken + " is not a valid token address");
        }
        if (!option.amount) {
            // ${amount} will stringify it while printing which might be a problem
            throw new Error(option.amount + " is not a amount");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnERC20(option, options);
    };
    BttcPOSClient.prototype.exitERC20 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("from missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitERC20(txHash, options);
        }
        else {
            return this.posRootChainManager.exitERC20Hermoine(txHash, options);
        }
    };
    BttcPOSClient.prototype.isERC20ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isERC20ExitProcessed(txHash);
    };
    BttcPOSClient.prototype.approveERC721ForDeposit = function (rootToken, tokenId, options) {
        if (options && (!options.from || !tokenId || !rootToken)) {
            throw new Error('options.from, rootToken or tokenId is missing');
        }
        return this.posRootChainManager.approveERC721(rootToken, tokenId, options);
    };
    BttcPOSClient.prototype.isApprovedERC721ForDeposit = function (rootToken, tokenId, options) {
        if (options && (!options.from || !tokenId || !rootToken)) {
            throw new Error('options.from, rootToken or tokenId is missing');
        }
        return this.posRootChainManager.isApprovedERC721(rootToken, tokenId, options);
    };
    BttcPOSClient.prototype.approveAllERC721ForDeposit = function (rootToken, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from, rootToken is missing');
        }
        return this.posRootChainManager.approveAllERC721(rootToken, options);
    };
    BttcPOSClient.prototype.isApprovedAllERC721ForDeposit = function (rootToken, userAddress, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from, rootToken is missing');
        }
        return this.posRootChainManager.isApprovedForAllERC721(rootToken, userAddress, options);
    };
    BttcPOSClient.prototype.depositERC721ForUser = function (rootToken, user, tokenId, options) {
        if (options && (!options.from || !tokenId || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, or tokenId is missing');
        }
        return this.posRootChainManager.depositERC721ForUser(rootToken, tokenId, user, options);
    };
    BttcPOSClient.prototype.depositBatchERC721ForUser = function (rootToken, user, tokenIds, options) {
        if (options && (!options.from || !tokenIds || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, or tokenIds is missing');
        }
        if (tokenIds.length > 20) {
            throw new Error('Number of tokens being deposited can not exceed the limit of 20');
        }
        return this.posRootChainManager.depositBatchERC721ForUser(rootToken, tokenIds, user, options);
    };
    BttcPOSClient.prototype.burnERC721 = function (opt, options) {
        if (!this.web3Client.web3.utils.isAddress(opt.childToken)) {
            throw new Error(opt.childToken + " is not a valid token address");
        }
        if (!opt.tokenId) {
            // ${tokenId} will stringify it while printing which might be a problem
            throw new Error(opt.tokenId + " is not a tokenId");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnERC721(opt, options);
    };
    BttcPOSClient.prototype.burnBatchERC721 = function (childToken, tokenIds, options) {
        if (!this.web3Client.web3.utils.isAddress(childToken)) {
            throw new Error(childToken + " is not a valid token address");
        }
        if (!tokenIds) {
            // ${tokenId} will stringify it while printing which might be a problem
            throw new Error("tokenIds is missing");
        }
        if (tokenIds.length > 20) {
            throw new Error('Number of tokens being withdrawn can not exceed the limit of 20');
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnBatchERC721(childToken, tokenIds, options);
    };
    BttcPOSClient.prototype.exitERC721 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitERC721(txHash, options);
        }
        else {
            return this.posRootChainManager.exitERC721Hermoine(txHash, options);
        }
    };
    BttcPOSClient.prototype.exitBatchERC721 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitBatchERC721(txHash, options);
        }
        else {
            return this.posRootChainManager.exitBatchERC721Hermoine(txHash, options);
        }
    };
    BttcPOSClient.prototype.exitERC721WithMetadata = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitERC721WithMetadata(txHash, options);
        }
        else {
            return this.posRootChainManager.exitERC721WithMetadataHermoine(txHash, options);
        }
    };
    BttcPOSClient.prototype.isERC721ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isERC721ExitProcessed(txHash);
    };
    BttcPOSClient.prototype.isBatchERC721ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isBatchERC721ExitProcessed(txHash);
    };
    BttcPOSClient.prototype.approveERC1155ForDeposit = function (rootToken, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from or rootToken is missing');
        }
        return this.posRootChainManager.approveERC1155(rootToken, options);
    };
    BttcPOSClient.prototype.approveMintableERC1155ForDeposit = function (rootToken, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from or rootToken is missing');
        }
        return this.posRootChainManager.approveMintableERC1155(rootToken, options);
    };
    BttcPOSClient.prototype.depositSingleERC1155ForUser = function (rootToken, user, tokenId, amount, data, options) {
        if (options && (!options.from || !tokenId || !amount || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, tokenId or amount is missing');
        }
        return this.posRootChainManager.depositSingleERC1155ForUser(rootToken, tokenId, amount, user, data, options);
    };
    BttcPOSClient.prototype.depositBatchERC1155ForUser = function (rootToken, user, tokenIds, amounts, data, options) {
        if (options && (!options.from || !tokenIds || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, tokenIds or amounts is missing');
        }
        return this.posRootChainManager.depositBatchERC1155ForUser(rootToken, tokenIds, amounts, user, data, options);
    };
    BttcPOSClient.prototype.burnSingleERC1155 = function (childToken, tokenId, amount, options) {
        if (!this.web3Client.web3.utils.isAddress(childToken)) {
            throw new Error(childToken + " is not a valid token address");
        }
        if (!tokenId || !amount) {
            throw new Error("tokenId or amount is missing");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnSingleERC1155(childToken, tokenId, amount, options);
    };
    BttcPOSClient.prototype.burnBatchERC1155 = function (childToken, tokenIds, amounts, options) {
        if (!this.web3Client.web3.utils.isAddress(childToken)) {
            throw new Error(childToken + " is not a valid token address");
        }
        if (!tokenIds || !amounts) {
            throw new Error("tokenIds or amounts missing");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnBatchERC1155(childToken, tokenIds, amounts, options);
    };
    BttcPOSClient.prototype.exitSingleERC1155 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitSingleERC1155(txHash, options);
        }
        else {
            return this.posRootChainManager.exitSingleERC1155Hermoine(txHash, options);
        }
    };
    BttcPOSClient.prototype.isSingleERC1155ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isSingleERC1155ExitProcessed(txHash);
    };
    BttcPOSClient.prototype.exitBatchERC1155 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitBatchERC1155(txHash, options);
        }
        else {
            return this.posRootChainManager.exitBatchERC1155Hermoine(txHash, options);
        }
    };
    BttcPOSClient.prototype.isBatchERC1155ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isBatchERC1155ExitProcessed(txHash);
    };
    return BttcPOSClient;
}(SDKClient_1.default));
exports.BttcPOSClient = BttcPOSClient;
var TronWebClient = /** @class */ (function (_super) {
    __extends(TronWebClient, _super);
    function TronWebClient(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        options.network = TronSDKClient_1.default.initializeNetwork(options.network, options.version);
        if (!options.rootChain) {
            options.rootChain = options.network.Main.Contracts.RootChainProxy;
        }
        _this = _super.call(this, options) || this;
        _this.tronWebClientOptions = options;
        _this.rootChain = new TronRootChain_1.default(options, _this.web3Client);
        _this.posRootChainManager = new TronPOSRootChainManager_1.default(options, _this.rootChain, _this.web3Client);
        return _this;
    }
    TronWebClient.prototype.approveERC20ForDeposit = function (rootToken, amount, options) {
        if (options && (!options.from || !amount || !rootToken)) {
            throw new Error('options.from, rootToken or amount is missing');
        }
        return this.posRootChainManager.approveERC20(rootToken, amount, options);
    };
    TronWebClient.prototype.approveMaxERC20ForDeposit = function (rootToken, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from, rootToken is missing');
        }
        return this.posRootChainManager.approveMaxERC20(rootToken, options);
    };
    TronWebClient.prototype.getERC20Allowance = function (userAddress, token, options) {
        if (options && (!token || !userAddress)) {
            throw new Error('user address, token is missing');
        }
        return this.posRootChainManager.allowanceOfERC20(userAddress, token, options);
    };
    TronWebClient.prototype.depositERC20ForUser = function (rootToken, user, amount, options) {
        if (options && (!options.from || !amount || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, or amount is missing');
        }
        return this.posRootChainManager.depositERC20ForUser(rootToken, amount, user, options);
    };
    TronWebClient.prototype.depositEtherForUser = function (user, amount, options) {
        if (options && (!options.from || !amount || !user)) {
            throw new Error('options.from, user or amount is missing');
        }
        return this.posRootChainManager.depositEtherForUser(amount, user, options);
    };
    TronWebClient.prototype.burnERC20 = function (option, options) {
        if (!this.web3Client.web3.utils.isAddress(option.childToken)) {
            throw new Error(option.childToken + " is not a valid token address");
        }
        if (!option.amount) {
            // ${amount} will stringify it while printing which might be a problem
            throw new Error(option.amount + " is not a amount");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnERC20(option, options);
    };
    TronWebClient.prototype.exitERC20 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("from missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitTronERC20(txHash, options);
        }
        else {
            return this.posRootChainManager.exitERC20Hermoine(txHash, options);
        }
    };
    TronWebClient.prototype.isERC20ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isERC20ExitProcessed(txHash);
    };
    TronWebClient.prototype.approveERC721ForDeposit = function (rootToken, tokenId, options) {
        if (options && (!options.from || !tokenId || !rootToken)) {
            throw new Error('options.from, rootToken or tokenId is missing');
        }
        return this.posRootChainManager.approveERC721(rootToken, tokenId, options);
    };
    TronWebClient.prototype.isApprovedERC721ForDeposit = function (rootToken, tokenId, options) {
        if (options && (!options.from || !tokenId || !rootToken)) {
            throw new Error('options.from, rootToken or tokenId is missing');
        }
        return this.posRootChainManager.isApprovedERC721(rootToken, tokenId, options);
    };
    TronWebClient.prototype.approveAllERC721ForDeposit = function (rootToken, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from, rootToken is missing');
        }
        return this.posRootChainManager.approveAllERC721(rootToken, options);
    };
    TronWebClient.prototype.isApprovedAllERC721ForDeposit = function (rootToken, userAddress, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from, rootToken is missing');
        }
        return this.posRootChainManager.isApprovedForAllERC721(rootToken, userAddress, options);
    };
    TronWebClient.prototype.depositERC721ForUser = function (rootToken, user, tokenId, options) {
        if (options && (!options.from || !tokenId || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, or tokenId is missing');
        }
        return this.posRootChainManager.depositERC721ForUser(rootToken, tokenId, user, options);
    };
    TronWebClient.prototype.depositBatchERC721ForUser = function (rootToken, user, tokenIds, options) {
        if (options && (!options.from || !tokenIds || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, or tokenIds is missing');
        }
        if (tokenIds.length > 20) {
            throw new Error('Number of tokens being deposited can not exceed the limit of 20');
        }
        return this.posRootChainManager.depositBatchERC721ForUser(rootToken, tokenIds, user, options);
    };
    TronWebClient.prototype.burnERC721 = function (opt, options) {
        if (!this.web3Client.web3.utils.isAddress(opt.childToken)) {
            throw new Error(opt.childToken + " is not a valid token address");
        }
        if (!opt.tokenId) {
            // ${tokenId} will stringify it while printing which might be a problem
            throw new Error(opt.tokenId + " is not a tokenId");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnERC721(opt, options);
    };
    TronWebClient.prototype.burnBatchERC721 = function (childToken, tokenIds, options) {
        if (!this.web3Client.web3.utils.isAddress(childToken)) {
            throw new Error(childToken + " is not a valid token address");
        }
        if (!tokenIds) {
            // ${tokenId} will stringify it while printing which might be a problem
            throw new Error("tokenIds is missing");
        }
        if (tokenIds.length > 20) {
            throw new Error('Number of tokens being withdrawn can not exceed the limit of 20');
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnBatchERC721(childToken, tokenIds, options);
    };
    TronWebClient.prototype.exitERC721 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitERC721(txHash, options);
        }
        else {
            return this.posRootChainManager.exitERC721Hermoine(txHash, options);
        }
    };
    TronWebClient.prototype.exitBatchERC721 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitBatchERC721(txHash, options);
        }
        else {
            return this.posRootChainManager.exitBatchERC721Hermoine(txHash, options);
        }
    };
    TronWebClient.prototype.exitERC721WithMetadata = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitERC721WithMetadata(txHash, options);
        }
        else {
            return this.posRootChainManager.exitERC721WithMetadataHermoine(txHash, options);
        }
    };
    TronWebClient.prototype.isERC721ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isERC721ExitProcessed(txHash);
    };
    TronWebClient.prototype.isBatchERC721ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isBatchERC721ExitProcessed(txHash);
    };
    TronWebClient.prototype.approveERC1155ForDeposit = function (rootToken, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from or rootToken is missing');
        }
        return this.posRootChainManager.approveERC1155(rootToken, options);
    };
    TronWebClient.prototype.approveMintableERC1155ForDeposit = function (rootToken, options) {
        if (options && (!options.from || !rootToken)) {
            throw new Error('options.from or rootToken is missing');
        }
        return this.posRootChainManager.approveMintableERC1155(rootToken, options);
    };
    TronWebClient.prototype.depositSingleERC1155ForUser = function (rootToken, user, tokenId, amount, data, options) {
        if (options && (!options.from || !tokenId || !amount || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, tokenId or amount is missing');
        }
        return this.posRootChainManager.depositSingleERC1155ForUser(rootToken, tokenId, amount, user, data, options);
    };
    TronWebClient.prototype.depositBatchERC1155ForUser = function (rootToken, user, tokenIds, amounts, data, options) {
        if (options && (!options.from || !tokenIds || !rootToken || !user)) {
            throw new Error('options.from, rootToken, user, tokenIds or amounts is missing');
        }
        return this.posRootChainManager.depositBatchERC1155ForUser(rootToken, tokenIds, amounts, user, data, options);
    };
    TronWebClient.prototype.burnSingleERC1155 = function (childToken, tokenId, amount, options) {
        if (!this.web3Client.web3.utils.isAddress(childToken)) {
            throw new Error(childToken + " is not a valid token address");
        }
        if (!tokenId || !amount) {
            throw new Error("tokenId or amount is missing");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnSingleERC1155(childToken, tokenId, amount, options);
    };
    TronWebClient.prototype.burnBatchERC1155 = function (childToken, tokenIds, amounts, options) {
        if (!this.web3Client.web3.utils.isAddress(childToken)) {
            throw new Error(childToken + " is not a valid token address");
        }
        if (!tokenIds || !amounts) {
            throw new Error("tokenIds or amounts missing");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        return this.posRootChainManager.burnBatchERC1155(childToken, tokenIds, amounts, options);
    };
    TronWebClient.prototype.exitSingleERC1155 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitSingleERC1155(txHash, options);
        }
        else {
            return this.posRootChainManager.exitSingleERC1155Hermoine(txHash, options);
        }
    };
    TronWebClient.prototype.isSingleERC1155ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isSingleERC1155ExitProcessed(txHash);
    };
    TronWebClient.prototype.exitBatchERC1155 = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.posRootChainManager.exitBatchERC1155(txHash, options);
        }
        else {
            return this.posRootChainManager.exitBatchERC1155Hermoine(txHash, options);
        }
    };
    TronWebClient.prototype.isBatchERC1155ExitProcessed = function (txHash) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        return this.posRootChainManager.isBatchERC1155ExitProcessed(txHash);
    };
    return TronWebClient;
}(TronSDKClient_1.default));
exports.TronWebClient = TronWebClient;
var Bttc = /** @class */ (function (_super) {
    __extends(Bttc, _super);
    function Bttc(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var network = SDKClient_1.default.initializeNetwork(options.network, options.version);
        // override contract addresses if they were provided during initialization
        options = Object.assign({
            registry: network.Main.Contracts.Registry,
            rootChain: network.Main.Contracts.RootChainProxy,
            depositManager: network.Main.Contracts.DepositManagerProxy,
            withdrawManager: network.Main.Contracts.WithdrawManagerProxy,
        }, options);
        options.network = network;
        _this = _super.call(this, options) || this;
        _this.registry = new Registry_1.default(options, _this.web3Client);
        _this.rootChain = new RootChain_1.default(options, _this.web3Client);
        _this.depositManager = new DepositManager_1.default(options, _this.web3Client, _this.registry);
        _this.withdrawManager = new WithdrawManager_1.default(options, _this.rootChain, _this.web3Client, _this.registry);
        _this.utils = new Utils_1.Utils();
        return _this;
    }
    Bttc.prototype.initialize = function () {
        return Promise.all([this.withdrawManager.initialize(), this.depositManager.initialize()]);
    };
    Bttc.prototype.transferEther = function (to, amount, options) {
        return __awaiter(this, void 0, void 0, function () {
            var from, value, maticWeth, web3Object, _a, _options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (options && (!options.from || !amount || !to)) {
                            throw new Error('Missing Parameters');
                        }
                        from = options.from;
                        value = this.encode(amount);
                        if (!!options.parent) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.registry.registry.methods.getWethTokenAddress().call()];
                    case 1:
                        maticWeth = _b.sent();
                        return [2 /*return*/, this.transferERC20Tokens(maticWeth, to, value, options)];
                    case 2:
                        web3Object = this.web3Client.getParentWeb3();
                        if (!!options.gas) return [3 /*break*/, 4];
                        _a = options;
                        return [4 /*yield*/, web3Object.eth.estimateGas({
                                from: from,
                                value: value,
                            })];
                    case 3:
                        _a.gas = _b.sent();
                        _b.label = 4;
                    case 4:
                        Object.assign(options, { value: value, to: to });
                        return [4 /*yield*/, this.web3Client.fillOptions(options /* txObject */, true /* onRootChain */, options)];
                    case 5:
                        _options = _b.sent();
                        return [2 /*return*/, _options.encodeAbi
                                ? _options
                                : this.web3Client.wrapWeb3Promise(web3Object.eth.sendTransaction(_options), options)];
                }
            });
        });
    };
    Bttc.prototype.depositEther = function (amount, options) {
        if (options && (!options.from || !amount)) {
            throw new Error('options.from or amount is missing');
        }
        return this.depositManager.depositEther(amount, options);
    };
    Bttc.prototype.depositStatusFromTxHash = function (txHash) {
        if (!txHash) {
            throw new Error('txHash is missing');
        }
        return this.depositManager.depositStatusFromTxHash(txHash);
    };
    Bttc.prototype.approveERC20TokensForDeposit = function (token, amount, options) {
        if (options && (!options.from || !amount || !token)) {
            throw new Error('options.from, token or amount is missing');
        }
        return this.depositManager.approveERC20(token, amount, options);
    };
    Bttc.prototype.approveMaxERC20TokensForDeposit = function (token, options) {
        if (options && (!options.from || !token)) {
            throw new Error('options.from, token is missing');
        }
        return this.depositManager.approveMaxERC20(token, options);
    };
    Bttc.prototype.getERC20Allowance = function (userAddress, token, options) {
        if (options && (!token || !userAddress)) {
            throw new Error('user address, token is missing');
        }
        return this.depositManager.allowanceOfERC20(userAddress, token, options);
    };
    Bttc.prototype.getTransferSignature = function (sellOrder, buyOrder, options) {
        return __awaiter(this, void 0, void 0, function () {
            var orderObj, orderHash, chainId, dataToSign, typedData, wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!sellOrder.orderId || !sellOrder.spender) {
                            throw new Error('orderId or spender missing from sell order');
                        }
                        if (!options.from) {
                            throw new Error('options.from is missing');
                        }
                        orderObj = {
                            token: buyOrder.token,
                            amount: buyOrder.amount,
                            id: sellOrder.orderId,
                            expiration: sellOrder.expiry,
                        };
                        orderHash = this.utils.getOrderHash(orderObj);
                        return [4 /*yield*/, this.web3Client.web3.eth.net.getId()];
                    case 1:
                        chainId = _a.sent();
                        dataToSign = {
                            token: sellOrder.token,
                            tokenIdOrAmount: sellOrder.amount,
                            spender: sellOrder.spender,
                            data: orderHash,
                            expiration: sellOrder.expiry,
                            chainId: chainId,
                        };
                        typedData = this.utils.getTypedData(dataToSign);
                        wallet = this.web3Client.getWallet();
                        return [2 /*return*/, this.utils.signEIP712TypedData(typedData, wallet[options.from].privateKey)];
                }
            });
        });
    };
    Bttc.prototype.transferWithSignature = function (sig, sellOrder, buyOrder, to, options) {
        return __awaiter(this, void 0, void 0, function () {
            var web3Util, data, txObj, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options.from) {
                            throw new Error('options.from is missing');
                        }
                        web3Util = this.web3Client.web3.utils;
                        data = web3Util.soliditySha3({
                            t: 'bytes32',
                            v: sellOrder.orderId,
                        }, {
                            t: 'address',
                            v: buyOrder.token,
                        }, {
                            t: 'uint256',
                            v: buyOrder.amount,
                        });
                        txObj = this.getERC721TokenContract(sellOrder.token).methods.transferWithSig(sig, sellOrder.amount, data, sellOrder.expiry, to);
                        return [4 /*yield*/, this.web3Client.fillOptions(txObj, false /* onRootChain */, options)];
                    case 1:
                        web3Options = _a.sent();
                        return [2 /*return*/, this.web3Client.send(txObj, web3Options, options)];
                }
            });
        });
    };
    Bttc.prototype.depositERC20ForUser = function (token, user, amount, options) {
        if (options && (!options.from || !amount || !token)) {
            throw new Error('options.from, token or amount is missing');
        }
        return this.depositManager.depositERC20ForUser(token, amount, user, options);
    };
    Bttc.prototype.safeDepositERC721Tokens = function (token, tokenId, options) {
        return __awaiter(this, void 0, void 0, function () {
            var txObject, web3Options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options || !options.from || !tokenId || !token) {
                            throw new Error('options.from, token or tokenId is missing');
                        }
                        txObject = this.getERC721TokenContract(token, true).methods.safeTransferFrom(options.from, this.depositManager.getAddress(), tokenId);
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
    Bttc.prototype.startWithdraw = function (token, amount, options) {
        this._validateInputs(token, amount, options);
        return this.withdrawManager.burnERC20Tokens(token, amount, options);
    };
    Bttc.prototype.startWithdrawForNFT = function (token, tokenId, options) {
        this._validateInputs(token, tokenId, options);
        return this.withdrawManager.burnERC721Token(token, tokenId, options);
    };
    Bttc.prototype.withdraw = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.withdrawManager.startExitWithBurntERC20Tokens(txHash, options);
        }
        else {
            return this.withdrawManager.startExitWithBurntERC20TokensHermoine(txHash, options);
        }
    };
    Bttc.prototype.withdrawNFT = function (txHash, options) {
        if (!txHash) {
            throw new Error("txHash not provided");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
        if (options && options.legacyProof) {
            return this.withdrawManager.startExitWithBurntERC721Tokens(txHash, options);
        }
        else {
            return this.withdrawManager.startExitWithBurntERC721TokensHermoine(txHash, options);
        }
    };
    Bttc.prototype.processExits = function (tokenAddress, options) {
        return this.withdrawManager.processExits(tokenAddress, options);
    };
    Bttc.prototype._validateInputs = function (token, amountOrTokenId, options) {
        if (!this.web3Client.web3.utils.isAddress(this.web3Client.web3.utils.toChecksumAddress(token))) {
            throw new Error(token + " is not a valid token address");
        }
        if (!amountOrTokenId) {
            // ${amountOrTokenId} will stringify it while printing which might be a problem
            throw new Error(amountOrTokenId + " is not a amountOrTokenId");
        }
        if (options && !options.from) {
            throw new Error("options.from is missing");
        }
    };
    Bttc.BttcPOSClient = BttcPOSClient; // workaround for web compatibility
    Bttc.TronWebClient = TronWebClient; // workaround for web compatibility
    Bttc.mapPromise = MapPromise_1.mapPromise; // workaround for web compatibility
    return Bttc;
}(SDKClient_1.default));
exports.default = Bttc;
