// Configurations and environment variables

// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

// ℹ️ Needed to accept requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request is made from the same domain, by default express wont accept POST requests
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

// Middleware configuration
module.exports = (app) => {
  // Because this will be hosted on a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  // Services like Fly use something called a proxy and you need to add this to your server
  app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      origin: [FRONTEND_URL],
    })
  );

  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};

PORT=5005
ORIGIN=http://localhost:3000
TOKEN_SECRET=y0uRt0k3N$eCr3T
SESSION_SECRET='Pilias'
MONGO_URI="mongodb+srv://andrepinto:YGa6d8RLPU3BTk7F@cluster0.u1ktoop.mongodb.net/"
CLOUDINARY_NAME='dqczjilmn' 
CLOUDINARY_KEY='424963154419575' 
CLOUDINARY_SECRET='qY3DINYistZ-YZOztOL_3_w_QO4' 


export const config = {
  tknSecret: process.env.TOKEN_SECRET,
  seshSecret: process.env.SESSION_SECRET,
  dbURI: process.env.MONGO_URI,
  cloudName: process.env.CLOUDINARY_NAME,
  cloudKey: process.env.CLOUDINARY_KEY,
  cloudSecret: process.env.CLOUDINARY_SECRET,
}