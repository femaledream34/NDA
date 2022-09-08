status="true";
song="";
img="";
object=[];
function preload()
{
song=loadSound("invasion.mp3");
}

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
        objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}

function draw()
{
    image(video,0,0,380,380);
    if(status!="") 
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult)
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="status:object detected";
                       fill(r,g,b);
            percent=floor(object[i].confidence*100);
            stroke(r,g,b);
            noFill();
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="baby found";
                console.log("stop");
                song.stop();
            }
        else{
            document.getElementById("number_of_objects").innerHTML="baby not found";
                console.log("play");
                song.play();
        }
        }
        if(object.length==0)
{
    document.getElementById("number_of_objects").innerHTML="baby not found";
    console.log("play");
    song.play();
}    
}
 }
function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
   
}
function gotResult(error,results)
{
if(error){
    console.log(error)
}
console.log(results);
object=results;

}
