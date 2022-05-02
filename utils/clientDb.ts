import {readFile, writeFile} from 'fs/promises';
import {join} from 'path';
import {v4 as uuid} from 'uuid';
import {ClientRecord} from "../records/client-record";


class Db {

  private data: ClientRecord[] = [];

  constructor(readonly dbFileName: string) {
    this.dbFileName = join(__dirname, '../data', dbFileName);
    this.load();
  }

  private async load(): Promise<void> {
    this.data = (JSON.parse(await readFile(this.dbFileName, 'utf8')) as ClientRecord[])
        .map(obj => new ClientRecord(obj));
  }

  private save(): void {
    writeFile(this.dbFileName, JSON.stringify(this.data), 'utf8');
  }

  create(obj: ClientRecord): string {
    const id = uuid();
    this.data.push(new ClientRecord({
      id,
      ...obj
    }));
    this.save();
    return id;
  }

  getAll(): ClientRecord[] {
    return this.data;
  }

  getOne(id: string): ClientRecord {
    return this.data.find(item => item.id === id);
  }

  update(id: string, newObj: ClientRecord) {
    this.data = this.data.map(oneObj => {
      return oneObj.id === id ? {
        ...oneObj,
        ...newObj
      } : oneObj;
    });
    this.save();
  }

  delete(id: string): void {
    this.data = this.data.filter(obj => obj.id !== id);
    this.save(); //debounce
  }
}

export const clientsDb = new Db('client.json');
