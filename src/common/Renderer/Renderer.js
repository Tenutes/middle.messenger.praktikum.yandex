"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const Router_1 = require("../Router/Router");
const compile_1 = __importDefault(require("./compile"));
exports.Renderer = {
    _currentTemplate: null,
    _ctx: null,
    _module: null,
    _id: null,
    _el: null,
    get template() {
        return this._currentTemplate;
    },
    get ctx() {
        return this._ctx;
    },
    renderTo(id) {
        this._setEl(id);
        this._setTemplate();
        this._insertTemplate();
    },
    _setEl(id) {
        this._id = id;
        this._el = document.getElementById(id);
    },
    _setTemplate() {
        const { template, state, module } = Router_1.Router.currentPage;
        this._currentTemplate = template;
        this._ctx = state;
        this._module = module;
    },
    _insertTemplate() {
        if (this._el && this._currentTemplate) {
            this._el.innerHTML = (0, compile_1.default)(this._currentTemplate, this._ctx);
            if (this._module && typeof this._module === 'function') {
                this._module().then(({ default: fn }) => {
                    typeof fn === 'function' && fn();
                });
            }
        }
        else {
            throw new Error(`There is no element with given id: ${this._id}`);
        }
    },
};
