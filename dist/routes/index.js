"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkToken_1 = __importDefault(require("../middleware/checkToken"));
const LeadRoutes_1 = __importDefault(require("./LeadRoutes"));
const router = (0, express_1.Router)();
router.use(checkToken_1.default);
router.use('/leads', LeadRoutes_1.default);
exports.default = router;
