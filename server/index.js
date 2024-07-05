const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { config } = require("dotenv");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

// Express Server
const app = express();

// Environment Variables
config();

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "2mb" }));

// Routes
app.use("/api/price", require("./routes/price"));
app.use("/api/deposit", require("./routes/deposit"));
app.use("/api/claim", require("./routes/claim"));
app.use("/api/share", require("./routes/share"));
// app.use("/api/blockNumber", require("./routes/blockNumber"));
// app.use("/api/buyback", require("./routes/buyback"));
app.use("/api/balance", require("./routes/balance"));
app.use("/api/liquidity", require("./routes/liquidity"));
app.use("/api/swap", require("./routes/swap"));
// app.use("/api/dashboard", require("./routes/dashboard"));
// app.use("/api/circulation", require("./routes/circulation")); -> 외부 API 호출
app.use("/api/default", require("./routes/default"));
app.use("/api/transaction", require("./routes/transaction"));

// with ReactJS
// if (NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, process.env.STATIC_PATH)));
//   app.get("*", (req, res) => {
//     return res.sendFile(path.resolve(__dirname, process.env.STATIC_FILE_PATH));
//   });
// }

app.use(express.static(path.resolve(__dirname, process.env.STATIC_PATH)));
app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, process.env.STATIC_FILE_PATH));
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
