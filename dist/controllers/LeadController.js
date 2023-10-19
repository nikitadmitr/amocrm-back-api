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
const axiosInstance_1 = __importDefault(require("../utils/axiosInstance"));
const TokenManager_1 = __importDefault(require("../utils/TokenManager"));
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headers = {
            Authorization: `Bearer ${TokenManager_1.default.accessToken}`,
        };
        const response = yield axiosInstance_1.default.get(`api/v4/tasks`, {
            headers,
            params: {
                with: 'contacts',
            },
        });
        res.status(response.status).json(response.data);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = { getLeads };
