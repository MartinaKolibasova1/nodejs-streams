const obj = require("../src/object.js");
const re = require("../src/fromGenerator.js");
const assert = require("assert");

describe("transform stream", function() {
    it ("should map objects", function() {
        let collection = re.generator(10);
        let readStream = new re.fromGenerator({objectMode: true},collection);
        let mapStream = obj.map((x) => x + 2);
        let arr = [];
        let result = [3,4,5,6,7,8,9,10,11];

        readStream.pipe(mapStream);

        mapStream.on('data', function(data) {
            arr.push(data);
        });
        mapStream.on('end', function() {
            assert.deepEqual(arr, result);
        });
        //readStream.pipe(mapStream).pipe(process.stdout);
    });

    it ("should filter objects", function() {
        let collection = re.generator(10);
        let readStream = new re.fromGenerator({objectMode: true}, collection);
        let filterStream = obj.filter((x) => x > 2);

        let arr = [];
        let result = [3,4,5,6,7,8,9,];

        readStream.pipe(filterStream);

        filterStream.on('data', function(data) {
            arr.push(data);
        });
        filterStream.on('end', function() {
            assert.deepEqual(arr, result);
        });

        //readStream.pipe(mapStream).pipe(process.stdout);
    });

    it("Filterduplicates should return only unique values", function(done) {

        let collection = re.generator(10);
        let collection1 = re.generator(10);
        let readStream = new re.fromGenerator({objectMode: true}, collection);
        let filterStream = obj.filter(obj.filterDuplicate());

        readStream
            .pipe(filterStream)
                .on("data", chunk => {
                    assert.equal(chunk, collection.next().value);
                })
                .on("end", () => done());
    });
});