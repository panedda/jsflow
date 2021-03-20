const assert = require('assert');
const fs = require('fs');
const logbuilder = require('../logbuilder'); 
const workflow = require('../workflow');

describe('Workflow', function() {
    let theWorkflow;
    let theWorkflowInstance;
    let activities;
    let activityA;
    let activityAInstance;
    let activityB;
    let activityBInstance;
    let activityC;
    let activityCInstance;
    let activityD;
    let activityDInstance; 
    let events;
    let traces;
  
    beforeEach(function() {
      parameterList = "timestamp;type;node_description;node_name;carrier_id;sample_id";
      logContent = "\"2020-11-27T10:56:45.694Z\";\"dream.uif.tube-log-request\";start_a;a;;\"016405064501\"\n"+
        "\"2020-11-27T10:56:46.694Z\";\"dream.uif.tube-log-request\";stop_a;a;;\"016405064501\"\n"+
        "\"2020-11-27T10:56:47.694Z\";\"dream.uif.tube-log-request\";start_b;b;;\"016405064501\"\n"+
        "\"2020-11-27T10:56:48.694Z\";\"dream.uif.tube-log-request\";stop_b;b;;\"016405064501\"\n"+
        "\"2020-11-27T10:56:49.694Z\";\"dream.uif.tube-log-request\";start_c;c;;\"016405064501\"\n"+
        "\"2020-11-27T10:56:50.694Z\";\"dream.uif.tube-log-request\";stop_c;c;;\"016405064501\"\n"+
        "\"2020-11-27T10:56:51.694Z\";\"dream.uif.tube-log-request\";start_d;d;;\"016405064501\"\n"+
        "\"2020-11-27T10:56:52.694Z\";\"dream.uif.tube-log-request\";stop_d;d;;\"016405064501\"";
      events = logbuilder.createEventLog(logContent, parameterList);
      traces = logbuilder.createTraces(events, "sample_id");
  
      activities = [];  
      activityA = new workflow.Activity(1);
      activityA.name = "activity A";
      activityA.description = "activity A description";
      activityB = new workflow.Activity(2);
      activityB.name = "activity B";
      activityB.description = "activity B description";
      activityC = new workflow.Activity(3);
      activityC.name = "activity C";
      activityC.description = "activity C description";
      activityD = new workflow.Activity(4);
      activityD.name = "activity D";
      activityD.description = "activity D description";
      activityE = new workflow.Activity();
      activityE.name = "activity E";
      activityE.description = "activity E description";
  
      activityAInstance = new workflow.ActivityInstance(5);
      activityAInstance.activity = activityA;
      activityAInstance.startEvent = events[0];
      activityAInstance.endEvent = events[1];
      activityBInstance = new workflow.ActivityInstance(6);
      activityBInstance.activity = activityB;
      activityBInstance.startEvent = events[2];
      activityBInstance.endEvent = events[3];
      activityCInstance = new workflow.ActivityInstance(7);
      activityCInstance.activity = activityC;
      activityCInstance.startEvent = events[4];
      activityCInstance.endEvent = events[5];
      activityDInstance = new workflow.ActivityInstance(8);
      activityDInstance.activity = activityD;
      activityDInstance.startEvent = events[6];
      activityDInstance.endEvent = events[7];
  
      theWorkflow = new workflow.Workflow(1);
      theWorkflow.addActivity(activityA);
      theWorkflow.addActivity(activityB);
      theWorkflow.addActivity(activityC);
      theWorkflow.addActivity(activityD);
  
      theWorkflowInstance = new workflow.WorkflowInstance(2, theWorkflow);
      theWorkflowInstance.addActivityInstance(activityAInstance);
      theWorkflowInstance.addActivityInstance(activityBInstance);
      theWorkflowInstance.addActivityInstance(activityCInstance);
      theWorkflowInstance.addActivityInstance(activityDInstance);
    });
  
    it('ActivityInstance.getDuration', function() {
      let duration = activityAInstance.getDuration();
      assert.strictEqual(duration, 1000);
    });
  
    it('Workflow.getPosition', function() {
      let positionA = theWorkflow.getPosition(activityA);
      let positionB = theWorkflow.getPosition(activityB);
      let positionC = theWorkflow.getPosition(activityC);
      let positionD = theWorkflow.getPosition(activityD);
      let positionE = theWorkflow.getPosition(activityE);
      assert.strictEqual(positionA, 0);
      assert.strictEqual(positionB, 1);
      assert.strictEqual(positionC, 2);
      assert.strictEqual(positionD, 3);
      assert.strictEqual(positionE, -1);
    });
  });