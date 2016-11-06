# Simple demonstration of rabbitMQ message queuing

Tutorial can be found [here](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html).

## Start rabbitMQ in a container
We forward port 5672 so external producer and consumer can connect. See: [rabbitmq on docker hub](https://hub.docker.com/_/rabbitmq/) for details.
```bash
docker run -d --hostname my-rabbit -p 5672:5672 --name some-rabbit rabbitmq
```

## Run producer and consumer
First of all install the dependencies using npm.
```bash
npm install
```

### Start the producer
This will send the message that was defined as the first parameter to the queue `tasks`.
You can append a `.` to the message and the consumer will sleep for each `.`
before it accknowledges the message.
```bash
RABBIT_HOST=$(host ip) node producer.js foobar...
```

### Start the consumer
This will bind to the `tasks` queue and prints incoming messages to the console.
```bash
RABBIT_HOST=$(host ip) node consumer.js
```
