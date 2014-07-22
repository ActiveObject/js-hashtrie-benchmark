var pad = require('pad');

var log = function () {
  console.log(this.name);
  this.map(function (results) {
    console.log(pad(results.name, 30) + ': ' +
      pad(15, results.hz.toFixed(2)) + ' +/- ' + results.stats.rme.toFixed(2) + '% op/s');
  });
  console.log('\n');
};

var prepare = require('./benchmarks/data').prepare;
var sizes = [10, 100, 1000, 10000, 100000];
prepare(sizes);

require('./benchmarks/get')(sizes)
  .on('complete', log)
  .run(true);

require('./benchmarks/put')(sizes)
  .on('complete', log)
  .run(true);

require('./benchmarks/put_all')(sizes)
  .on('complete', log)
  .run(true);

require('./benchmarks/remove')(sizes)
  .on('complete', log)
  .run(true);

require('./benchmarks/remove_all')(sizes)
  .on('complete', log)
  .run(true);

require('./benchmarks/count')(sizes)
  .on('complete', log)
  .run(true);

require('./benchmarks/sum')(sizes)
  .on('complete', log)
  .run(true);

require('./benchmarks/keys')(sizes)
  .on('complete', log)
  .run(true);
