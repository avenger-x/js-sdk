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
exports.Utils = void 0;
var eth_sig_util_1 = require("eth-sig-util");
var ethereumjs_util_1 = __importDefault(require("ethereumjs-util"));
var tronweb_1 = __importDefault(require("tronweb"));
//import console from 'console'
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.getOrderHash = function (order) {
        var orderData = Buffer.concat([
            ethereumjs_util_1.default.toBuffer(order.id),
            ethereumjs_util_1.default.toBuffer(order.token),
            ethereumjs_util_1.default.setLengthLeft(order.amount, 32),
        ]);
        return ethereumjs_util_1.default.keccak256(orderData);
    };
    Utils.prototype.getTypedData = function (_a) {
        var token = _a.token, spender = _a.spender, tokenIdOrAmount = _a.tokenIdOrAmount, data = _a.data, expiration = _a.expiration, chainId = _a.chainId;
        return {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'contract', type: 'address' },
                ],
                TokenTransferOrder: [
                    { name: 'spender', type: 'address' },
                    { name: 'tokenIdOrAmount', type: 'uint256' },
                    { name: 'data', type: 'bytes32' },
                    { name: 'expiration', type: 'uint256' },
                ],
            },
            domain: {
                name: 'Matic Network',
                version: '1',
                chainId: chainId,
                contract: token,
            },
            primaryType: 'TokenTransferOrder',
            message: {
                spender: spender,
                tokenIdOrAmount: tokenIdOrAmount,
                data: data,
                expiration: expiration,
            },
        };
    };
    Utils.prototype.signEIP712TypedData = function (data, privateKey) {
        return eth_sig_util_1.signTypedData(ethereumjs_util_1.default.toBuffer(privateKey), {
            data: data,
        });
    };
    Utils.prototype.createTronWeb = function (tronWebOptions) {
        if (tronWebOptions.tronWeb && typeof tronWebOptions.tronWeb === 'object') {
            return tronWebOptions.tronWeb;
        }
        //const HttpProvider = TronWeb.providers.HttpProvider;
        //const tronWebOptions = Config.tronWebOptions;
        /*const fullNode = 'https://api.nileex.io'
        const solidityNode = 'https://api.nileex.io'
        const eventServer = 'https://event.nileex.io'*/
        var tronWeb = new tronweb_1.default(tronWebOptions.fullNode, tronWebOptions.solidityNode, tronWebOptions.eventServer, tronWebOptions.privateKey);
        //address && tronWeb.setAddress(address);
        tronWeb.setAddress(tronWebOptions.address);
        return tronWeb;
    };
    Utils.prototype.getTronContract = function (tronWeb, abi, token) {
        return __awaiter(this, void 0, void 0, function () {
            var contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tronWeb.contract(abi, token)];
                    case 1:
                        contract = _a.sent();
                        return [2 /*return*/, contract];
                }
            });
        });
    };
    Utils.prototype.transferAddress = function (tronWeb, address, toHex) {
        if (!tronWeb || !address) {
            throw new Error("address is not exist\uFF01");
        }
        if (!toHex) {
            return tronWeb.address.fromHex(address);
        }
        return tronWeb.address.toHex(address);
    };
    return Utils;
}());
exports.Utils = Utils;
