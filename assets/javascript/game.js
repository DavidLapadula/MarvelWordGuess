//set global functions to dynamically change HTML
var winsCounter = document.getElementById("wins");   
var lossCounter = document.getElementById("losses");
var usedLetters = document.getElementById("used-letters");  
var guessesRemaining = document.getElementById("guesses-remaining"); 
var hint = document.getElementById("hint");   
var trackerImage = document.getElementById("tracker-image"); 
var currentWord = document.getElementById("word-at-play"); 
var result = document.getElementById("result"); 
var wordbubble = document.getElementById("word-bubble"); 
var letterArray = [""];  
var usedArray = [""];   

    document.onkeyup = function (event) {
        
        if (event.keyCode === 13) {   
            
            var words = [ //array with objects that hold words, guesses, and hints

                {message: "Ironman's lady: Pepper Potts", word: "pepper", hint:"Stark's Successor",},
                {message: "Lou Ferrigno as the Hulk", word: "ferrigno", hint:"Beast or Bodybuilder?"}, 
                {message: "one of Xavier's finest, Cyclops", word: "cyclops", hint:"You get ONE guess"}, 
                {message: "Wolverine's skeletal material, adamantium", word: "adamantium", hint:"Not steel, but .."}, 
                {message: "Captain America's nemesis, Hydra", word: "hydra", hint:"The first avenger's first enemy"}, 
                {message: "Frank Castle, the punisher", word: "castle", hint:"Last name of the last guy you would fight"}, 
                {message: "Tobey Maguire", word: "Maguire", hint:"Aracnid of the early 2000's"}, 
                {message: "The Thing", word: "thing", hint:"Superhero name, or noun property"}, 
                {message: "Blazing Skull", word: "blazing", hint:"A bad headache and your skull is.."},   
            
            ]  
 
            winsCounter.innerHTML = '0';  
            lossCounter.innerHTML = '0';
  
       
            randomObject = words[Math.floor(Math.random() * words.length)];    
            randomWord = randomObject.word;
            randomhero = randomObject.message; 
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
                var correctWordArray = randomWord.split(''); 
                if (correctWordArray.includes(letterGuessed)) {
                    wordbubble.innerHTML = "Nice!"
                } else if (usedArray.includes(letterGuessed)) {
                    wordbubble.innerHTML = "You Tried that Already!"; 
                }
                else {
                    usedArray.push(letterGuessed); 
                    wordbubble.innerHTML = "Wrong!";  
                    guessesRemaining.innerHTML--;  
                    wrongLetters = usedArray.join(" "); 
                    usedLetters.innerHTML = wrongLetters;   
                }
                    for (var i = 0; i < randomWord.length; i++) {
                        if (correctWordArray[i] === letterGuessed) {  
                            letterArray[i] = letterGuessed;  
                            currentGuess = letterArray.join("  "); 
                            currentWord.innerHTML = currentGuess;  
                        }    
                    }        
                    // if wins =< 5, display image, You win, text
                    //if losses =< 5, display nothing, different message, press play again
  
                    //if hint button pressed, remove a guess, display it 
            }    
        }    
    }    

    
   
   

