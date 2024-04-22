const whitelist = [
  "http://localhost:3500",
  "http://localhost:3000",
  "http://127.0.0.1:3500",
  "http://127.0.0.1:3000",
];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (origin && whitelist.indexOf(origin) === -1) {
      callback(new Error("Blocked by CORS Policy."));
    }
    callback(null, true);
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
