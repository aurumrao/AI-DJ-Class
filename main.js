song = "";
song1 = "";
song2 = "";
song3 = "";
song4 = "";
scoreLeftWrist = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function setup() {
    canvas = createCanvas(500,400);
    canvas.position(437, 165);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 500, 400);

    fill("#FF0000");
    stroke("#FF0000");
    if (scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}
function preload(){  
 
    song = loadSound("clubstep.mp3");
    song2 = loadSound("deadlocked.mp3");
    song3 = loadSound("hexagonForce.mp3");
    song4 = loadSound("theory.mp3");
}
function choose1(){
    song.stop();
    song = song1;
}
function choose2(){
    song.stop();
    song = song2;
}
function choose3(){
    song.stop();
    song = song3;
}
function choose3(){
    song.stop();
    song = song3;
}


function play(){
    song.setVolume(1);
    song.rate(1);
    song.play();
}

function modelLoaded(){
    console.log("Posenet is initialized.");
}

function gotPoses(results){
    if (results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score: " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist coords: (" + rightWristX +", " + rightWristY+ "); left wrist coords: ("+ leftWristX + ", " + leftWristY +")");

    }
}

function pause(){
    song.pause();
}

function stop(){
    song.stop();
}