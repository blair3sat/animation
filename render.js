// Make an instance of two and place it on the page.
var elem = document.getElementById('two');
var params = { width: 500, height: 500 };
var two = new Two(params).appendTo(elem);

// two has convenience methods to create shapes.
var circle = two.makeCircle(72, 100, 50);
var rect = two.makeRectangle(213, 100, 100, 100);

// The object returned has many stylable properties:
circle.fill = '#FF8000';
circle.stroke = 'orangered'; // Accepts all valid css color
circle.linewidth = 5;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.translation.set(two.width/2,two.height/2);
rect.rotation=Math.PI/4;
rect.scale=3;
rect.noStroke();
totalRot=two.makeGroup();
totalRot.translation.set(two.width/2,two.height/2);
totalRot.scale=0.5;
totalRot.add(rect);
// Don't forget to tell two to render everything
// to the screen
two.bind("update",(frameCount)=>{
totalRot.rotation+=Math.PI/60;
}).play();
