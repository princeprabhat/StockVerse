import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import ApiError from "./utils/ApiError.js";
import httpStatus from "http-status";
import errorHandler from "./middleware/errorHandler.js";
// import "./cron/schedule.js";

const app = express();
// TODO:Configure Rate limiter
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((req, res, next) => {
  next(
    new ApiError(httpStatus.NOT_FOUND, `Route ${req.originalUrl} is not valid`)
  );
});

// Custom global error handler
app.use(errorHandler);

export default app;
