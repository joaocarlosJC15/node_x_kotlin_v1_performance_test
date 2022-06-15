const autocannon = require('autocannon');
const { createObjectCsvWriter } = require("csv-writer");
const { randomUUID } = require("crypto");

const getRequests = () => {
    const total = 1000;

    const requests = [];

    for (let i = 0; i < total; i = i + 1) {
        requests.push({
            method: "GET",
            path: `/get/${i}`
        })
    }

    return requests;
}

const postRequests = () => {
    const total = 1000;

    const requests = [];

    for (let i = 0; i < total; i = i + 1) {
        requests.push({
            method: "POST",
            path: `/post`,
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                value1: randomUUID(),
                value2: randomUUID(),
                value3: randomUUID(),
                value4: randomUUID(),
                value5: randomUUID(),
                value6: randomUUID(),
                value7: randomUUID(),
                value8: randomUUID(),
                value9: randomUUID(),
                value10: randomUUID()
            })
        })
    }
    return requests;
}

const testGetPerformance = async (requests) => {
    const result = await autocannon(
        {
            url: 'http://ec2-44-200-226-93.compute-1.amazonaws.com:12345',
            workers: 10,
            connections: 10000,
            pipelining: 1,
            maxConnectionRequests: 1,
            amount: 10000,
            requests: requests
        }
    )
    console.log(result)
    return {
        statusCodeStats: result.statusCodeStats,
        latency: result.latency,
        requests: result.requests,
        throughput: result.throughput
    }
}

const saveResults = async (result) => {
    const latencyWriter = createObjectCsvWriter({
        path: "latency.csv",
        fieldDelimiter: ";",
        append: true,
        header: [
          {id: 'p1', title: '1%'},
          {id: 'p2_5', title: '2.5%'},
          {id: 'p10', title: '10%'},
          {id: 'p25', title: '25%'},
          {id: 'p50', title: '50%'},
          {id: 'p75', title: '75%'},
          {id: 'p90', title: '90%'},
          {id: 'p97_5', title: '97.5%'},
          {id: 'p99', title: '99%'},
          {id: 'average', title: 'Média'},
          {id: 'min', title: 'Mínimo'},
          {id: 'max', title: 'Máximo'},
          {id: 'stddev', title: 'Stddev:'},
          {id: 'totalCount', title: 'Número de requisições'}
        ]
    });

    const requestsWriter = createObjectCsvWriter({
        path: "requests.csv",
        fieldDelimiter: ";",
        append: true,
        header: [
          {id: 'p1', title: '1%'},
          {id: 'p2_5', title: '2.5%'},
          {id: 'p10', title: '10%'},
          {id: 'p25', title: '25%'},
          {id: 'p50', title: '50%'},
          {id: 'p75', title: '75%'},
          {id: 'p90', title: '90%'},
          {id: 'p97_5', title: '97.5%'},
          {id: 'p99', title: '99%'},
          {id: 'average', title: 'Média'},
          {id: 'min', title: 'Mínimo'},
          {id: 'max', title: 'Máximo'},
          {id: 'stddev', title: 'Stddev:'},
          {id: 'total', title: 'Número de requisições'}
        ]
    });

    const throughputWriter = createObjectCsvWriter({
        path: "throughput.csv",
        fieldDelimiter: ";",
        append: true,
        header: [
          {id: 'p1', title: '1%'},
          {id: 'p2_5', title: '2.5%'},
          {id: 'p10', title: '10%'},
          {id: 'p25', title: '25%'},
          {id: 'p50', title: '50%'},
          {id: 'p75', title: '75%'},
          {id: 'p90', title: '90%'},
          {id: 'p97_5', title: '97.5%'},
          {id: 'p99', title: '99%'},
          {id: 'average', title: 'Média'},
          {id: 'min', title: 'Mínimo'},
          {id: 'max', title: 'Máximo'},
          {id: 'stddev', title: 'Stddev'}
        ]
    });

    await latencyWriter.writeRecords([result.latency]);
    await requestsWriter.writeRecords([result.requests]);
    await throughputWriter.writeRecords([result.throughput]);
}

(async () => {
    const requests = postRequests();

    const result = await testGetPerformance(requests);

    await saveResults(result);
})();