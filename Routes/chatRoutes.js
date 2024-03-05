const express = require('express');
const uc = require("../Controller/userController");
const hc = require("../Controller/mainController")
const chat = require("../Controller/chatController")

const router = express.Router();
//for vlaidators
const imageAccess = require("../Middleware/imageAccess")
const isAuthenticated = require("../Middleware/isAuthenticated");


// Landing page route (GET)
router.get('/userChat',chat.renderUserChat);




module.exports = router;