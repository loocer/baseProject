import './js/libs/weapp-adapter'
import './js/libs/symbol'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
import Main from './js/main'
import {
  loadingImage
} from './js/utils/common'

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
    if (res.platform == 'ios') {
      flag = true
    }
  }
})
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
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
// engine.velocityIterations = 19
//   engine.world.gravity.x = 355;
// engine.world.gravity.y = 125;
// engine.world.gravity.isPoint = true;
// engine.timing.timeScale= 1.2


// world.gravity.y = 1;
// create renderer
var render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: width,
    height: height,
    showAngleIndicator: true,
    showCollisions: true,
    showVelocity: true
  }
});
Render.setPixelRatio(render, window.devicePixelRatio)
// Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var group = Body.nextGroup(true);
var catapult = Bodies.rectangle(screenWidth / 2, screenHeight - 50, 320, 10, {
  isStatic: true,
  collisionFilter: {
    group: group
  },
});
let cicyl = Bodies.circle(screenWidth / 2, screenHeight - 200, 10, {
  isStatic: true,
  density: 10,
})
// let rect = Bodies.rectangle(250, 555, 20, 50, {
//   isStatic: true
// })
World.add(world, [
  catapult,
  cicyl,
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.1,
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
    // world.gravity.x = 1*(res.gamma/90);
    Body.setAngle(catapult, Math.PI / 90 * res.gamma);
    // main.physics.gan.update(catapult)
    // main.physics.ball.update(cicyl)
  } else {
    // world.gravity.x = -1*(res.gamma/90);
    Body.setAngle(catapult, -Math.PI / 90 * res.gamma);
    // main.physics.gan.update(catapult)
    // main.physics.ball.update(cicyl)
  }

  // console.log(res)
})
Events.on(engine, 'collisionActive', function () {
  //物理引擎和游戏引擎坐标同步
  // coordSync(engine, stage);
  // main.physics.gan.update(catapult)
  // main.physics.ball.update(cicyl)
});
databus.engGan = catapult
databus.engBall = cicyl
databus.world = world
databus.runner = runner
databus.engine = engine
loadingImage()
main.init()