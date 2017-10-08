// fortune's algorithm completed with aid from
// http://www.ams.org/samplings/feature-column/fcarc-voronoi


var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height= window.innerHeight;
var nodes_count = 50;
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

function get_y(fx, fy, d, x){
  return (Math.pow(x-fx,2) + Math.pow(fy, 2) - Math.pow(d, 2))/(2*(fy-d));
  // return 0;
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
//
function push_node(x_, y_) {
  var node = {
    x: x_,
    y: y_,
    radius: 5,
    x_vel: 0, 
    y_vel: 0
  };

  nodes.push(node);
}

// push_node(100, 100);
// push_node(150, 50);
// push_node(200, 100);

nodes.sort(function(a, b) {
    return b.y < a.y;
});

// see: 
// http://www.paul-reed.co.uk/site.htm
function parabola_intersection(p1, x1, y1, p2, x2, y2) {
  var a, b, c;
  var a = 1 / (4 * p1) - 1 / (4 * p2);
  var b = -x1 / (2 * p1) + x2 / (2 * p2);
  var c = Math.pow(x1, 2) / (4 * p1) - y1 - (Math.pow(x2, 2) / (4 * p2) - y2);
  var d = Math.sqrt(Math.pow(b, 2) - 4 * a * c);
  return [(-b + d) / (2 * a), (-b - d) / (2 * a)];
}

function draw() {
  ctx=canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height= window.innerHeight;

  var directrix = (counter += 0.5);
  // var directrix = 0;

  for (i = 0; i < nodes.length; i++) {
    // get the two x coordinates
    //
    // get parabolic intersections between ordered parabolas
    // the node  
    var y0 = 0;
    var x0 = nodes[i].x - get_x(nodes[i].y, directrix, y0);
    var y1 = 0;
    var x1 = nodes[i].x + get_x(nodes[i].y, directrix, y1); //add the focus before the function

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

  for (i = 0; i < nodes.length - 1; i++)
  {
    var n1 = nodes[i]; // the focus of the V
    var v1_x = n1.x;
    var v1_y = (n1.y + directrix)/2;
    var p1 = directrix - v1_y;
    
    var n2 = nodes[i+1];
    var v2_x = n2.x;
    var v2_y = (n2.y + directrix)/2;
    var p2 = directrix - v2_y;

    if (p1 > 0){
      [xa,xb] = parabola_intersection(p1, v1_x, v1_y, p2, v2_x, v2_y);
      // console.log(parabola_intersection(p1, v1_x, v1_y, p2, v2_x, v2_y));
      // draw intersection points 
      ctx.beginPath();
      ctx.arc(xa, get_y(n1.x, n1.y, directrix, xa), 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#FF0000';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(xb, get_y(n1.x, n1.y, directrix, xb), 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#FF0000';
      ctx.fill();
    }
  }
  //draw directrix line 
  ctx.beginPath();
  ctx.moveTo(0, directrix);
  ctx.lineTo(canvas.width, directrix);
  ctx.stroke();
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
