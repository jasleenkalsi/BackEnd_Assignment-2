"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/v1/routes/employee.routes.ts
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const router = express_1.default.Router();
router.post('/', employeeController_1.EmployeeController.createEmployee); // Create employee
// Other CRUD routes will be added here
exports.default = router;
