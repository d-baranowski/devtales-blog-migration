from __future__ import print_function  # Python 2/3 compatibility

import argparse
import boto3


def mapIndex(index):
    return {
        "IndexName": index['IndexName'],
        "Projection": index['Projection'],
        "KeySchema": index['KeySchema']
    }


def recreate(table_name, existing_region):
    existing_table = boto3.resource(
        'dynamodb', region_name=existing_region).Table(table_name)

    key_schema = existing_table.key_schema
    attribute_definitions = existing_table.attribute_definitions
    global_secondary_indexes = list(map(mapIndex, existing_table.global_secondary_indexes))

    dynamodb = boto3.client('dynamodb')

    try:
        dynamodb.delete_table(TableName=table_name)
    except dynamodb.exceptions.ResourceNotFoundException:
        pass

    waiter = dynamodb.get_waiter('table_not_exists')
    waiter.wait(TableName=table_name)
    print("table deleted")

    dynamodb.create_table(
        TableName=table_name,
        KeySchema=key_schema,
        AttributeDefinitions=attribute_definitions,
        GlobalSecondaryIndexes=global_secondary_indexes,
        BillingMode='PAY_PER_REQUEST'
    )

    waiter = dynamodb.get_waiter('table_exists')
    waiter.wait(TableName=table_name)
    print("table created")

'''
Script used to delete and recreate an existing dynamodb table, effectively emptying it.

It accepts two arguments 
-t | --table_name Name of the table to recreate 
-r | --region Region in which the table exists 

'''
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-t',
        '--table_name',
        type=str,
        required=True,
        help="Name of the table to be replicated in new region")
    parser.add_argument(
        '-r',
        '--region',
        type=str,
        required=True,
        help="Region in which the table is present")
    args = parser.parse_args()

    recreate(args.table_name, args.region)
