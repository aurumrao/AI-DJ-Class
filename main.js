song = "";
song1 = "";
song2 = "";
song3 = "";
song4 = "";
scoreLeftWrist = "";
scoreRightWrist = "";
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
    if(song /= ""){
    if(scoreRightWrist > 0.2){
    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Currently At Half Speed";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Currently At Normal Speed";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Currently 1 1/2 Times Speed";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 450){
        document.getElementById("speed").innerHTML = "Currently At Double Speed";
        song.rate(2);
    }
    }
    if (scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
    else{
     document.getElementById("Help-Message").innerHTML = "Sorry, there is an error. Please reload the page.";
    }
    }
    else{
      document.getElementById("Help-Message").innerHTML = "Please select a song to start.";
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
    document.getElementById("Help-Message").innerHTML = "Press play to start song, or click a different song.";
}
function choose2(){
    song.stop();
    song = song2;
    document.getElementById("Help-Message").innerHTML = "Press play to start song, or click a different song.";
}
function choose3(){
    song.stop();
    song = song3;
    document.getElementById("Help-Message").innerHTML = "Press play to start song, or click a different song.";
}
function choose4(){
    song.stop();
    song = song4;
    document.getElementById("Help-Message").innerHTML = "Press play to start song, or click a different song.";
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("Help-Message").innerHTML = "Pressing play will resume song when song is paused. When song is stopped, press play to restart song.";
}

function modelLoaded(){
    console.log("Posenet is initialized.");
}

function gotPoses(results){
    if (results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score: " + scoreLeftWrist + "; Right Wrist Score: " + scoreRightWrist);

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