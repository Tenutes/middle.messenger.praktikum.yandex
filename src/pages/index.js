"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_list_1 = __importDefault(require("./chat-list"));
const errors_1 = __importDefault(require("./errors"));
const login_1 = __importDefault(require("./login"));
const registration_1 = __importDefault(require("./registration"));
const settings_1 = __importDefault(require("./settings"));
exports.default = {
    routes: [...login_1.default.routes, ...registration_1.default.routes, ...errors_1.default.routes, ...chat_list_1.default.routes, ...settings_1.default.routes],
};
