var amqp = require('amqplib/callback_api');

var msg = process.argv.slice(2).join(' ') || "Hello World!";

amqp.connect(`amqp://${process.env.RABBIT_HOST || 'localhost'}`, function(err, conn) {
  if(err) {
    console.log('Error', err);
  }
  else {
    conn.createChannel(function(err, ch) {
      var q = 'tasks';

      ch.assertQueue(q, {durable: true});
      ch.sendToQueue(q, new Buffer(msg), {persistent: true});
      console.log(" [x] Sent '%s'", msg);

      setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
  }
});
