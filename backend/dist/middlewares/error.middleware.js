"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.name === "ZodError") {
        return res.status(400).json({ errors: err.errors });
    }
    res.status(500).json({
        message: err.message || "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
