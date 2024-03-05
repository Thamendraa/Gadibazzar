const { validationResult } = require("express-validator");
const { name } = require("ejs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const Cars = db.cars;
const User = db.user;
const Bridge = db.bridge;
const KYC = db.kyc;
const Appointment = db.inspection_appointment;
const { QueryTypes, where } = require('sequelize');


exports.renderUserChat = async (req, res) => {
res.render("userChat")
};