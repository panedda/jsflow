class Node {
    constructor(id, name, value) {
        this.id = id;
        this.name = name;
        this.value = value;
    }
}
  
class Edge {
    constructor(id, name, value, snode, enode) {
      this.id = id;
      this.name = name;
      this.value = value;
      this.startNode = snode;
      this.endNode = enode;
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

    addNode(node) {
        this.nodes.push(node);
    }

    adjacent(node) {
        let result = [];
        return result;
    }

    getNodePosition(node) {
        for(let i=0; i<this.nodes.length; i++) {
            if((this.nodes[i].id === node.id)
              && (this.nodes[i].name === node.name)
              && (this.nodes[i].value === node.value)) return i;
          }
        return -1;
    }
}

module.exports =  {
    Node : Node,
    Edge : Edge,
    DiGraph : DiGraph
}