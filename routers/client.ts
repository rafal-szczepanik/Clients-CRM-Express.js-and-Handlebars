import {Router} from 'express';
import {clientsDb} from '../utils/clientDb';
import {myValidationError} from "../utils/handleError";
import {NotFoundError} from "../utils/notFound";
import {ClientRecord} from "../records/client-record";

export const clientRouter = Router();

clientRouter
    .get('/', (req, res) => {
        const allClients = clientsDb.getAll();
        res.render('client/list-all', {
            allClients
        });
    })
    .get('/form/add', (req, res) => {
        res.render("client/forms/add-one");
    })

    .get('/form/edit/:id', (req, res) => {
        const {id} = req.params;
        const client = clientsDb.getOne(id);

        if (!client) {
            throw new NotFoundError();
        }

        res.render("client/forms/edit-one", {
            client
        });
    })

    .get('/:id', (req, res) => {
        const {id} = req.params;
        const client = clientsDb.getOne(id);

        if (!client) {
            throw new NotFoundError();
        }

        res.render('client/one', {
            client
        });
    })

    .post('/', (req, res) => {

        const allClients = clientsDb.getAll();
        allClients.forEach(obj => {
            if (obj.mail === req.body.mail) {
                throw myValidationError(400, "This mail has been used already");
            }
        });

        const id = clientsDb.create(req.body);
        res
            .status(201)
            .render("client/created", {
                id,
                name: req.body.name
            });
    })

    .put('/:id', (req, res) => {
        const {id} = req.params;
        const client: ClientRecord = req.body;
        if (!client) {
            throw new NotFoundError();
        }

        clientsDb.update(id, client);
        res.render("client/edited");
    })

    .delete('/:id', (req, res) => {
        const {id} = req.params;

        if (!id) {
            throw new NotFoundError();
        }

        clientsDb.delete(id);
        res.render("client/deleted");
    });
