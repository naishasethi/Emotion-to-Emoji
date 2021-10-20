Prediction1="";
Prediction2="";
Webcam.set({
width:350,
height:300,
image_format:"png",
png_quality:90
});
Camera=document.getElementById("camera");
Webcam.attach(Camera);
function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_img" src="'+data_uri+'">';
    });
}
console.log("Ml5 version=",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/fpSIwh_ms/model.json',modelLoaded);
function modelLoaded() {
    console.log("Model is loaded");
}
function speak() {
    var synth=window.speechSynthesis;
    speakdata1="The first prediction is"+Prediction1;
    speakdata2="And the second prediction is"+Prediction2;
    var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterThis);
}
function check() {
    img=document.getElementById("capture_img");
    classifier.classify(img, gotresult);
}
function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        Prediction1=results[0].label;
        Prediction2=results[1].label;
        speak();
        if (results[0].label=="Happy") {
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }
        if (results[0].label=="Sad") {
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if (results[0].label=="Angry") {
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        if (results[1].label=="Happy") {
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if (results[1].label=="Sad") {
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if (results[1].label=="Angry") {
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }
}