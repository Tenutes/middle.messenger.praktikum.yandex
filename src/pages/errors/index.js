"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _404_hbs_1 = __importDefault(require("./404.hbs"));
const _500_hbs_1 = __importDefault(require("./500.hbs"));
exports.default = {
    routes: [
        {
            /** Без '/' - для корректного определения в роутере */
            path: '404',
            template: _404_hbs_1.default,
        },
        {
            path: '/500',
            template: _500_hbs_1.default,
        },
    ],
};
