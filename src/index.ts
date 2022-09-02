import express from "express";
import path from "path";
import { CDN_PORT, USAGE_LIMIT } from "./config";

const app = express();

const usageCount = {
  cdn1: 0,
  cdn2: 0,
}
const DEFAULT_ORDER = ["CDN1", "CDN2"]
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Static Routes
app.use(
  "/cdn1",
  (req, res, next) => {
    usageCount.cdn1 += 1;
    return express.static(path.join(__dirname, "..", "static", "videos"))(req, res, next)
  }
);
app.use(
  "/cdn2",
  (req, res, next) => {
    usageCount.cdn2 += 1;
    return express.static(path.join(__dirname, "..", "static", "videos"))(req, res, next)
  }
);

app.use(
  "/steer",
  (_req, res, next) => {
    const manifest = {
      VERSION: 1,
      TTL: 50,
      "RELOAD-URI": "http://localhost:5000/steer",
      "PATHWAY-PRIORITY": DEFAULT_ORDER
     }
     if (usageCount.cdn1 > USAGE_LIMIT) {
      usageCount.cdn1 = 0;
      manifest["PATHWAY-PRIORITY"] = ["CDN2", "CDN1"];
     } else if (usageCount.cdn2 > USAGE_LIMIT) {
      usageCount.cdn2 = 0;
      manifest["PATHWAY-PRIORITY"] = DEFAULT_ORDER;
     }
     res.send(manifest);
     next();
  }
)

// Init
app.listen(CDN_PORT, () => {
  /* eslint-disable-next-line no-console */
  console.log(`The videoserver is listening on port ${CDN_PORT} !`);
});
