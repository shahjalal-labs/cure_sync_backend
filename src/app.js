"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//
var express_1 = require("express");
var cors_1 = require("cors");
var user_js_1 = require("./app/module/User/user.js");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use("/api/v1/user", user_js_1.UserRoutes);
exports.app.get("/", function (req, res) {
    res.send({
        message: "cure_sync server running...",
    });
});
