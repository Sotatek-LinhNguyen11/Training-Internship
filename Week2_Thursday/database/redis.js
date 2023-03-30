const { createClient } = require("redis");

const client = createClient({
  url: "redis://default:tOOkJsvhCAPnBwspO0zgJg9diivG64tH@redis-14748.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:14748",
});

client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = client;
