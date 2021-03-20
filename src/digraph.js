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

module.exports =  {
    Node : Node,
    Edge : Edge,
    DiGraph : DiGraph
}