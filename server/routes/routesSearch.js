const express = require('express');
const router = express.Router();
const API = require('../controllers/api');

router.get("/poke", API.searchPoke);
router.get("/item", API.searchItem);
router.get("/move", API.searchMove);
router.get("/:id", API.searchPokeById)

module.exports = router;