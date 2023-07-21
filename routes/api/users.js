const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

const ctrl = require("../../controllers/users");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch("/", authenticate, validateBody(schemas.updateBySubscriptionSchema), ctrl.updateBySubscription);

module.exports = router;