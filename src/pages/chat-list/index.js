"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const list_hbs_1 = __importDefault(require("./list.hbs"));
const state_1 = __importDefault(require("./state"));
exports.default = {
    routes: [
        {
            path: '/chat-list',
            template: list_hbs_1.default,
            state: state_1.default,
        },
    ],
};
