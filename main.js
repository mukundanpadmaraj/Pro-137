objects=[];
object_status="";
object_input="";
object_found=""
function setup(){
    canvas=createCanvas(690, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide()
}
function start(){
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model has been loaded! Yaaaaaayyyyyyyy!!");
    object_status=true;
}
function gotResults(results, error){
    if(results){
        console.log(results);
        objects=results
    }
    console.error(error);
}
function draw(){
    image(video, 0, 0, 690, 500)
    if(object_status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(m=0;m<objects.length;m++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are:"+objects.length;
            fill(r,g,b);
            percentage=floor(objects[m].confidence*100);
            object_found=object[m].label;
            text(objects[m].label+" "+percent+"%", objects[m].x+15, objects[m].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[m].x, objects[m].y, objects[m].width, objects[m].height);
        }
    }
    object_input=document.getElementById("object_input").value;
    if(object_found=object_input){
        variable_name_holds_webcamLiveView.stop();
        objectDetector.detect(gotResults);
        document.getElementById("status").innerHTML="Status: Object Found";
    }
}