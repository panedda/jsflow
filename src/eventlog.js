class Event {
  constructor(id) {
    this.id = id;
    this.attributes = [];
  }

  addAttribute(id, name, value) {
    let attribute = new EventAttribute(id, name, value);
    this.attributes.push(attribute);
  }

  getAttributeByName(name) {
    let result = null;
    for(let i=0; i<this.attributes.length; i++) {
      if(this.attributes[i].name===name) result = this.attributes[i];
    }
    return result;
  }
}

class EventAttribute {
  constructor(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}

class Trace {
  constructor(id) {
    this.id = id;
    this.events = [];
  }

  addEvent(event) {
    this.events.push(event);
  }

  getAttributeValuesByName(attributeName) {
    try {
      let result  =  [];
      for(let i=0; i<this.events.length; i++) {
        let attribute = this.events[i].getAttributeByName(attributeName);
        result.push(attribute.value);
      }
      return result;
    } catch(err) {
      console.log("Error - getTraceByAttributeName:");
      console.log(err);
    }
  }

  getAttributeSignature(attributeName) {
    let result = "";
    
    /*
    this.events.reduce((result, event) => {
      let eventAttribute = event.getAttributeByName(attributeName);
      console.log("Event name:"+eventAttribute.name);
      result += eventAttribute.value+";";
      return result;
    });
    
    result = this.events.reduce((sign, event) => {
      let eventAttribute = event.getAttributeByName(attributeName);
      console.log("Event name:"+eventAttribute.name);
      sign += eventAttribute.value+";";
      return sign;
    });
    */
    for(let i=0; i<this.events.length; i++) {
      let attribute = this.events[i].getAttributeByName(attributeName);
      result += attribute.value+";";
    }
    return result;
  }
}

function calculateEventsInterval(endEvent, startEvent) {
  try {
    let result = 0;
    // get end time in millisecond
    let endEventTimestamp = new Date(endEvent.getAttributeByName("timestamp").value).getTime();
    // get start time in millisecond
    let startEventTimestamp = new Date(startEvent.getAttributeByName("timestamp").value).getTime();
    result = endEventTimestamp - startEventTimestamp;
    return result;
  } catch(err) {
    return 0;
  }
}

module.exports =  {
  Event : Event,
  EventAttribute : EventAttribute,
  Trace : Trace,
  calculateEventsInterval : calculateEventsInterval
}

