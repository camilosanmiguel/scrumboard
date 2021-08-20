const express = require("express");
const multiparty = require("connect-multiparty");
const mult = multipart();
const router = express.Router();
const BoardController = require("../controllers/board");
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const File = require("../middleware/file");

router.post("/saveTask", Auth, ValidateUser, BoardController.saveTask);
router.post(
  "/saveTaskImg",
  mult,
  Auth,
  ValidateUser,
  File,
  BoardController.saveTaskImg
);
router.get("/listTask", Auth, ValidateUser, BoardController.listTask);
router.put("/updateTask", Auth, ValidateUser, BoardController.updateTask);
router.delete(
  "/deleteTask/:_id",
  Auth,
  ValidateUser,
  BoardController.deleteTask
);

module.exports = router;
