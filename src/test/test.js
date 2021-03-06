const assert = require('assert');
const fs = require('fs');
const logbuilder = require('../logbuilder'); 
const eventlog = require('../eventlog');
const tracelog = require('../tracelog');
const workflow = require('../workflow');



describe('Event', function() {

    let event = null;
  
    beforeEach(function() {
      event = new eventlog.Event(0000001);
      event.addAttribute(1, "nome", "Paolo");
      event.addAttribute(2, "cognome", "Anedda");
      event.addAttribute(3, "timestamp", "2020-11-27T10:56:45.694Z");
    });
  
    it('getAttributeByName', function() {
      let nameAttribute = event.getAttributeByName("nome");
      assert.strictEqual(nameAttribute.id, 1);
      assert.strictEqual(nameAttribute.name, "nome");
      assert.strictEqual(nameAttribute.value, "Paolo");
    });
}); 

describe('Trace', function() {
    let trace;
    
    beforeEach(function() {
      trace = new eventlog.Trace(1);
      let event1 = new eventlog.Event(2);
      event1.addAttribute(3, "name", "Paolo");
      event1.addAttribute(4, "surname", "Anedda");
      event1.addAttribute(5, "timestamp", "2020-11-27T10:56:45.694Z");
      let event2 = new eventlog.Event(6);
      event2.addAttribute(7, "name", "Luke");
      event2.addAttribute(8, "surname", "Skywalker");
      event2.addAttribute(9, "timestamp", "2020-11-27T10:57:45.694Z");
      let event3 = new eventlog.Event(10);
      event3.addAttribute(11, "name", "Anakyn");
      event3.addAttribute(12, "surname", "Skywalker");
      event3.addAttribute(13, "timestamp", "2020-11-27T10:58:45.694Z"); 
      trace.addEvent(event1);
      trace.addEvent(event2);
      trace.addEvent(event3);     
    });

    it('Trace.getAttributeValuesByName', function() {
      let attributeValues = trace.getAttributeValuesByName("name");
      assert.strictEqual(attributeValues.length, 3);
      assert.strictEqual(attributeValues[0], "Paolo");
      assert.strictEqual(attributeValues[1], "Luke");
      assert.strictEqual(attributeValues[2], "Anakyn");
    });

    it('Trace.getAttributeSignature', function() {
      let attributeSignature = trace.getAttributeSignature("name");
      let expectedAttributeSignature = "Paolo;Luke;Anakyn;";
      assert.strictEqual(attributeSignature, expectedAttributeSignature);
    });
});

