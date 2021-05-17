import express from 'express';
import morgan from 'morgan';
import cors from "cors";
require('./connection/connect');
require('dotenv').config();
const app = express();
const v1 = require('./V1/router/index')
app.use(express.json());
morgan.token('host', function(req, res) {
    return req.hostname;
});
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authtoken");
    next();
  })
app.use(morgan(':method :host:url  :status  :response-time ms'))
app.use("/v1",v1)
app.listen(process.env.PORT, () => {
    console.log(`Connected to port ${process.env.PORT}........`);
})