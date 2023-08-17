video = "";
objects = [];
status = '';
function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: Detecting objects';
}
function modelLoaded(){
    console.log('Model loaded')
    video.loop();
    video.volume(0);
    video.speed(1);
    status = true;
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video,0,0,480,380);
    if(status != ''){
        objectDetector.detect(video, gotResults);
        for(i = 0; i<objects.length;i++){
            document.getElementById('status').innerHTML = 'Objects detected';
            document.getElementById('number_of_objects').innerHTML = 'Number of objects detected = ' + objects.length;
            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + ' ' + percent + '%', objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}