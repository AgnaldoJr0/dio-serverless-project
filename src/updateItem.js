"use strict";

const AWS = require("aws-sdk");
const { handler } = require("./insertItem");

const updateItem = async (event) =>{
    const {itemStatus} = JSON.parse(event.body);
    const {id} = event.pathParameters

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    await dynamoDB.update({
        TableName:"NewItemTable",
        key:{id},
        UpdateExpression:'set itemStatus = :itemStatus',
        ExpressionAttributeValues: {
            ':itemStatus': itemStatus
        },
        ReturnValues: 'ALL_NEW'
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(
            { msg: 'item update'}
        )
    }
}

module.exports = {
    handler: updateItem
}