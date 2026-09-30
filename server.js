import express from "express";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./atlas-credentials.env" });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.json({ message: "Cinema API is running" }));
app.use("/api", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: "Client Error",
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose CastError (Invalid ObjectIds)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `ID-ul furnizat este invalid: ${err.value}`;
  }

  // Handle Mongoose Validation Errors (Required fields, min values, regex)
  if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = `Erori de validare: ${errors.join(", ")}`;
  }

  const statusMessage =
    statusCode >= 400 && statusCode < 500 ? "Client Error" : "Server Error";

  res.status(statusCode).json({
    status: statusCode,
    error: statusMessage,
    message: message,
    timestamp: new Date().toISOString(),
  });
});

async function start() {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`),
  );
}

start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
