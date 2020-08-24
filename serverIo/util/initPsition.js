const  Graph = require('./graph')
let graph = new Graph();
class Init {
    constructor () {
        this.step = 100;
        this.width = 10000;
        this.height = 10000;
    }
    setPosition(){
        let {width,height, step} = this
        let widthSize = width/step,heightSize = height/step,positions = []
        for(let i=0;i<heightSize;i++){
            for(let t=0;t<widthSize;t++){
                positions.push({
                    x:t*step,
                    y:i*step
                })
            }
        }
        this.positions = positions
        return positions
    }
    initEdge(){
        let {positions,width,height,step} = this
        let widthSize = width/step,heightSize = height/step
        positions.forEach((v,index) => {
            graph.addVertex(index);
        });
        for(let index =0;index<positions.length;index++){
            if(index>widthSize){
                graph.addEdge(index, index - widthSize);
            }
            if(index<positions.length-widthSize){
                graph.addEdge(index, index + widthSize);
            }
            if(index%widthSize!=0){
                graph.addEdge(index, index-1);
            }
            if(index%widthSize!=99){
                graph.addEdge(index, index+1);
            }



            // for(let i=0;i<4;i++){
            //     graph.addEdge(index, 'B');
            // }
        }
        // console.log(graph,'-------')
        return graph
    }
    main(){
        this.setPosition()
        return this.initEdge()
    }
}
module.exports = Init