import express from "express";
import { test } from "../controllers/user.controller.js";

//create router
const router = express.Router();

//Create api
//req is the data get from the (browser) client side
//res is the data we send back from the server side
router.get("/test", test);

export default router;