describe('logbuilder', function() {

  let parameterList;
  let logContent;
  let events;

  beforeEach(function() {
    parameterList = "timestamp;type;node_description;node_name;carrier_id;sample_id";
    logContent = "\"2020-11-27T10:56:45.694Z\";\"dream.uif.tube-log-request\";node_a;a;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:46.694Z\";\"dream.uif.tube-log-request\";node_b;b;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:47.694Z\";\"dream.uif.tube-log-request\";node_c;c;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:48.694Z\";\"dream.uif.tube-log-request\";node_d;d;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:45.694Z\";\"dream.uif.tube-log-request\";node_a;a;;\"016405064502\"\n"+
      "\"2020-11-27T10:56:46.694Z\";\"dream.uif.tube-log-request\";node_b;b;;\"016405064502\"\n"+
      "\"2020-11-27T10:56:47.694Z\";\"dream.uif.tube-log-request\";node_c;c;;\"016405064502\"\n"+
      "\"2020-11-27T10:56:48.694Z\";\"dream.uif.tube-log-request\";node_d;d;;\"016405064502\"";
      events = logbuilder.createEventLog(logContent, parameterList);
  });

    it('tokenizeBadLogLine', function() {
      // arrange...
      const badLine = "prova";
      // act...
      let badAnswer = logbuilder.tokenizeLine(badLine);
      // assert...
      assert.strictEqual(badAnswer.length, 1);
    });
    
    it('tokenizeGoodLogLine', function() {
      const goodLine = "\"2020-11-27T10:56:45.694Z\";\"dream.uif.tube-log-request\";;;;\"016405064501\"";
      let goodAnswer = logbuilder.tokenizeLine(goodLine);
      assert.strictEqual(goodAnswer.length, 6);
    });

    it('parseEventLogLine', function() {
      const line = "\"2020-11-27T10:56:45.694Z\";\"dream.uif.tube-log-request\";;;;\"016405064501\"";
      let result = logbuilder.parseEventLogLine(line, parameterList);
      assert.strictEqual(result.attributes.length, 6);
    });
    
    it('parseLogFile', function() {
      const filename = "./test.csv";
      const fileContent = "\"2020-11-27T10:56:45.694Z\";\"dream.uif.tube-log-request\";;;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:46.694Z\";\"dream.uif.tube-log-request\";;;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:47.694Z\";\"dream.uif.tube-log-request\";;;;\"016405064501\"";
      try {
        const data = fs.writeFileSync(filename, fileContent)
        //file written successfully
      } catch (err) {
        console.error(err)
      }
      let lines = logbuilder.parseLogFile(filename, parameterList);
      assert.strictEqual(lines.length, 3);
    });

    it('createEventLog', function() {
      assert.strictEqual(events.length, 8);
      assert.strictEqual(events[0].attributes[0].name, "timestamp");
      assert.strictEqual(events[0].attributes[0].value, "2020-11-27T10:56:45.694Z");
      assert.strictEqual(events[0].attributes[1].name, "type");
      assert.strictEqual(events[0].attributes[1].value, "dream.uif.tube-log-request");
    });

    it('createTracesFromId', function() {
      let traces = logbuilder.createTraces(events, "sample_id");
      assert.strictEqual(traces.length, 2);
    });

    it('createTracesFromId.countEvents', function() {
      let traces = logbuilder.createTraces(events, "sample_id");
      let traceA = traces[0].events;
      assert.strictEqual(traceA.length, 4);
    });

    it('createTracesFromDescription', function() {
      let traces = logbuilder.createTraces(events, "node_description");
      assert.strictEqual(traces.length, 4);
    });

    it('compareTraces', function() {
      let traces = logbuilder.createTraces(events, "sample_id");
      let result = logbuilder.compareTraces(traces[0], traces[1]);
      assert.strictEqual(result, false);
    });

    it('compareTracesByAttribute', function() {
      let traces = logbuilder.createTraces(events, "sample_id");
      let result = logbuilder.compareTracesByAttribute(traces[0], traces[1], "carrier_id");
      assert.strictEqual(result, true);
    });

    it('compareTracesByAttributeSignature', function() {
      let traces = logbuilder.createTraces(events, "sample_id");
      let result = logbuilder.compareTracesByAttributeSignature(traces[0], traces[1], "carrier_id");
      assert.strictEqual(result, true);
    });
  
});

describe('tracelog', function() {

  let parameterList;
  let logContent;
  let traces;
  
  beforeEach(function() {
    parameterList = "timestamp;type;node_description;node_name;carrier_id;sample_id";
    logContent = "\"2020-11-27T10:56:45.694Z\";\"dream.uif.tube-log-request\";node_a;a;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:46.694Z\";\"dream.uif.tube-log-request\";node_b;b;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:47.694Z\";\"dream.uif.tube-log-request\";node_c;c;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:48.694Z\";\"dream.uif.tube-log-request\";node_d;d;;\"016405064501\"\n"+
      "\"2020-11-27T10:56:45.694Z\";\"dream.uif.tube-log-request\";node_a;a;;\"016405064502\"\n"+
      "\"2020-11-27T10:56:46.694Z\";\"dream.uif.tube-log-request\";node_b;b;;\"016405064502\"\n"+
      "\"2020-11-27T10:56:47.694Z\";\"dream.uif.tube-log-request\";node_c;c;;\"016405064502\"\n"+
      "\"2020-11-27T10:56:48.694Z\";\"dream.uif.tube-log-request\";node_d;d;;\"016405064502\"";
      events = logbuilder.createEventLog(logContent, parameterList);
      traces = logbuilder.createTraces(events, "sample_id");
  });

  it('getWorkflows', function() {
    let result = tracelog.getWorkflows(traces);
    assert.strictEqual(result.length, 1);
  });
});

describe('Workflow', function() {

  beforeEach(function() {
    
  });

  it('ActivityInstance', function() {
    let workflowInstance = new workflow.Workflow(1);
    assert.strictEqual(workflowInstance.activities.length, 0);
  });
});