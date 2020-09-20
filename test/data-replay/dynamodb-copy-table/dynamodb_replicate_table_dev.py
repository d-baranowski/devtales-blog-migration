from __future__ import print_function  # Python 2/3 compatibility

import argparse
import boto3


def mapIndex(index):
    return {
        "IndexName": index['IndexName'],
        "Projection": index['Projection'],
        "KeySchema": index['KeySchema']
    }


def recreate(aws_table_name, existing_region, dev_table_name):
    print("fetching existing table")
    existing_table = boto3.resource(
        'dynamodb', region_name=existing_region).Table(aws_table_name)

    key_schema = existing_table.key_schema
    attribute_definitions = existing_table.attribute_definitions
    global_secondary_indexes = list(map(mapIndex, existing_table.global_secondary_indexes))

    dynamodb = boto3.client('dynamodb', endpoint_url='http://dynamo:8000/')

    try:
        dynamodb.delete_table(TableName=dev_table_name)
    except dynamodb.exceptions.ResourceNotFoundException:
        pass

    print("waiting to delete table")
    waiter = dynamodb.get_waiter('table_not_exists')
    waiter.wait(TableName=dev_table_name)
    print("table deleted")

    dynamodb.create_table(
        TableName=dev_table_name,
        KeySchema=key_schema,
        AttributeDefinitions=attribute_definitions,
        GlobalSecondaryIndexes=global_secondary_indexes,
        BillingMode='PAY_PER_REQUEST'
    )

    print("waiting to create table")
    waiter = dynamodb.get_waiter('table_exists')
    waiter.wait(TableName=dev_table_name)
    print("table created")

'''
Script used to delete and recreate an existing dynamodb table, effectively emptying it.

It accepts two arguments 
-t | --aws_table_name Name of the table to copy schema from
-r | --region Region in which the table exists 
-d | --dev_table_name Name of the table in local dynamodb to recretate

'''
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '-t',
        '--aws_table_name',
        type=str,
        required=True,
        help="Name of the table with schema to copy")
    parser.add_argument(
        '-d',
        '--dev_table_name',
        type=str,
        required=True,
        help="Name of the table to be created in local dynamodb")
    parser.add_argument(
        '-r',
        '--region',
        type=str,
        required=True,
        help="Region in which the table is present")
    args = parser.parse_args()

    recreate(args.aws_table_name, args.region, args.dev_table_name)
