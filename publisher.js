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
    const msg = "Lote de mensagem";

    channel.assertExchange(exchange, 'fanout', {
      durable: false
    });
    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});