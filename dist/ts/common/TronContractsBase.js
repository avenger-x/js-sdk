"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bn_js_1 = __importDefault(require("bn.js"));
var Utils_1 = require("../common/Utils");
var ChildERC20 = require('./ChildERC20').ChildERC20;
var ChildERC721 = require('./ChildERC721').ChildERC721;
//import console from 'console'
var TronContractsBase = /** @class */ (function () {
    function TronContractsBase(web3Client, network) {
        this.web3Client = web3Client;
        this.network = network;
        this.utils = new Utils_1.Utils();
    }
    TronContractsBase.prototype.encode = function (number) {
        if (typeof number === 'number') {
            number = new bn_js_1.default(number);
        }
        else if (typeof number === 'string') {
            if (number.slice(0, 2) === '0x')
                return number;
            number = new bn_js_1.default(number);
        }
        if (bn_js_1.default.isBN(number)) {
            return '0x' + number.toString(16);
        }
    };
    TronContractsBase.prototype.getERC20TokenContract = function (token, parent) {
        if (parent === void 0) { parent = false; }
        var web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3;
        return parent
            ? { abi: this.network.abi('ChildERC20'), web3: web3 }
            : new web3.eth.Contract(this.network.abi('ChildERC20'), token);
    };
    TronContractsBase.prototype.getERC721TokenContract = function (token, parent) {
        if (parent === void 0) { parent = false; }
        var web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3;
        //return new web3.eth.Contract(this.network.abi('ChildERC721'), token)
        return parent
            ? { abi: this.network.abi('ChildERC721'), web3: web3 }
            : new web3.eth.Contract(this.network.abi('ChildERC721'), token);
    };
    TronContractsBase.prototype.getChildMaticContract = function () {
        return new this.web3Client.web3.eth.Contract(this.network.abi('MRC20'), TronContractsBase.MATIC_CHILD_TOKEN);
    };
    TronContractsBase.prototype.getPOSERC20TokenContract = function (token, parent) {
        if (parent === void 0) { parent = false; }
        var web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3;
        return parent
            ? { abi: ChildERC20 /*this.network.abi('ChildERC20', 'pos')*/, web3: web3 }
            : new web3.eth.Contract(ChildERC20 /*this.network.abi('ChildERC20', 'pos')*/, token);
    };
    TronContractsBase.prototype.getPOSERC721TokenContract = function (token, parent) {
        if (parent === void 0) { parent = false; }
        var web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3;
        //return new web3.eth.Contract(this.network.abi('ChildERC721', 'pos'), token)
        return parent
            ? { abi: ChildERC721 /*this.network.abi('ChildERC721', 'pos')*/, web3: web3 }
            : new web3.eth.Contract(ChildERC721 /*this.network.abi('ChildERC721', 'pos')*/, token);
    };
    TronContractsBase.prototype.getPOSERC1155TokenContract = function (token, parent) {
        if (parent === void 0) { parent = false; }
        var web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3;
        //return new web3.eth.Contract(this.network.abi('ChildERC1155', 'pos'), token)
        return parent
            ? { abi: this.network.abi('ChildERC1155', 'pos'), web3: web3 }
            : new web3.eth.Contract(this.network.abi('ChildERC1155', 'pos'), token);
    };
    TronContractsBase.MATIC_CHILD_TOKEN = '0x0000000000000000000000000000000000001010';
    return TronContractsBase;
}());
exports.default = TronContractsBase;
