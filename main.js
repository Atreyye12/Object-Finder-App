video = "";
status = "";
function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
  
    canvas = createCanvas(550, 550);
    canvas.position(560,150);
  
    
  }
function draw(){
    image(video, 0, 0, 480, 380);
    if(status !=""){
        objectDetector.detect(gotResults);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected" + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            nofill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object = results;
    }
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
