#!/usr/bin/env node

const AWS = require("aws-sdk")
const fs = require("fs");
const data = fs.readFileSync("/dev/stdin", "utf-8");
const execSync = require('child_process').execSync;

const tableName = process.argv[2];
const environment = process.argv[3];

const putItems = data.split("\n");
const items = [];
putItems.forEach(element => {
    if (element) {
        items.push({ PutRequest: { Item: JSON.parse(element) } })
    }
});



const batches = [];

const batchSize = 15;
while (items.length) {
    const chunk = items.splice(0,batchSize);
    batches.push(chunk);
}

let commands = [];

batches.forEach(batch => {
    commands.push(JSON.stringify({
        [tableName]: batch
    }))
})

commands.forEach((c, i) => {
    const output = execSync(`aws dynamodb batch-write-item --request-items '${c}' ${environment == "dev" ? "--endpoint-url http://dynamodb:8000": ""}`, { encoding: 'utf-8' });
    console.log(`Batch ${i + 1} Output was:\n`, output);
})