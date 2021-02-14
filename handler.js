'use strict';
const { jsonRules } = require("./rulesEngine");

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.rules = async (event, context, callback) => {
  var person = JSON.parse(event.body).person;
  console.log('person: ', person);
  const ruleEvents = await jsonRules(person);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      person
     /* 
      message: 'API is accessed',
      input: person,
      output: ruleEvents
      */
    }),
  };
  callback(null, response);
};