const assert = require('assert');
const { DiGraph, Edge } = require('../digraph');
const digrah = require('../digraph'); 

describe('DiGraph', function() {
    let dgraph;
    let nodeA, nodeB, nodeC, nodeD, nodeE;
    let edgeAB, edgeAC, edgeBD, edgeCD;
  
    beforeEach(function() {
        dgraph = new digrah.DiGraph();
        let id = 0;
        nodeA = new digrah.Node(id++, "nodeA", "nodeA description");
        nodeB = new digrah.Node(id++, "nodeB", "nodeB description");
        nodeC = new digrah.Node(id++, "nodeC", "nodeC description");
        nodeD = new digrah.Node(id++, "nodeD", "nodeD description");
        nodeE = new digrah.Node(id++, "nodeE", "nodeE description");
        dgraph.addNode(nodeA);
        dgraph.addNode(nodeB);
        dgraph.addNode(nodeC);
        dgraph.addNode(nodeD);
        edgeAB = new digrah.Edge(id++, "A->B", "A->B Value", nodeA, nodeB);
        edgeAC = new digrah.Edge(id++, "A->C", "A->C Value", nodeA, nodeC);
        edgeBD = new digrah.Edge(id++, "B->D", "B->D Value", nodeB, nodeD);
        edgeCD = new digrah.Edge(id++, "C->D", "C->D Value", nodeC, nodeD);
        dgraph.addEdge(edgeAB);
        dgraph.addEdge(edgeAC);
        dgraph.addEdge(edgeBD);
        dgraph.addEdge(edgeCD);
    });
  
    it('adjacent', function() {
        let adj = dgraph.adjacent(nodeA);
        assert.strictEqual(adj.length, 0);
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
  });