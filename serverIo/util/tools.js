
const Queue = require('./queue')
const Stack = require('./stack')
let that = null
class Tools {
    constructor() {
        if (that)
            return that
        that = this
        this.Colors = {
            WHITE: 0,
            GREY: 1,
            BLACK: 2
        };
    }
    initializeColor(vertices) {
        let color = {};
        vertices.forEach(v => color[v] = this.Colors.WHITE);
        return color;
    }
    breadthFirstSearch(graph, startVertex, callback) {
        let vertices = graph.getVertices();
        let adjList = graph.getAdjList();
        let color = this.initializeColor(vertices);
        let queue = new Queue();

        queue.enqueue(startVertex);

        while (!queue.isEmpty()) {
            let u = queue.dequeue();
            adjList.get(u).forEach(n => {
                if (color[n] === this.Colors.WHITE) {
                    color[n] = this.Colors.GREY;
                    queue.enqueue(n);
                }
            });


            color[u] = this.Colors.BLACK;
            if (callback) callback(u);
        }
    }
    findPath(graph, startVertex, endVertex) {
        let shortestPathA = this.BFS(graph, startVertex);
        let vertices = graph.getVertices();

        let path = new Stack();
        for (let v2 = endVertex; v2 !== startVertex; v2 = shortestPathA.predecessors[v2]) {
            path.push(v2);
        }

        path.push(startVertex);
        let s = path.pop();
        while (!path.isEmpty()) {
            s += ` - ${path.pop()}`;
        }
        return s

    }
    findPathNextPoint(graph, startVertex, endVertex){
        let shortestPathA = this.BFS(graph, startVertex);
        let vertices = graph.getVertices();

        let path = new Stack();
        for (let v2 = endVertex; v2 !== startVertex; v2 = shortestPathA.predecessors[v2]) {
            path.push(v2);
        }
        let s = path.pop();
        return s
    }
    BFS(graph, startVertex) {
        let vertices = graph.getVertices();
        let adjList = graph.getAdjList();
        let color = this.initializeColor(vertices);
        let queue = new Queue();
        let distances = {};
        let predecessors = {};

        queue.enqueue(startVertex);

        // 初始化所有顶点的距离为0，前置节点为null
        vertices.forEach(v => {
            distances[v] = 0;
            predecessors[v] = null;
        });

        while (!queue.isEmpty()) {
            let u = queue.dequeue();
            adjList.get(u).forEach(n => {
                if (color[n] === this.Colors.WHITE) {
                    color[n] = this.Colors.GREY;
                    distances[n] = distances[u] + 1;
                    predecessors[n] = u;
                    queue.enqueue(n);
                }
            });


            color[u] = this.Colors.BLACK;
        }

        return { distances, predecessors };
    };
}
module.exports = Tools