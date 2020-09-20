#!/usr/bin/env node

const AWS = require("aws-sdk")
const fs = require("fs");
const data = fs.readFileSync("/dev/stdin", "utf-8");
const result = JSON.parse(data);

console.log(JSON.stringify(AWS.DynamoDB.Converter.unmarshall(result)))
