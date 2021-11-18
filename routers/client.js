const express = require('express');
const {db} = require("../utils/db");
const {ClientRecord} = require("../records/client-record");

const clientRouter = express.Router();

clientRouter
  .get('/', (req, res) => {
    res.render('client/list-all', {
      clients: db.getAll(),
    });
  })
  .get('/:id', (req, res) => {
    const {id} = req.params;
    const client = new ClientRecord(db.getOne(id));
    console.log(client);

    res.render('client/one', {
      client: db.getOne(id),
    });
  })
  .post('/', (req, res) => {
    const id = db.create(req.body);
    const {name, mail, notes, nextContact} = req.body;
    db.create(req.body);
    res.render('client/added', {
      name,
      id,
    });
  })
  .put('/:id', (req, res) => {
    db.update(req.params.id, req.body);
    res.render('client/modified', {
      name: req.body.name,
      id: req.params.id,
    });
  })
  .delete('/:id', (req, res) => {
    const {id} = req.params;
    db.delete(id);
    res.render('client/deleted', {
      name: req.body.name,
    });
  })
  .get('/form/add', (req, res) => {
    res.render('client/forms/add');
  })
  .get('/form/edit/:id', (req, res) => {
    res.render('client/forms/edit', {
      client: db.getOne(req.params.id)
    });
  });


module.exports = {
  clientRouter
};