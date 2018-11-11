const { Transform } = require("stream");
module.exports = {
  map: function(fn) {
    return new Transform({
        objectMode: true,
        transform(ch, e, cb){
          this.push(fn(ch));
          cb();
        }
    });
  },
  filter: function(fn) {
      return new Transform({
          objectMode: true,
          transform(ch, e, cb){
              if (fn(ch))
                  this.push(ch);
              cb();
          }
      });
  }
};

