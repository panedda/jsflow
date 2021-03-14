class Workflow {
  constructor(id) {
    this.id = id;
    this.activities = [];
  }

  addActivity(id, name, description) {
    let activity = new Activity(id);
    activity.name = name;
    activity.description = description;
    this.activities.push(activity);    
  }
}

class WorkflowInstance {
  constructor(id) {
    this.id = id;
    this.activityInstances = [];
  }
}

class Activity {
  constructor(id) {
    this.id = id;
    this.name = "";
    this.description = "";
  }
}

class ActivityInstance {
  constructor(id) {
    this.id = id;
    this.activity;
    this.start = "";
    this.end = "";
  }

  getDuration() {
    return 0;
  }
}

module.exports =  {
  Workflow : Workflow,
  WorkflowInstance : WorkflowInstance,
  Activity : Activity,
  ActivityInstance : ActivityInstance
}