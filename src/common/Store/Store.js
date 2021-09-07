"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const Router_1 = require("../Router/Router");
exports.Store = {
    _state: {},
    get state() {
        return this._state;
    },
    install() {
        var _a;
        const currentPageState = (_a = Router_1.Router.currentPage) === null || _a === void 0 ? void 0 : _a.state;
        if (currentPageState) {
            this._setState(currentPageState);
        }
    },
    _setState(state) {
        this._state = state;
    },
    _use(store) {
        this._state = Object.assign({}, store);
    },
};
