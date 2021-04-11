import { DiGraph, Node, Edge } from '../../digraph.js';   

class Widget {
    constructor(x, y) {
        this.x_origin = x;
        this.y_origin = y; 
    }
}

class CanvasGraph extends Widget {
    constructor(graph, x, y) {
        super(x, y);
        this.dgraph = graph;
        this.nodes = [];
        this.edges = [];
        let initialX = 50;
        let initialY = 50;
        for(let node of graph.nodes) {
            let cnode = new CanvasNode(node, initialX, initialY, 40);
            this.nodes.push(cnode);
            initialX += 150;
        }
        for(let edge of graph.edges) {
            let startNodePosition = this.dgraph.getNodePosition(edge.startNode);
            let endNodePosition = this.dgraph.getNodePosition(edge.endNode); 
            let cedge = new CanvasEdge(edge, this.nodes[startNodePosition], this.nodes[endNodePosition]);
            this.edges.push(cedge);
        }
    }

    display(context) {
        for(let node of this.nodes) node.display(context);
        for(let edge of this.edges) edge.display(context);
    }
}

class CanvasNode extends Widget {
    constructor(node, x, y, radius) {
        super(x, y);
        this.node = node;
        this.radius = radius;
    }

    display(context) {
        context.beginPath();
        context.arc(this.x_origin, this.y_origin, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.font = "14px Georgia";
        context.fillStyle = "fuchsia";
        context.fillText(this.node.name, this.x_origin-this.radius/2, this.y_origin);
    }
}

class CanvasEdge extends Widget {
    constructor(edge, startNode, endNode) {
        super();
        this.edge = edge;
        this.startNode = startNode;
        this.endNode = endNode;
        this.startX = this.startNode.x_origin;
        this.startY = this.startNode.y_origin;
        this.endX = this.endNode.x_origin;
        this.endY = this.endNode.y_origin;
        this.cpX = this.startX+(this.endX-this.startX)/2;
        //this.cpY = (this.endY-this.startY)/2;
        this.cpY = this.startY+this.startNode.radius*5;
        console.log(this.cpY);
        this.labelX = this.cpX;
        this.labelY = this.cpY/2+20;
    }

    display(context) {
        context.beginPath();
        context.moveTo(this.startX, this.startY);
        context.quadraticCurveTo(this.cpX, this.cpY, this.endX, this.endY);
        context.stroke();
        context.font = "14px Georgia";
        context.fillStyle = "fuchsia";
        context.fillText(this.edge.name, this.labelX, this.labelY);
    }
}

function createWidgetGraph(graph) {
    let result = new CanvasGraph(graph, 0, 0);
    return result;
}

function displayWidgetGraph(wgraph) {
    let ctx = document.querySelector("canvas").getContext("2d");
    wgraph.display(ctx);
}

let dgraph = new DiGraph();
let id = 0;
let nodeA = new Node(id++, "nodeA", "nodeA description");
let nodeB = new Node(id++, "nodeB", "nodeB description");
let nodeC = new Node(id++, "nodeC", "nodeC description");
let nodeD = new Node(id++, "nodeD", "nodeD description");
let nodeE = new Node(id++, "nodeE", "nodeE description");
dgraph.addNode(nodeA);
dgraph.addNode(nodeB);
dgraph.addNode(nodeC);
dgraph.addNode(nodeD);
let edgeAB = new Edge(id++, "A->B", "A->B Value", nodeA, nodeB);
let edgeAC = new Edge(id++, "A->C", "A->C Value", nodeA, nodeC);
let edgeBD = new Edge(id++, "B->D", "B->D Value", nodeB, nodeD);
let edgeCD = new Edge(id++, "C->D", "C->D Value", nodeC, nodeD);
dgraph.addEdge(edgeAB);
dgraph.addEdge(edgeAC);
dgraph.addEdge(edgeBD);
dgraph.addEdge(edgeCD);
let wgraph = createWidgetGraph(dgraph);
displayWidgetGraph(wgraph);