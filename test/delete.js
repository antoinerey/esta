var test  = require('tape');
var chalk = require('chalk');
var faker = require('faker');

var C = require('../lib/create.js');
var R = require('../lib/read.js');
var D = require('../lib/delete.js');

test(chalk.cyan('DELETE a Record'), function (t) {
  var record = {
    type: 'tweet',
    index: 'twitter',
    id: Math.floor(Math.random() * (1000000)),
    message: faker.hacker.phrase()
  }

  var rec = {}; // make a copy of rec for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key] = record[key];
    }
  }
  C.create(record, function(err, res) {
    D.del(rec, function(err3, res3) {
        t.equal(res3.found, true, chalk.green("✓ Record Existed - So Delete it!"));
        t.equal(err3, null, chalk.green("✓ No Errors Deleting"));
      // attempt to read record - it should fail
      R.read(rec, function(err4, res4){
        t.equal(res4.found, false, chalk.green("✓ Record Deleted"));
        t.end();
      })
    });
  });
});