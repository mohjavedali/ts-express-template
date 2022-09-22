"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.json({
        message: "Hiiiiii",
        new: "This is new message."
    });
});
app.use(() => {
    throw (0, http_errors_1.default)(404, "Route not found.");
});
const errorHandler = (err, req, res, next) => {
    console.log(err.message, err.statusCode);
    if (err.headersSent) {
        return next(err);
    }
    res.status(err.statusCode || 500)
        .json({ message: err.message || "An Unknown Error." });
};
app.use(errorHandler);
app.listen(9000, () => {
    console.log("Server Started on Port 9000");
});
