!function(t){var i={};function e(o){if(i[o])return i[o].exports;var s=i[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}e.m=t,e.c=i,e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)e.d(o,s,function(i){return t[i]}.bind(null,s));return o},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});const o=e(1);document.addEventListener("DOMContentLoaded",()=>{(new o.Simulation).start()})},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});const o=e(2),s=e(4);i.Simulation=class{constructor(){this.canvas=new s.Canvas,this.bubbles=o.Bubble.createRandomBubbles(500),this.previousTime=performance.now(),this.lag=0}start(){setInterval(()=>{this.tick()},50)}tick(){const t=performance.now(),i=t-this.previousTime;for(this.previousTime=t,this.lag+=i;this.lag>=50;)this.updateSimulation(),this.lag-=50;this.renderSimulation()}updateSimulation(){this.bubbles.forEach(t=>t.updateVelocity(this.bubbles)),this.bubbles.forEach(t=>t.updatePosition()),this.applyHotAndCold()}applyHotAndCold(){this.bubbles.sort((t,i)=>t.position.y-i.position.y);for(let t=0;t<10;t++)this.bubbles[t].coolDown(),this.bubbles[this.bubbles.length-1-t].heatUp()}renderSimulation(){this.canvas.draw(this.bubbles)}}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});const o=e(3);class s{constructor(t){this.colour="blue",this.position=t,this.velocity=new o.Vector(0,0),this.heat=20}static createRandomBubbles(t){const i=[];for(let e=0;e<t;e++)i.push(s.createRandomBubble());return i}static createRandomBubble(){const t=window.innerWidth*Math.random(),i=window.innerHeight*Math.random();return new s(new o.Vector(t,i))}updateVelocity(t){this.applyBubbleBounce(t),this.applyGravity(),this.applyWallBounce()}updatePosition(){this.applyVelocity()}heatUp(){this.heat+=.1}coolDown(){this.heat<.1||(this.heat-=.1)}applyBubbleBounce(t){this.colour="blue",t.forEach(t=>{this!==t&&this.position.distanceTo(t.position)<this.heat+t.heat&&(this.repelFrom(t.position),this.colour="red")})}repelFrom(t){const i=t.vectorTo(this.position).scaleBy(.05);this.velocity=this.velocity.add(i)}applyGravity(){this.velocity=this.velocity.add(s.gravity)}applyVelocity(){this.position=this.position.add(this.velocity),this.velocity=this.velocity.scaleBy(.99)}applyBrownian(){const t=new o.Vector(5*(Math.random()-.5),5*(Math.random()-.5));this.position=this.position.add(t)}applyWallBounce(){if(this.position.x<this.heat){const t=-2*(this.position.x-this.heat);this.position=this.position.add(new o.Vector(t,0)),this.velocity.x<0&&(this.velocity=new o.Vector(-this.velocity.x,this.velocity.y))}if(this.position.y<this.heat){const t=-2*(this.position.y-this.heat);this.position=this.position.add(new o.Vector(0,t)),this.velocity.y<0&&(this.velocity=new o.Vector(this.velocity.x,-this.velocity.y))}if(this.position.x>window.innerWidth-this.heat){const t=-2*(this.position.x+this.heat-window.innerWidth);this.position=this.position.add(new o.Vector(t,0)),this.velocity.x>0&&(this.velocity=new o.Vector(-this.velocity.x,this.velocity.y))}if(this.position.y>window.innerHeight-this.heat){const t=-2*(this.position.y+this.heat-window.innerHeight);this.position=this.position.add(new o.Vector(0,t)),this.velocity.y>0&&(this.velocity=new o.Vector(this.velocity.x,-this.velocity.y))}}}i.Bubble=s,s.gravity=new o.Vector(0,.15)},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});class o{constructor(t,i){this.x=t,this.y=i}add(t){return new o(this.x+t.x,this.y+t.y)}distanceTo(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}vectorTo(t){return new o(t.x-this.x,t.y-this.y)}scaleBy(t){return new o(t*this.x,t*this.y)}}i.Vector=o},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});i.Canvas=class{constructor(){this.canvas=document.getElementById("canvas"),this.ctx=this.canvas.getContext("2d"),this.setScreenSize()}draw(t){this.setScreenSize(),t.forEach(t=>this.drawBubble(t))}setScreenSize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}drawBubble(t){this.ctx.beginPath(),this.ctx.arc(t.position.x,t.position.y,t.heat,0,2*Math.PI),this.ctx.fillStyle=t.colour,this.ctx.fill()}}}]);