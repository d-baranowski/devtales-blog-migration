#!/usr/bin/env bash

if [[ "$2" = "test" ]]; then
    echo "Test"
    python3 dynamodb-copy-table/dynamodb_replicate_table.py -t $1 -r eu-west-1
fi

if [[ "$2" = "dev" ]]; then
    echo "Dev"
    python3 dynamodb-copy-table/dynamodb_replicate_table_dev.py -t $1 -d $3 -r eu-west-1
fi
