"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_runtime_1 = __importDefault(require("handlebars/dist/handlebars.runtime"));
const back_hbs_1 = __importDefault(require("./components/back.hbs"));
const button_hbs_1 = __importDefault(require("./components/button.hbs"));
const search_hbs_1 = __importDefault(require("./components/chat/search.hbs"));
const input_hbs_1 = __importDefault(require("./components/input.hbs"));
const link_hbs_1 = __importDefault(require("./components/link.hbs"));
const login_hbs_1 = __importDefault(require("./modules/login.hbs"));
const settings_profile_hbs_1 = __importDefault(require("./modules/settings-profile.hbs"));
exports.default = () => {
    handlebars_runtime_1.default.registerPartial('login', login_hbs_1.default);
    handlebars_runtime_1.default.registerPartial('back', back_hbs_1.default);
    handlebars_runtime_1.default.registerPartial('link', link_hbs_1.default);
    handlebars_runtime_1.default.registerPartial('button', button_hbs_1.default);
    handlebars_runtime_1.default.registerPartial('input', input_hbs_1.default);
    handlebars_runtime_1.default.registerPartial('settings-profile', settings_profile_hbs_1.default);
    handlebars_runtime_1.default.registerPartial('search', search_hbs_1.default);
};
