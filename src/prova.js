const logbuilder = require('./logbuilder');

try {
    var myArgs = process.argv.slice(2);
    const parameterList = "timestamp;type;node_description;node_name;carrier_id;sample_id";
    let content = logbuilder.parseLogFile(myArgs[0], parameterList);
    console.log("Log file length: "+content.length);
    let traces = logbuilder.createTraces(content, "sample_id");
    console.log("Traces length: "+traces.length);
} catch(err) {
    console.log("Error while creating the EventLog: ");
    console.error(err);
}
