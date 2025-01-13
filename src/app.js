import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/mainRoute.js";
import helmet from "helmet";
import session from "express-session";

const app = express();

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "tetecaralho 93",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge:30000 },
    
  })
);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

export default app;
