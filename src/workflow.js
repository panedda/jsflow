const eventlog = require('./eventlog');

class Node {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}

class Edge {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.startNode;
    this.endNode;
  }
}

class DiGraph {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }

  addEdge(edge) {
    this.edges.push(edge);
  }
}

class Workflow extends DiGraph {
  constructor(id) {
    super();
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

class WorkflowInstance extends DiGraph {
  constructor(id, workflow) {
    super();
    this.id = id;
    this.workflow = workflow;
    this.activityInstances = [];
  }

  addActivityInstance(activity) {
    this.activityInstances.push(activity);    
  }
}

class Activity extends Node {
  constructor(id, name, description) {
    super();
    this._id = id;
    this._name = "";
    this._description = "";
  }

  set id(newId) {
    this._id = newId;
  }

  get id() {
    return this._id;
  }

  set name(newName) {
    this._name = newName;
  }

  get name() {
    return this._name;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  get description() {
    return this._description;
  }
}

class Relationship extends Edge {
  constructor(id) {
    super();
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
  Node : Node,
  Edge : Edge,
  DiGraph : DiGraph,
  Workflow : Workflow,
  WorkflowInstance : WorkflowInstance,
  Activity : Activity,
  ActivityInstance : ActivityInstance
}