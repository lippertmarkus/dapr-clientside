import { Version } from 'cloudevents'
import { Kafka } from 'kafkajs'
import * as CeKafka from "cloudevents-kafka"
const { CloudEventStrict } = CeKafka

let kafka = new Kafka({
    clientId: 'mypublisher',
    brokers: ['localhost:9092']
})

let producer = kafka.producer()
await producer.connect()
await producer.send({
    topic: 'ping',
    messages: [
        CeKafka.structured(new CloudEventStrict({
            specversion: Version.V1,
            source: 'some-source',
            id: 'some-id',
            type: 'message.send',
            data: {
                orderId: "123"
            },
        })),
    ],
})