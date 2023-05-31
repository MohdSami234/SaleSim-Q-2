const contactController = require("../controllers/contactController");

const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const{ validatePostRequest} = require('../middlewares/validations');


router.get("/getContactlist",contactController.getContactlist);
router.get("/getContactDetails",contactController.getContactDetails);
router.post("/createContact",validatePostRequest,contactController.createContact);
router.put('/updateContact/:id',contactController.updateContact);
router.delete('/deleteContact/:id',contactController.DeleteContact);
 




 
module.exports = router;