const BaseService = require("./BaseService");
const ContactModel = require("../models/Contact");

class ContactService extends BaseService {
  constructor() {
    super(ContactModel);
  }
}

module.exports = new ContactService();
