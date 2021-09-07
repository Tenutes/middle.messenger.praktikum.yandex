"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_runtime_1 = __importDefault(require("handlebars/dist/handlebars.runtime"));
exports.default = () => {
    handlebars_runtime_1.default.registerHelper('times', function (n, block) {
        let accum = '';
        for (let i = 0; i < n; ++i) {
            accum += block.fn(i);
        }
        return accum;
    });
};
