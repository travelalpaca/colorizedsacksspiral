let primes
let primeArr=[]
const itLimit = 664579; //quantity of primes under 10,000,000
let iterations = 15000;
let rMult = 1.8
let lightson = 00; // Specify in percent.

function preload(){
  primes = loadJSON('primes_to_10,000,000.json')
}

function setup() {
  createCanvas(2560, 1440, WEBGL);
  //noLoop()
  colorMode(HSB)
  smooth()
  orbitControl(6,6);

  for(const obj in primes){
    primeArr[obj] = new PrimePt(primes[obj])
  }

  print('Keyboard controls: \npress D/A to increase/decrease quantity of primes displayed.  \nPress W/X to increase decrease proportion of randomly illuminated primes.  \nPress S to save PNG.  \nPress L to toggle the draw loop.')
  print(`Currently displaying ${iterations} primes`)
  print(`${lightson}% of lights are currently on.`)
}

function draw() {
  orbitControl(6,6);
  background(20);

  noStroke()
  fill(240,30,100,0.33) //base color
  for(let i=0;i<iterations;i++){
    push()
    translate(primeArr[i].x,primeArr[i].y)
    if(ceil(random()*100)<=lightson){
      fill(87,65,100,0.95) //lights-on color
    }

    sphere(2)
    pop()
  }

}

class PrimePt {
  constructor(p) {
  this.p = p;
  this.theta = TAU*sqrt(p)
  this.r = sqrt(p)*rMult
  this.x = this.r*cos(this.theta)
  this.y = -this.r*sin(this.theta)
  }
}

function keyPressed() {
  //print(keyCode)
  if (keyCode === 68) { // d
    if(floor(iterations*1.3)<itLimit){
      iterations=floor(iterations*1.3);
      print(`Increased to ${iterations} primes`)
      redraw()

    }else{
      print('Displaying maximum quantity of primes in this dataset.')
    }

  } else if (keyCode === 65) { //a
    if(ceil(iterations*0.83)>10){
      iterations=ceil(iterations*.83);
      print(`Decreased to ${iterations} primes`)
      redraw()

    }else{
      print('Displaying minimum quantity of primes.')
    }
  } else if (keyCode === 83){ //s
    saveCanvas()
  } else if (keyCode === 87){ //w
    if(lightson+1>100){
      print('All lights are already on.')
    } else {
      lightson+=1
      print(`${lightson}% of lights are now on.`)
    }
  } else if (keyCode === 88){ //x
    if(lightson-1<0){
      print('All lights are already off.')
    } else {
      lightson-=1
      print(`${lightson}% of lights are now on.`)
    }
  } else if (keyCode === 76){ //l
    if(isLooping()){
      noLoop();
      print('Draw loop has been toggled off.')
    }else{
      loop();
      print('Draw loop has been toggled on.')
    }
  }

}
