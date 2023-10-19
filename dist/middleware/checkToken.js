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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenManager_1 = __importDefault(require("../utils/TokenManager"));
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!TokenManager_1.default.accessToken) {
        yield TokenManager_1.default.initTokens();
    }
    else {
        if (TokenManager_1.default.isTokenExpired(TokenManager_1.default.accessToken)) {
            yield TokenManager_1.default.refreshTokens();
        }
    }
    next();
});
exports.default = checkToken;
