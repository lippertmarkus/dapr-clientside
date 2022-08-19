#!/usr/bin/env node
import { Kafka } from 'kafkajs';
import * as CeKafka from "cloudevents-kafka";
const { CloudEventStrict } = CeKafka;
console.log("hello!!");
const ces = new CloudEventStrict({
    specversion: "1.0" /* Version.V1 */,
    source: 'some-source',
    id: 'some-id',
    type: 'message.send',
    data: {
        orderId: "100"
    },
});
/*
{
    "data": {
        "orderId": "100"
    },
    "datacontenttype": "application/cloudevents+json",
    "id": "someCloudEventId",
    "pubsubname": "kafka-pubsub",
    "source": "testcloudeventspubsub",
    "specversion": "1.0",
    "subject": "Cloud Events Test",
    "time": "2021-08-02T09:00:00Z",
    "topic": "ping",
    "traceid": "00-fb9e1cd1bb0bc3af2348fd826198ac87-ad186ab898f855cb-01",
    "traceparent": "00-fb9e1cd1bb0bc3af2348fd826198ac87-ad186ab898f855cb-01",
    "tracestate": "",
    "type": "com.dapr.cloudevent.sent"
}
*/
let kafka = new Kafka({
    clientId: 'mypublisher',
    brokers: ['localhost:9092']
});
let producer = kafka.producer();
await producer.connect();
const messsage = CeKafka.structured(ces);
await producer.send({
    topic: 'ping',
    messages: [
        messsage,
    ],
});
