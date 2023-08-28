

function modelLoaded(){
    console.log(ml5.version);
}

function stop(){
    document.getElementById("hearing").style.display = "none";
    document.getElementById("btnstart").style.display = "inline";
    document.getElementById("start").style.display = "none";
}

function hear(){
    document.getElementById("hearing").style.display = "inline";
    document.getElementById("btnstart").style.display = "none";
    document.getElementById("start").style.display = "inline";
    
    navigator.mediaDevices.getUserMedia({audio : true});
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/dptunI12R/model.json",modelLoaded);
    classifier.classify(gotResult)

}

function gotResult(error, result){
    if(error)
    console.error(error)
    else{
        console.log(result);
        document.getElementById("voice").innerHTML = cap(result[0].label);
        
        id1 = document.getElementById("dog")
        id2 = document.getElementById("cat")
        bg = "";
        
        r = Math.floor(Math.random()*255)+1;
        g = Math.floor(Math.random()*255)+1;
        b = Math.floor(Math.random()*255)+1;
        
        document.getElementById("heading").style.backgroundColor = 'rgb('+r+','+g+','+b+')';
        document.getElementById("developer").style.backgroundColor = 'rgb('+b+','+r+','+g+')';
        document.getElementById("stop").style.backgroundColor = 'rgb('+g+','+b+','+r+')';

        for(n = 0; n <= 2; n++ ){
            which = result[n].label;
            switch(which){
                case "dog":
                    id1.innerHTML = Math.floor(result[n].confidence*100)+"%";
                    bg = "url('dog.png');";

                    break;
                case "cat":
                    id2.innerHTML = Math.floor(result[n].confidence*100)+"%";
                    bg = "url('cat.jpg');";

                    break;
                case "background noice":
                    console.log("background noice index : "+n);
                    bg = "url('bg.jpg');";
                    break;
            }
        }
        document.querySelector("body").style.backgroundImage = bg;
    }
    
}
function cap(word){
    word = word.toString();
    word = word.charAt(0).toUpperCase()+word.slice(1);
    return word;
}