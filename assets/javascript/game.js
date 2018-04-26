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
var letterArray = [""];   
var usedArray = [""];     

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
              

            wordGenerator ();   

                document.onkeyup = function (event) { 
                wordbubble.innerHTML = "";  
                gameInterface.id = ""; 
                startingText.id = "game-text";      
                var letterGuessed = event.key; 
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
                
                if (guessesRemaining.innerHTML < 1) {
                    wordGenerator();  
                    console.log(currentWord.innerHTML); 
                    lossCounter.innerHTML++;
                    wordbubble.innerHTML = "Point for me"
                } else if (randomWord === currentWord.innerHTML) {
                    trackerImage.src = randomImage; 
                    result.innerHTML = "It's " + randomMessage + " !"; 
                    wordGenerator();   
                    winsCounter.innerHTML++;  
                    wordbubble.innerHTML = "Point for You!" 

                }  
                if (winsCounter.innerHTML >= 5) {
                    trackerImage.src = "assets/images/marvel-win.jpg";
                    result.innerHTML = " You Win!";  
                    wordbubble.innerHTML = "You're a Marvel wiz"; 

                } else if (lossCounter.innerHTML >= 5) {
                    trackerImage.src = "assets/images/you-lose.jpg";
                    result.innerHTML = " You lose!";  
                    wordbubble.innerHTML = "Press Play again for a do-over"; 
                } 
            }     
        }    
    }         

