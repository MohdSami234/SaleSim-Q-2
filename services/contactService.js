const { query } = require("express");
const Contact = require("../modals/Contact");

exports.createContact = async (data) => {
    return await Contact.create(data);
}

exports.getContactDetail = async(query)=>{
    return await Contact.findOne(query);
}

exports.findByContactId = async (id) => {
    return await Contact.findById(id).lean()
}
exports.DeleteContact = async(id)=>{
    return await Contact.findByIdAndDelete(id);
}

exports.updateContact = async (id, data) => {
    return await Contact.findByIdAndUpdate(
        id, { $set: data }, { safe: true, upsert: false, new: true });
  }

exports.findContactlist  = async()=>{
    return await Contact.find().lean();
}