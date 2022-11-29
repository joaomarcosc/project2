const amqp = require('amqplib/callback_api');

amqp.connect('amqps://nslgrtpn:Lmn7tXxCA4_pGyTzSHQH5rd5ebEjXam6@jackal.rmq.cloudamqp.com/nslgrtpn', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const exchange = 'filial';

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    channel.assertQueue('', {
      exclusive: true
    }, function (error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(" [*] Aguardando dados %s. Pressione CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');

      channel.consume(q.queue, function (msg) {

        console.log(`[x] ${msg.content.toLocaleString()}`);

      }, {
        noAck: true
      });
    });
  });
});