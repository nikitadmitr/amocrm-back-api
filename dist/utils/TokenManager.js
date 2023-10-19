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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axiosInstance_1 = __importDefault(require("./axiosInstance"));
class TokenManager {
    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
    }
    isTokenExpired(token) {
        const tokenData = jsonwebtoken_1.default.decode(token, {
            complete: true,
        });
        if (tokenData === null || tokenData === void 0 ? void 0 : tokenData.exp) {
            const exp = new Date(tokenData.exp * 1000);
            const now = new Date();
            return now >= exp;
        }
        return true;
    }
    exchangeTokens(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign({ client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET, redirect_uri: process.env.REDIRECT_URI }, params);
            try {
                const response = yield axiosInstance_1.default.post(`oauth2/access_token`, data);
                this.accessToken = response.data.access_token;
                this.refreshToken = response.data.refresh_token;
            }
            catch (error) {
                console.log('Error:', error);
            }
        });
    }
    refreshTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                grant_type: 'refresh_token',
                refresh_token: this.refreshToken,
            };
            yield this.exchangeTokens(params);
        });
    }
    initTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                grant_type: 'authorization_code',
                code: process.env.SECRET_CODE,
            };
            yield this.exchangeTokens(params);
        });
    }
}
const tokenManager = new TokenManager();
exports.default = tokenManager;
