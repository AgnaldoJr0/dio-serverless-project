"use strict";

const AWS = require("aws-sdk");
const { handler } = require("./insertItem");

const fetchItem = async (event) =>{
    const  dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParemeters

    let item;

    try{
        const results = await dynamoDB.get({
            TableName: "NewItemTable",
            key: {id}
        }).promise();
        
        item = results.Item;
    }catch (error){
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    };
}

module.exports = {
    handler: fetchItem
}