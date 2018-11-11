/*
returns new object Transport stream 
	- accepting objects
	- and returning strings representing JSON.stringify(obj)

use cases: 

fromGenerator(sequence).pipe(stringify).pipe(process.stdout);
*/

/*
    returns new object Transport stream
        - accepting objects
        - and returning strings representing JSON.stringify(obj)

    use cases:

    fromGenerator(sequence).pipe(stringify).pipe(process.stdout);
    */

const { Transform } = require('stream');

const objectToString = function() {
    return new Transform({
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            try {
                chunk = JSON.stringify(chunk);
            } catch (e) {
                return callback(e);
            }
            this.push(chunk);
            callback();
        },
    });
};

module.exports = {
    objectToString: objectToString,
};
