const {readFile, writeFile} = require('fs').promises;
const {join} = require('path');
const {v4: uuid} = require("uuid");


class DB {
  constructor(dbFileName) {
    this.dbFileName = join(__dirname, '../data', dbFileName);
    this._load();
  }

  async _save() {
    await writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8');

  }

  async _load() {
    this._data = JSON.parse(await readFile(this.dbFileName, 'utf8'));
  }

  create(obj) {
    const id = uuid();
    this._data.push({
      id,
      ...obj
    });
    this._save();

    return id;
  }

  getAll() {
    return this._data;
  }

  getOne(id) {
    return this._data.find(obj => obj.id === id);
  }

  update(id, newObj) {
    this._data = this._data.map(oneObj => (
      oneObj.id === id ? {
        ...oneObj,
        ...newObj,
      } : oneObj
    ));
    this._save();
  }

  async delete(id) {
    this._data = this._data.filter(obj => obj.id !== id);
    await this._save();
  }
}

const db = new DB('client.json');
// await db.create({
//       "name": "Tester2",
//       "mail": "test2@example.com"
// })

module.exports = {
  db
};