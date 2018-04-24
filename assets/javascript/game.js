//set global functions to dynamically change HTML
var winsCounter = document.getElementById("wins");   
var lossCounter = document.getElementById("losses"); 
var guessesRemaining = document.getElementById("guesses-remaining"); 
var hint = document.getElementById("hint");   
var trackerImage = document.getElementById("tracker-image"); 
var currentWord = document.getElementById("word-at-play"); 
var letterArray = [""]; 
var usedArray = [""];    
    document.onkeyup = function (event) {
        
        if (event.keyCode === 13) {   
            
            var words = [ //array with objects that hold words, guesses, and hints

                {hero: "Ironman", word: "pepper", hint:"Stark's Successor",},
                {hero: "Hulk", word: "ferrigno", hint:"Beast or Bodybuilder?"}, 
                {hero: "Cyclops", word: "cyclops", hint:"You get ONE guess"}, 
                {hero: "Wolverine", word: "adamantium", hint:"Not steel, but .."}, 
                {hero: "Captain America", word: "hydra", hint:"The first avenger's first enemy"}, 
                {hero: "Punisher", word: "punisher", hint:"Last name of the last guy you would fight"}, 
                {hero: "Spiderman", word: "castle", hint:"Aracnid of the early 2000's"}, 
                {hero: "The Thing", word: "thing", hint:"Superhero name, or noun property"}, 
                {hero: "Blazing Skull", word: "blazing", hint:"A bad headache and your skull is.."},   
            
            ]  

            winsCounter.innerHTML = '0';  
            lossCounter.innerHTML = '0';
  
       
            randomObject = words[Math.floor(Math.random() * words.length)];  
            randomWord = randomObject.word;
            randomhero = randomObject.hero; 
            randomHint = randomObject.hint;    
                    
                       
            
            for (var i = 0; i < randomWord.length; i++) {
                letterArray[i] = ' __ ';    
            }     
            
            currentWordString = letterArray.join(" ");  
            currentWord.innerHTML = currentWordString; 
            document.getElementById("guesses-remaining").innerHTML = randomWord.length * 2;    
                 
            document.onkeyup = function (event) {
                var letterGuessed = event.key;   
                console.log(randomWord); 
                console.log(letterGuessed); 
                var correctWordArray = randomWord.split(''); 
                    for (var i = 0; i < randomWord.length; i++) {
                        if (correctWordArray[i] === letterGuessed) {  
                            letterArray[i] = letterGuessed;  
                            currentGuess = letterArray.join(""); 
                            currentWord.innerHTML = currentGuess;  
                        }   
                    }
            }    
        }    
    }    


   
   

