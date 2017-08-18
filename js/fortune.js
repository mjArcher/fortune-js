var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var nodes_count = 15;
var nodes = [];
var counter = 0;

function getRand(min, max) {
      return Math.random() * (max - min) + min;
}

function pushNode(ax, ay) {
  var node = {
    x: ax,
    y: ay,
    radius: rad,
    x_vel: 0, 
    y_vel: 0, 
  };
  nodes.push(node);
  nodes_count+=1;
}

// get the x coordinate of a parabola given directrix position (control point)
// and focus (node)
// y = 0 always in this 
// d (y)
// f = focus

function get_x(fy, d, y) {
  return Math.sqrt(2 * (fy - d) * y + Math.pow(d, 2) - Math.pow(fy, 2));
}

function get_y(){
  return 0;
}

for(i = 0; i < nodes_count; i++){
  var node = {
    x: getRand(0,canvas.width),
    y: getRand(0,canvas.height),
    radius: 5,
    x_vel: 0, 
    y_vel: 0
  };
  nodes.push(node);
}

nodes.sort(function(a, b) {
    return b.y < a.y;
});

function parabola_intersection() {



}

function draw() {
  ctx=canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height= window.innerHeight;
  var directrix = (counter += 0.2);

  for (i = 0; i < nodes.length; i++) {

   
    // get the two x coordinates
    // the node  
    var y0 = 0;
    var x0 = nodes[i].x - get_x(nodes[i].y, directrix, y0);
    var y1 = 0;
    var x1 = nodes[i].x + get_x(nodes[i].y, directrix, y1);

    ctx.strokeStyle = "rgb(0,0,0)";
    // draw quadratic curves
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(nodes[i].x, nodes[i].y + directrix, x1, y1);
    ctx.stroke();

    // draw nodes 
    ctx.beginPath();
    ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#000000';
    ctx.fill();
  }

  //draw diretrix line 
  ctx.beginPath();
  ctx.moveTo(0, directrix);
  ctx.lineTo(canvas.width, directrix);
  ctx.stroke();
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
