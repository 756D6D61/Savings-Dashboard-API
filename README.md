https://o39ren2sp5.execute-api.us-west-1.amazonaws.com/latest/api/contacts

# How to Deploy to AWS
* npm install claudia
* add module.exports = app; to the end of the server file
* install aws-sdk and aws-serverless-express via npm 
* claudia generate-serverless-express-proxy --express-module server (for lambda file)
* aws configure in terminal (add access key and secret access key)
* claudia create --handler lambda.handler --deploy-proxy-api --region eu-central-1

 