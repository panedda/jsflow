const assert = require('assert');
const fs = require('fs');
const logbuilder = require('../logbuilder'); 
const tracelog = require('../tracelog');

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