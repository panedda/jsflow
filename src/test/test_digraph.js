const assert = require('assert');
const { DiGraph, Edge } = require('../digraph');
const digraph = require('../digraph'); 

describe('DiGraph', function() {
    let dgraph;
    let nodeA, nodeB, nodeC, nodeD, nodeE;
    let edgeAB, edgeAC, edgeBD, edgeCD;
  
    beforeEach(function() {
        dgraph = new digraph.DiGraph();
        let id = 0;
        nodeA = new digraph.Node(id++, "nodeA", "nodeA description");
        nodeB = new digraph.Node(id++, "nodeB", "nodeB description");
        nodeC = new digraph.Node(id++, "nodeC", "nodeC description");
        nodeD = new digraph.Node(id++, "nodeD", "nodeD description");
        nodeE = new digraph.Node(id++, "nodeE", "nodeE description");
        dgraph.addNode(nodeA);
        dgraph.addNode(nodeB);
        dgraph.addNode(nodeC);
        dgraph.addNode(nodeD);
        edgeAB = new digraph.Edge(id++, "A->B", "A->B Value", nodeA, nodeB);
        edgeAC = new digraph.Edge(id++, "A->C", "A->C Value", nodeA, nodeC);
        edgeBD = new digraph.Edge(id++, "B->D", "B->D Value", nodeB, nodeD);
        edgeCD = new digraph.Edge(id++, "C->D", "C->D Value", nodeC, nodeD);
        dgraph.addEdge(edgeAB);
        dgraph.addEdge(edgeAC);
        dgraph.addEdge(edgeBD);
        dgraph.addEdge(edgeCD);
    });
  
    it('getAdjacencyList', function() {
        let adj = dgraph.getAdjacencyList(nodeA);
        assert.strictEqual(adj.length, 2);
    });

    it('getNodePosition', function() {
        let positionA = dgraph.getNodePosition(nodeA);
        let positionB = dgraph.getNodePosition(nodeB);
        let positionC = dgraph.getNodePosition(nodeC);
        let positionD = dgraph.getNodePosition(nodeD);
        let positionE = dgraph.getNodePosition(nodeE);
        assert.strictEqual(positionA, 0);
        assert.strictEqual(positionB, 1);
        assert.strictEqual(positionC, 2);
        assert.strictEqual(positionD, 3);
        assert.strictEqual(positionE, -1);
    });

    it('nodeAlreadyExists', function() {
        let gr = new digraph.DiGraph();
        let node = new digraph.Node(0, "prova", "prova");
        let response;
        try {
            response = gr.addNode(node);
            assert.strictEqual(response, 1);
        } catch(error) {
            if (error instanceof digraph.NodeAlreadyExists) {
                console.error(error.id + ";" + error.name + ";" + error.value)
            } else {
                console.error(error.message)
            }
        }
    });
  });