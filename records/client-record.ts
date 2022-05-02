import {myValidationError} from "../utils/handleError";

export class ClientRecord {
  public readonly id: string;
  public name: string;
  public mail: string;
  public nextContact?: string;
  public notes?: string;

  constructor(obj: ClientRecord) {
    const {id, name, mail, nextContact, notes} = obj;

    if (!id || typeof id !== "string") {
      throw myValidationError(400, "ID has to exist and be string");
    }

    if (!name || typeof name !== "string" || name.length < 3) {
      throw myValidationError(400, "Name has to be string and contain at least 3 characters.");
    }

    if (!mail || typeof mail !== "string" || !mail.includes("@")) {
      throw myValidationError(400, "Incorrect e-mail. E-mail has to have @ character");
    }

    if (typeof notes !== "string") {
      throw myValidationError(400, "Notes have to be string.");
    }

    if (typeof nextContact !== "string") {
      throw myValidationError(400, "Date of next contact has to be string.");
    }

    for (const objKey in obj) {
      this[objKey as keyof ClientRecord] = obj[objKey as keyof ClientRecord]
    }
  }
}
