const express = require('express');

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getById);

router.post("/", validateBody(schemas.schema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put('/:contactId', isValidId, validateBody(schemas.schema), ctrl.updateContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
