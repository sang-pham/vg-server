const { horsePlaceController } = require("../controllers");

const { Router } = require("express");
const router = new Router();
const { ApiResponse } = require("../libs");
const { authMiddleware } = require("../middlewares");
const { asyncHandle } = ApiResponse;

router.use(authMiddleware());

router.get("/", asyncHandle(horsePlaceController.getAll));

router.post("/", asyncHandle(horsePlaceController.create));

router.put("/:id", asyncHandle(horsePlaceController.update));

router.delete("/:id", asyncHandle(horsePlaceController.delete));

module.exports = router;
