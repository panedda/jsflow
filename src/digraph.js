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
      this.edgeVertexes = [];
    }
  
    addEdge(edge) {
        if(this.getEdgePosition(edge)!=-1) 
            throw new EdgeAlreadyExists(edge);        
        this.edges.push(edge);
        /*
        let startNodePosition = this.getNodePosition(edge.startNode);
        let endNodePosition = this.getNodePosition(edge.endNode);
        this.edgeVertexes.push([edge.id, startNodePosition, endNodePosition]);
        */
        return 1;
    } 

    addNode(node) {
        if(this.getNodePosition(node)!=-1) 
            throw new NodeAlreadyExists(node);        
        this.nodes.push(node);
        return 1;
    }

    getAdjacencyList(node) {
        let result = [];
        for(let e=0; e<this.edges.length; e++) {
            if(this.edges[e].startNode === node) {
                result.push(this.edges[e].endNode);
            }
        }
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

    getEdgePosition(edge) {
        for(let i=0; i<this.edges.length; i++) {
            if((this.edges[i].id === edge.id)
              && (this.edges[i].name === edge.name)
              && (this.edges[i].value === edge.value)) return i;
          }
        return -1;
    }
}

class NodeAlreadyExists extends Error {
    constructor(node, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }
        this.id = node.id;
        this.name = node.name;
        this.value = node.value;
    }
}

class EdgeAlreadyExists extends Error {
    constructor(edge, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }
        this.id = edge.id;
        this.name = edge.name;
        this.value = edge.value;
    }
}

module.exports =  {
    Node : Node,
    Edge : Edge,
    DiGraph : DiGraph,
    NodeAlreadyExists : NodeAlreadyExists,
    EdgeAlreadyExists : EdgeAlreadyExists
}