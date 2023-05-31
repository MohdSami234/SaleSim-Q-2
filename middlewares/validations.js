const { body, validationResult } = require('express-validator');

const validatePostRequest = [
    body('firstname').notEmpty().withMessage('firstName can not be empty'),
    body('lastname').notEmpty().withMessage('lastName can not be empty'),
    body('gender').notEmpty().withMessage('gender can not be empty'),
    body('address.line1').notEmpty().withMessage('line1 can not be empty'),
    body('address.city').notEmpty().withMessage('city can not be empty'),
    body('address.country').notEmpty().withMessage('country can not be empty'),
    body('address.zipcode').notEmpty().withMessage('zipcode can not be empty'),
    body('email').notEmpty().withMessage('email can not be empty'),
    body('email').isEmail().withMessage('Invalid email'),
    body('phone').notEmpty().withMessage('phone can not be empty'),
    body('phone').matches(/^\d{10}$/).withMessage('Invalid phone number')

  ];

 

  module.exports ={ validatePostRequest};

  