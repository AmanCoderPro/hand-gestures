Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

prediction = "";

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id= "captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);

function modelLoaded() {
    console.log('model Loaded');
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LR-tH_Hdk/model.json", modelLoaded);

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }

    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction = results[0].label;

        if(results[0].label == "amzing") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }

        if(results[0].label == "best") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }

        if(results[0].label == "victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
    }
}