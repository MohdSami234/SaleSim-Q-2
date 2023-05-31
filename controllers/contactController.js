const Contact = require("../modals/Contact");
const contactService  = require("../services/contactService")
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
 
exports.createContact =  async(req, res) => {
    var errors =validationResult(req);
    if (errors.errors.length>0) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            let queryMobileAndEmail = {"email":inputData.email,"phone":inputData.phone}
            let ContactDetails = await contactService.getContactDetail(queryMobileAndEmail);
            console.log(JSON.stringify(ContactDetails));
            if(ContactDetails){
                res.send({status_code:409,status:'success',message:"Contact with given Mobile No and Email already exist. please try with different Mobile No or Email "})
            }
            else{
            let createData = {
                ...inputData
            };
            let contact_details = await contactService.createContact(createData);
            res.send({ status_code: 200, status: 'success', message: 'Contact created',contact_details });
            }
           
        } catch (err) {
            res.send({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}

exports.updateContact =  async(req, res) => {
        try {
            const contactId = req.params.id; 
            const inputData = req.body;
            const regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const regexphone =  /^\d{10}$/;
            let ContactDetails = await contactService.findByContactId(contactId);
            console.log(ContactDetails);
            if(!ContactDetails){
                res.send({status_code:204,status:"success",message:"No Contact Found"})
            }
            else{
            if(inputData.phone && !inputData.email){
                const validatephone =  regexphone.test(inputData.phone);
                if(!validatephone){
                    return res.send({ status_code: 400, status: 'failure', message: "Invalid Phone No" });
                }
                else{
                    let queryMobileAndEmail = {"email":ContactDetails.email,"phone":inputData.phone,"_id": { '$ne': contactId }};
                    let ContactMobileandEmail = await contactService.getContactDetail(queryMobileAndEmail);
                    console.log(ContactMobileandEmail);
                    if(ContactMobileandEmail){
                        res.send({status_code:409,status:'success',message:"Contact with given Mobile No and Email already exist. please try with different Mobile No or Email"})
                    } 
                    else{
                        console.log("pass")
                    var updateContactdata = {
                        ...inputData
                    };
                      let contact_details = await contactService.updateContact(contactId,updateContactdata);
                      res.send({ status_code: 200, status: 'success', message: 'Contact created',contact_details });
                    } 
                }
            }
            else if(!inputData.phone && inputData.email){
                const validateemail = regexemail.test(inputData.email);
                if(!validateemail){
                    return res.send({ status_code: 400, status: 'failure', message: "Invalid email" });
                }else{
                let ContactDetails = await contactService.findByContactId(contactId);
                let queryMobileAndEmail = {"email":inputData.email,"phone":ContactDetails.phone,"_id": { '$ne': contactId }};
                let ContactMobileandEmail = await contactService.getContactDetail(queryMobileAndEmail);
                if(ContactMobileandEmail){
                    res.send({status_code:409,status:'success',message:"Contact with given Mobile No and Email already exist. please try with different Mobile No or Email"})
                } 
                else{
                var updateContactdata = {
                    ...inputData
                };
                let contact_details = await contactService.updateContact(contactId,updateContactdata);
                res.send({ status_code: 200, status: 'success', message: 'Contact created',contact_details });
                } 
                }
               
            }
            else if(inputData.phone && inputData.email){
                
                const validateemail = regexemail.test(inputData.email);
                const validatphone = regexphone.test(inputData.phone);
                if(!validateemail || !validatphone){
                    return res.send({ status_code: 400, status: 'failure', message: "Invalid email or phone" });
                }else{
                let queryMobileAndEmail = {"email":inputData.email,"phone":inputData.phone,"_id": { '$ne': contactId }};
                let ContactMobileandEmail = await contactService.getContactDetail(queryMobileAndEmail);
                if(ContactMobileandEmail){
                    res.send({status_code:409,status:'success',message:"Contact with given Mobile No and Email already exist. please try with different Mobile No or Email"})
                } 
                else{
                var updateContactdata = {
                    ...inputData
                };
                let contact_details = await contactService.updateContact(contactId,updateContactdata);
                res.send({ status_code: 200, status: 'success', message: 'Contact created',contact_details });
                } 
                }
            }
            else{
                 var updateContactdata = {
                ...inputData
            };
            let contact_details = await contactService.updateContact(contactId,updateContactdata);
            res.send({ status_code: 200, status: 'success', message: 'Contact created',contact_details });
            }   
            }
           
          } catch (err) {
            res.json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }


exports.getContactDetails = async (req, res) => {
        try {
            var inputData = req.query;
            let query = {"_id":inputData._id }
            let getContactDetailsRes = await contactService.findByContactId(query);
            if(getContactDetailsRes){
               res.send({ status_code: 200, status: 'success', message: 'Contact Details', getContactDetailsRes });
            }else{
                res.send({ status_code: 204, status: 'success', message: 'No Contact Found' });
            }
            
        } catch (err) {
            res.send({ status_code: 500, status: 'failure', message: err.stack });
        }
    
}

exports.getContactlist = async (req,res)=>{
    try {
        var inputData = req.query
        let getContactDetailsRes = await contactService.findContactlist();
        if(getContactDetailsRes.length>0){
          res.send({ status_code: 200, status: 'success', message: 'Contact Details', getContactDetailsRes }); 
        }else{
            res.send({ status_code: 204, status: 'success', message: 'No Contact Found' });  
        }
    } catch (err) {
        res.send({ status_code: 500, status: 'failure', message: err.stack });
    }
}

exports.DeleteContact = async (req, res) => {
    try {
        const contactId = req.params.id; 
        const deletedContact = await contactService.DeleteContact(contactId);
        if(deletedContact){
          res.send({ status_code: 200, status: 'success', message: 'Contact Deleted' });   
        }else{
         res.send({ status_code: 204, status: 'success', message: 'No Contact Found to delete' });  
        }
       
    } catch (err) {
        res.send({ status_code: 500, status: 'failure', message: err.stack });
    }

}

