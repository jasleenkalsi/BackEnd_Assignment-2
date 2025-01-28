"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
class EmployeeController {
    static createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, position, department, email, phone, branchId } = req.body;
            // Simulating DB insert operation (for now using in-memory data)
            const newEmployee = {
                id: Date.now().toString(),
                name,
                position,
                department,
                email,
                phone,
                branchId,
            };
            // In a real application, you would save it to a database here
            res.status(201).json(newEmployee);
        });
    }
}
exports.EmployeeController = EmployeeController;
