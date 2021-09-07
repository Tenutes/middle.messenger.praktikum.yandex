"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const change_password_hbs_1 = __importDefault(require("./change-password.hbs"));
const main_hbs_1 = __importDefault(require("./main.hbs"));
const state_1 = __importDefault(require("./state"));
const update_hbs_1 = __importDefault(require("./update.hbs"));
const module = () => Promise.resolve().then(() => __importStar(require('./module')));
exports.default = {
    routes: [
        {
            path: '/settings',
            template: main_hbs_1.default,
            state: state_1.default,
            module,
        },
        {
            path: '/settings/update',
            template: update_hbs_1.default,
            state: state_1.default,
            module,
        },
        {
            path: '/settings/change-password',
            template: change_password_hbs_1.default,
            state: state_1.default,
            module,
        },
    ],
};
