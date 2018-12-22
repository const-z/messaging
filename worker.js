"use strict";

const { promisify } = require("util");

const NATS = require("nats");

const nats = NATS.connect();
const delay = promisify(setTimeout);

async function process2(request, replyTo) {
  const data = JSON.parse(request);
  console.log("worker received message", data.id);
  await delay(5000);
  console.log("worker processed", data.id);
  if (replyTo) {
    nats.publish(replyTo, JSON.stringify(data.id));
  }
}

nats.subscribe("message:forworker", { queue: "queue:worker" }, process2);
