"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
//
var express_1 = require("express");
var user_controller_ts_1 = require("./user.controller.ts");
var router = express_1.default.Router();
router.get("/", user_controller_ts_1.UserController.createAdmin);
exports.UserRoutes = router;
