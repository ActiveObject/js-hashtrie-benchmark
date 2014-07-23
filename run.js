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

require('./benchmarks/get')(prepare(sizes))
  .on('complete', log)
  .run(true);

require('./benchmarks/put')(prepare(sizes))
  .on('complete', log)
  .run(true);

require('./benchmarks/put_all')(prepare(sizes))
  .on('complete', log)
  .run(true);

require('./benchmarks/remove')(prepare(sizes))
  .on('complete', log)
  .run(true);

require('./benchmarks/remove_all')(prepare(sizes))
  .on('complete', log)
  .run(true);

require('./benchmarks/count')(prepare(sizes))
  .on('complete', log)
  .run(true);

require('./benchmarks/sum')(prepare(sizes))
  .on('complete', log)
  .run(true);

require('./benchmarks/keys')(prepare(sizes))
  .on('complete', log)
  .run(true);
