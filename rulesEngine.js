require('colors');

const { Engine } = require('json-rules-engine');

module.exports.jsonRules = async function jsonRules( person) {

    /**
     * Setup a new engine
     */
    console.log('create Engine');
    console.log('person: ' + JSON.stringify(person) );


    let engine = new Engine();


    //add some rules
    for (i = 0; i < 10; i++) {
        console.log('add rule: ' + i);
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
        console.log('rule added:\n', rule);

        engine.addRule( rule );
    }


    let ageFact = function (person, almanac) {
        // facts may return a promise when performing asynchronous operations
        // such as database calls, http requests, etc to gather data
        return person.age;
    };
    engine.addFact('age', ageFact);
    engine.addFact('age', person.age);


    let nameFact = function (person, almanac) {
        return person.name;
    };
    engine.addFact('name', nameFact);



    engine.on('success', function (event, almanac, ruleResult) {
        console.log('Success event:\n', event);
    });

    // Run the engine to evaluate
    let fired = [];
    const facts = { age: 4 };
    const {events} = await engine
        .run(facts)
    events.map(event => {
        console.log(event.params.message);
        fired.push(event.params.message);
    })
    person.fired = fired;
    return  person;
}