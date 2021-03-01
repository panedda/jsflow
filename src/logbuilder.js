const fs = require('fs');
const { Trace } = require('./eventlog');
const eventlog = require('./eventlog');

function trimQuotations(x) {
    return x.replace(/^"+|"+$/gm,'');
}

function generateUID() {
    // return a uuidv4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function tokenizeLine(line, separator=";") {
    try {
        let result = line.split(separator).map(s => trimQuotations(s));
        return result;
    } catch (err) {
        console.log("Error while parsing the line: "+line);
        console.error(err);
    }
}

function parseEventLogLine(line, parameterList, separator=";") {
    try {
        let parameterNames = tokenizeLine(parameterList, separator);
        let parameterValues = tokenizeLine(line, separator);
        let result = new eventlog.Event(generateUID());
        for(let i=0; i<parameterNames.length; i++) {
            result.addAttribute(new eventlog.EventAttribute(generateUID(), parameterNames[i], parameterValues[i]));
        }
        return result;
    } catch (err) {
        console.log("Error while parsing the line: "+line);
        console.error(err);
    }
}

function parseLogFile(filename, parameterList, separator=";") {
    try {
        let result = [];
        const data = fs.readFileSync(filename, 'utf8');
        result = createEventLog(data, parameterList, separator);
        return result;
    } catch (err) {
        console.log("Error while reading: "+filename);
        console.error(err);
    }
}

function createEventFromLogLine(logLine, parameterList, separator=";") {
    try {
        let result = new eventlog.Event(generateUID());
        let parameterNames = tokenizeLine(parameterList, separator);
        let parameterValues = tokenizeLine(logLine, separator);
        for(let i=0; i<parameterNames.length; i++) {
            result.addAttribute(generateUID(),parameterNames[i],parameterValues[i]);
        }
        return result;
    } catch(err) {
        console.log("Error while creating the EventLog from LogLine: "+logLine);
        console.error(err);
    }
}

function createEventLog(log, parameterList, separator=";") {
    try {
        let result = [];
        const lines = log.split(/\r?\n/);
        result = lines.map((line) => {
            return createEventFromLogLine(line, parameterList, separator);
        });
        return result;
    } catch (err) {
        console.log("Error while creating the EventLog: ");
        console.error(err);
    }
}

function createTraces(events, traceIdParameter) {
    try {
        let result = [];
        events.map(event => {
            let key = event.getAttributeByName(traceIdParameter).value;
            let found = false;
            result.filter(trace => trace.id === key).map(trace => {trace.addEvent(event); found= true});
            if(!found) {
                let trace = new Trace(key);
                trace.addEvent(event);
                result.push(trace);
            }
        });
        return result;
    } catch(err) {
        console.log("Error while creating the Traces: ");
        console.error(err);
    }
}

function compareTraces(traceA, traceB) {
    try {
        if(traceA.events.length!=traceB.events.length) return false;
        else {
            for(let i=0; i<traceA.events.length; i++) {
                if(traceA.events[i].attributes.length!=traceB.events[i].attributes.length) return false;
                else {
                    for(let j=0; j<traceA.events[i].attributes.length; j++) {
                        if(traceA.events[i].attributes[j].name!=traceB.events[i].attributes[j].name || 
                            traceA.events[i].attributes[j].value!=traceB.events[i].attributes[j].value) return false;
                    }
                }
            }
            return true;
        }
    } catch(err) {
        console.log("Error while comparing the Traces: ");
        console.error(err);
    }
}

function compareTracesByAttribute(traceA, traceB, attributeName) {
    try {
        if(traceA.events.length!=traceB.events.length) return false;
        else {
            for(let i=0; i<traceA.events.length; i++) {
                let attributeA = traceA.events[i].getAttributeByName(attributeName);
                let attributeB = traceB.events[i].getAttributeByName(attributeName);
                if(!attributeA || !attributeB || attributeA.value!=attributeB.value) return false;
            }
            return true;
        }
    } catch(err) {
        console.log("Error while comparing the Traces by Attribute: ");
        console.error(err);
    }
}

module.exports =  {
    tokenizeLine : tokenizeLine,
    parseEventLogLine : parseEventLogLine,
    parseLogFile : parseLogFile,
    createEventLog : createEventLog,
    createTraces : createTraces,
    compareTraces : compareTraces,
    compareTracesByAttribute : compareTracesByAttribute
}
