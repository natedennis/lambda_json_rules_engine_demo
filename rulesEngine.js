require('colors');

const { Engine } = require('json-rules-engine');

module.exports.jsonRules = async function jsonRules( person) {

    /**
     * Setup a new engine
     */
    let engine = new Engine();

    //add some rules
    for (i = 0; i < 10000; i++) {
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



    engine.addFact('age', person.age);

    engine.addFact('name', person.name);



    engine.on('success', function (event, almanac, ruleResult) {
        console.log('Success event:\n', event);
    });

    // Run the engine to evaluate
    let fired = [];
 
    const {events} = await engine
        .run()
    events.map(event => {
        console.log(event.params.message);
        fired.push(event.params.message);
    })
    person.fired = fired;
    return  person;
}