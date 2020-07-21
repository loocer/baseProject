const  Graph = require('./graph')
const  Init = require('./initPsition')
const  Tools = require('./tools')

let graph = new Graph();
let init = new Init()
let tools = new Tools()
// let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
// myVertices.forEach((v) => {
//     graph.addVertex(v);
// });
// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('A', 'D');
// graph.addEdge('C', 'D');
// graph.addEdge('C', 'G'); 
// graph.addEdge('D', 'G');
// graph.addEdge('D', 'H');
// graph.addEdge('B', 'E');
// graph.addEdge('B', 'F');
// graph.addEdge('E', 'I');
// console.log(init.main().toString())
// init.main()
let gr = init.main()
var timestamp=new Date().getTime()
tools.findPath(gr, 0,9999)
var timestam1p=new Date().getTime()
console.log(timestam1p-timestamp,'----')
// console.log(graph.toString());