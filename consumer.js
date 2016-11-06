var amqp = require('amqplib/callback_api');

amqp.connect(`amqp://${process.env.RABBIT_HOST || 'localhost'}`, function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'tasks';

    ch.assertQueue(q, {durable: true});

    ch.consume(q, function(msg) {
      var secs = msg.content.toString().split('.').length - 1;

      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(function() {
        ch.ack(msg);
        console.log(" [x] Done");
      }, secs * 1000);
    }, {noAck: false});
  });
});
