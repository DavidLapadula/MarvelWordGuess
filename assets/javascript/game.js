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
var gameInterface = document.getElementById("game-interface"); 
var startingText = document.getElementById("starting-text");
var letterArray = [];   
var usedArray = []; 
var randomWordsUsed = [];   

function hintGenerator () {
    if (hint.innerHTML === "?") { 
        hint.innerHTML = randomHint; 
        guessesRemaining.innerHTML--; 
    } else if (guessesRemaining.innerHTML >= 1) { 
        hint.innerHTML = "You only get one!"    
    } else if (guessesRemaining.innerHTML === '') {
        hint.innerHTML = "You need to be playing!"    
    }
}       
   
    document.onkeyup = function (event) {
        
        if (event.keyCode === 13) {    
            
            var words = [ //array with objects that hold messages, guesses, and hints for the game

                {message: "Ironman's lady: Pepper", word: "pepper", hint:"Stark's Successor", picture:"assets/images/pPotts.png" }, 
                {message: "Lou Ferrigno from the Hulk", word: "ferrigno", hint:"Beast or Bodybuilder?", picture:"assets/images/ferrigno.jpg"}, 
                {message: "One of Xavier's finest, Cyclops", word: "cyclops", hint:"You get ONE guess", picture:"assets/images/cyclops.png"}, 
                {message: "Wolverine's skeletal material, adamantium", word: "adamantium", hint:"Not steel, but ..", picture:"assets/images/wolverine.jpg"}, 
                {message: "Captain America's nemesis, Hydra", word: "hydra", hint:"The first avenger's first enemy", picture:"assets/images/hydra.jpg"}, 
                {message: "Frank Castle, the punisher", word: "castle", hint:"Last name of the last guy you would fight", picture:"assets/images/castlePunisher.jpg"}, 
                {message: "Tobey Maguire", word: "maguire", hint:"Aracnid of the early 2000's", picture:"assets/images/maguire.jpg"}, 
                {message: "The Thing from Fantastic 4", word: "thing", hint:"Superhero name, or noun property", picture:"assets/images/thing.jpg"}, 
                {message: "Blazing Skull", word: "blazing", hint:"A bad headache and your skull is..", picture:"assets/images/blazing.jpg"},    
            
            ]   
 
            winsCounter.innerHTML = '0';   
            lossCounter.innerHTML = '0';

            function wordGenerator () { //function that generates a random word and fills the 'current word' bix with underlines

               if (winsCounter.innerHTML <= 4 && lossCounter.innerHTML <= 4) { //only generates a new word if the game has not been won by the user or the computer
                randomObject = words[Math.floor(Math.random() * words.length)];    
                randomWord = randomObject.word;
                randomMessage = randomObject.message; 
                randomHint = randomObject.hint;
                randomImage = randomObject.picture;  
                letterArray = [];     
                         
                             
                
                for (var i = 0; i < randomWord.length; i++) {
                    letterArray[i] = ' __ ';    
                } 

                currentWordString = letterArray.join(" ");  
                currentWord.innerHTML = currentWordString; 
                document.getElementById("guesses-remaining").innerHTML = randomWord.length * 2;  
                usedArray.length = 0;  
                usedLetters.innerHTML = ""; 

               } 
                else {
                    return; 
                }
     
            }    
 
            wordGenerator ();     

            document.onkeyup = function (event) { 
                    if (event.keyCode >= 65 && event.keyCode <= 90) { 
                        hint.innerHTML = '?';    
                        wordbubble.innerHTML = "";  
                        gameInterface.id = "";   
                        startingText.id = "game-text";      
                        var letterGuessed = event.key.toLowerCase();  
                        var correctWordArray = randomWord.split(''); 
                        if (correctWordArray.includes(letterGuessed)) {
                            wordbubble.innerHTML = "Nice!"
                            trackerImage.src = "assets/images/placeholder.jpg";
                            result.innerHTML = "";     
                        } else if (usedArray.includes(letterGuessed)) {
                            wordbubble.innerHTML = "You Tried that Already!"; 
                        } 
                        else {   
                            usedArray.push(letterGuessed); 
                            wordbubble.innerHTML = "Wrong!";  
                            guessesRemaining.innerHTML--;  
                            wrongLetters = usedArray.join(" , "); 
                            usedLetters.innerHTML = wrongLetters;   
                        } 
                            for (var i = 0; i < randomWord.length; i++) {
                                if (correctWordArray[i] === letterGuessed) {  
                                    letterArray[i] = letterGuessed;  
                                    currentGuess = letterArray.join(""); 
                                    currentWord.innerHTML = currentGuess;  
                                }      
                        }      
                         
                        trackerImage.src = "assets/images/placeholder.jpg";
                        result.innerHTML = "";  
   
                    }  

                    if (guessesRemaining.innerHTML < 1) {
                        lossCounter.innerHTML++;
                        hint.innerHTML = '?';   
                        wordbubble.innerHTML = "Point for me" 
                        wordGenerator();  
                    } else if (randomWord === currentWord.innerHTML) {
                        trackerImage.src = randomImage;  
                        hint.innerHTML = '?'; 
                        result.innerHTML = "It's " + randomMessage + " !"; 
                        winsCounter.innerHTML++;  
                        wordbubble.innerHTML = "Point for You!" 
                        wordGenerator();   
                    }   
                    if (winsCounter.innerHTML >= 5) {
                        trackerImage.src = "assets/images/marvel-win.jpg";
                        result.innerHTML = "It was " + randomMessage + " !";  
                        hint.innerHTML = '';      
                        wordbubble.innerHTML = "That's 5! You win! Marvel wiz!";
                        currentWord.innerHTML = ''; 
                        guessesRemaining.innerHTML = '';    

                    } else if (lossCounter.innerHTML >= 5) { 
                        trackerImage.src = "assets/images/you-lose.jpg";
                        result.innerHTML = "Nice Try!"; 
                        hint.innerHTML = '';   
                        wordbubble.innerHTML = "Press Play again for a do-over"; 
                        currentWord.innerHTML = ''; 
                        guessesRemaining.innerHTML = '';  
                    }    
  
                }    
            }     
        }      
             

