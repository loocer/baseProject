import './js/libs/weapp-adapter'
import './js/libs/symbol'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
import Main from './js/main'

import DataBus from './js/databus'

import * as Matter from './js/libs/matter'


const databus = new DataBus()
const main = new Main()
let ctx = canvas.getContext('2d')
let sysInfo = wx.getSystemInfoSync(),
  width = sysInfo.windowWidth,
  height = sysInfo.windowHeight;

canvas.style.width = width + "px";
canvas.style.height = height + "px";
canvas.height = height * window.devicePixelRatio;
canvas.width = width * window.devicePixelRatio;
// ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
let flag = false
wx.getSystemInfo({
  success(res) {
    console.log(res,res.platform,res.platform == 'ios')
    if (res.platform == 'ios') {
      flag= true
    }
  }
})
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Vector = Matter.Vector,
  Events = Matter.Events;
// create engine
var engine = Engine.create(),
  world = engine.world;

// create renderer
var render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width:width,
    height:height,
    showAngleIndicator: true,
    showCollisions: true,
    showVelocity: true
  }
});
Render.setPixelRatio(render,window.devicePixelRatio)
// Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var group = Body.nextGroup(true);

var stack = Composites.stack(250, 255, 1, 6, 0, 0, function (x, y) {
  return Bodies.rectangle(x, y, 30, 30);
});
console.log('00000--',screenWidth)
var catapult = Bodies.rectangle(screenWidth / 2, screenHeight - 50, 320, 10, {
  isStatic: true,
  collisionFilter: {
    group: group
  }
});
let cicyl = Bodies.circle(screenWidth / 2, screenHeight - 200, 10, {
  density: 1
})
let rect = Bodies.rectangle(250, 555, 20, 50, {
  isStatic: true
})
World.add(world, [
  // stack,
  catapult,
  // Bodies.rectangle(400, 600, 800, 50.5, {
  //   isStatic: true
  // }),
  rect,
  Bodies.rectangle(400, 535, 20, 80, {
    isStatic: true,
    collisionFilter: {
      group: group
    }
  }),
  cicyl,
  // Constraint.create({ 
  //     bodyA: catapult, 
  //     pointB: Vector.clone(catapult.position),
  //     stiffness: 1,
  //     length: 0
  // })
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
  min: {
    x: 0,
    y: 0
  },
  max: {
    x: 800,
    y: 600
  }
});
wx.startDeviceMotionListening({
  interval: 'game'
})
wx.onDeviceMotionChange(function (res) {
  // Body.setAngle(catapult,Math.PI / 180 * (res.gamma*2));

  // main.ball.updateAngle(Math.PI / 180 * (res.gamma*2))
  if (flag) {
    Body.setAngle(catapult, Math.PI / 180 * res.gamma);
    main.physics.gan.update(catapult)
    main.physics.ball.update(cicyl)
  } else {
    Body.setAngle(catapult, -Math.PI / 180 * res.gamma);
    main.physics.gan.update(catapult)
    main.physics.ball.update(cicyl)
  }

  // console.log(res)
})
Events.on(engine, 'collisionActive', function () {
  //物理引擎和游戏引擎坐标同步
  // coordSync(engine, stage);
  main.physics.gan.update(catapult)
  main.physics.ball.update(cicyl)
});
databus.engGan = catapult
databus.engBall = cicyl
main.init()