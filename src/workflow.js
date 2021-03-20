const eventlog = require('./eventlog');

class Workflow {
  constructor(id) {
    this.id = id;
    this.activities = [];
    this.relationships = [];
    this.edges = [];
  }

  addActivity(activity) {
    this.activities.push(activity);    
  }

  addRelationship(relationship) {
    let startPostion = getPosition(relationship.startNode);
    let endPostion = getPosition(relationship.endNode);
    let edge = [startPostion, endPostion];
    this.relationships.push(relationship);
    this.edges.push(edge);
  }

  getPosition(activity) {
    for(let i=0; i<this.activities.length; i++) {
      if((this.activities[i].id === activity.id)
        && (this.activities[i].name === activity.name)
        && (this.activities[i].description === activity.description)) return i;
    }
    return -1;
  }
}

class WorkflowInstance {
  constructor(id, workflow) {
    this.id = id;
    this.workflow = workflow;
    this.activityInstances = [];
  }

  addActivityInstance(activity) {
    this.activityInstances.push(activity);    
  }
}

class Activity {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.description = "";
  }
}

class Relationship {
  constructor(id) {
    this.id = id;
    this.startNode;
    this.endNode;
    this.name;
    this.description;
  }
}

class ActivityInstance {
  constructor(id, activity) {
    this.id = id;
    this.activity = activity;
    this.startEvent;
    this.endEvent;
  }

  getDuration() {
    let result = 0;
    result = eventlog.calculateEventsInterval(this.endEvent, this.startEvent);
    return result;
  }
}

module.exports =  {
  Workflow : Workflow,
  WorkflowInstance : WorkflowInstance,
  Activity : Activity,
  ActivityInstance : ActivityInstance
}