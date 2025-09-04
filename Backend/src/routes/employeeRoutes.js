const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const { protect } = require('../middleware/authMiddleware'); // JWT auth
const validate = require('../middleware/validate'); // validation

// Create Employee
router.post(
  '/',
  protect,
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('mobile').notEmpty().withMessage('Mobile is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
  ]),
  createEmployee
);

// Get all employees
router.get('/', protect, getEmployees);

// Update Employee
router.put(
  '/:id',
  protect,
  validate([
    body('name').optional().notEmpty(),
    body('mobile').optional().notEmpty(),
    body('email').optional().isEmail(),
    body('position').optional().notEmpty(),
    body('salary').optional().isNumeric(),
  ]),
  updateEmployee
);

// Delete Employee
router.delete('/:id', protect, deleteEmployee);

module.exports = router;
