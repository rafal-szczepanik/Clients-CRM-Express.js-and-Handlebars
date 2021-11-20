const {ValidationError} = require("../utils/errors");

class ClientRecord {
  constructor(obj) {
    const {name, id, notes, mail, nextContact} = obj;

    if (!id || typeof id !== "string") {
      throw new ValidationError('ID musi być niepustym tekstem');
    }

    if (!mail || typeof mail !== "string" || mail.indexOf('@') === -1) {
      throw new ValidationError('E-mail nieprawidłowy.');
    }

    if (!name || typeof name !== "string" || name.length < 3) {
      throw new ValidationError('Imię musi być tekstem o długości minimum 3 znaków');
    }

    if (typeof nextContact !== "string") {
      throw new ValidationError('Data następnego kontaktu musi być tekstem');
    }
    if (typeof notes !== "string") {
      throw new ValidationError('Notatki muszą być tekstem.');
    }
    Object.assign(this, {id, name, notes, mail, nextContact});
    // this.id = id;
    // this.name = name;
    // this.notes = notes;
    // this.mail = mail;
    // this.nextContact = nextContact;
  }
}


module.exports = {
  ClientRecord,
};