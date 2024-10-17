"use strict"

const { v4 } = require("uuid")
const AWS = require("aws-sdk")
const { handler } = require("./insertItem")
const s3 = new AWS.S3()
const fs = require('fs');


const BUCKET = process.env.BUCKET

const uploadFile = async (event) => {
    const itemName = event.pathParameters.item;
    const itemContent = Buffer.from(event.body, 'base64');

    const params = {
        Bucket: process.env.BUCKET,
        Key: itemName,
        Body: itemContent
    };

    try {
        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File uploaded successfully', location: data.Location })
        };
    } catch (error) {
        console.error('Error uploading file: ', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error uploading file', error })
        };
    }
};

module.exports = {
    handler: uploadFile
}