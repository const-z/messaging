"use strict";

const NATS = require("nats");

const nats = NATS.connect();

let id = 0;

setInterval(() => {
  const data = {
    somedata: "data",
    timestamp: Date.now(),
    id: id++
  };
  console.log("Sent message", data.id);
  const sid = nats.request(
    "message:forworker",
    JSON.stringify(data),
    async response => {
      console.log("Processed:", response);
    }
  );
}, 1000);
