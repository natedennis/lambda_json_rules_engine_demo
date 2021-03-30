require('colors');

const { Engine } = require('json-rules-engine');


/**
 * Setup a new engine
 */

let addRulesTime = Date.now();

let engine = new Engine();
//add some rules
for (i = 0; i < 10000; i++) {
    const rule = {
        conditions: {
            any: [{
                fact: 'age',
                operator: 'greaterThanInclusive',
                value: i
            }]
        },
        event: {  // define the event to fire when the conditions evaluate true
            type: 'age',
            params: {
                message: 'Person is at least ' + i
            }
        }
    };
    engine.addRule(rule);
}
console.log('Init Engine and Add Rules time : ' + (Date.now()-addRulesTime) + ' ms');
module.exports.jsonRules = async function jsonRules(person) {

    let addFactsTime = Date.now();
    engine.addFact('age', person.age);
    engine.addFact('name', person.name);
    console.log('Add facts time : ' + (Date.now()-addFactsTime) + ' ms');

//    engine.on('success', function (event, almanac, ruleResult) {
//        console.log('Success event:\n', event);
//    });

    // Run the engine to evaluate
    let fired = [];

    let engineRunTime = Date.now();
    const { events } = await engine
        .run()
    events.map(event => {
        console.log(event.params.message);
        fired.push(event.params.message);
    })
    person.fired = fired;
    console.log('Engine Run time : ' + (Date.now()-engineRunTime) + ' ms');

    let removeFactTime = Date.now();
    engine.removeFact('age');
    engine.removeFact('name');
    console.log('Engine remove facts time : ' + (Date.now()-removeFactTime) + ' ms');

    return person;
}