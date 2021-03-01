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
}

module.exports =  {
  Event : Event,
  EventAttribute : EventAttribute,
  Trace : Trace
}

