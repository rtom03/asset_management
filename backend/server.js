import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import { connectDB } from "./config/config.js";

dotenv.config();

const port = process.env.PORT || 5000;
await connectDB();

const app = express();

// console.log(process.env.DATABASE_URL)

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
// app.use(errorHandler);

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
