const { Transform } = require('stream');
module.exports = {
    map: function(fn) {
        return new Transform({
            objectMode: true,
            transform(ch, e, cb) {
                this.push(fn(ch));
                cb();
            },
        });
    },

    filter: function(fn) {
        return new Transform({
            objectMode: true,
            transform(ch, e, cb) {
                if (fn(ch)){
                    this.push(ch);
                }
                cb();
            },
        });
    },

    filterDuplicate: function(chunk) {
        let values = new Set();
        let tmpStr = JSON.stringify(chunk);
        if (values.has(tmpStr)) return false;
        values.add(tmpStr);
        return true;
    }
};


