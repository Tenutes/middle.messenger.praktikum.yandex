"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Registry = {
    instances: {},
    get(slug, selector) {
        return Registry.instances[selector] ? Registry.instances[selector][slug] : null;
    },
    set(slug, selector, instance) {
        Registry.instances[selector] = Registry.instances[selector] || {};
        Registry.instances[selector][slug] = instance;
        return Registry;
    },
    forget(slug, selector) {
        if (typeof Registry.instances[selector] !== 'undefined') {
            delete Registry.instances[selector][slug];
        }
        return Registry;
    },
};
exports.default = Registry;
