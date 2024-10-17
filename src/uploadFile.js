"use strict"

const { v4 } = require("uuid")
const AWS = require("aws-sdk")
const { handler } = require("./insertItem")
const s3 = new AWS.S3()

const BUCKET = process.env.BUCKET

const uploadFile = async (itemName, itemContent) => {
    const params = {
        Bucket: process.env.BUCKET,
        Key: itemName,
        Body: itemContent
    }

    try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded sucessfully. ${data.Location}');
    }catch (error){
        console.log('Error uploading file: ', error)
    }
}

module.exports = {
    handler: uploadFile
}