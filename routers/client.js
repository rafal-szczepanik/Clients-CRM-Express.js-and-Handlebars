const express = require('express');
const {NotFoundError} = require("../utils/errors");
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
    const client = db.getOne(id);
    if (!client) {
      throw new NotFoundError();
    }

    res.render('client/one', {
      client,
    });
  })
  .post('/', (req, res) => {
    const id = db.create(req.body);

    const {name} = req.body;
    // db.create(req.body);
    res.render('client/added', {
      name,
      id,
    });
  })
  .put('/:id', (req, res) => {
    db.update(req.params.id, req.body);
    res
      .status(201)
      .render('client/modified', {
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
    const client = db.getOne(req.params.id);
    if (!client) {
      throw new NotFoundError();
    }

    res.render('client/forms/edit', {
      client,
    });
  });


module.exports = {
  clientRouter
};