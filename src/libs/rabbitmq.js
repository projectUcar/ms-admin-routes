import amqp from 'amqplib/callback_api';
import { PORT_RABBITMQ, USERNAME_RABBITMQ, PASSWORD_RABBITMQ, HOSTNAME_RABBITMQ, QUEUE } from '../config';

const rabbitSettings = {
  protocol: 'amqp',
  hostname: HOSTNAME_RABBITMQ,
  port: PORT_RABBITMQ,
  username: USERNAME_RABBITMQ,
  password: PASSWORD_RABBITMQ,
  authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
};

let channel = null;

amqp.connect(rabbitSettings, (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, ch) => {
    if (error1) {
      throw error1;
    }
    channel = ch;
    channel.assertQueue(QUEUE, {
        durable: false,
    });
  });
});

export const sendToQueue = async (queue, message) => {
  if (channel) {
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  } else {
    console.error('RabbitMQ channel not initialized');
  }
};
