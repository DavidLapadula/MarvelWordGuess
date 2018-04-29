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
var themeSong = document.getElementById("theme-song");
var gameSwitch = true; 
var usedArray = [];  

var words = [ //array with objects that hold messages, guesses, and hints for the game
 
    {message: "Ironman's lady: Pepper", word: "PEPPER", hint:"Stark's Successor", picture:"assets/images/pPotts.png", song:"assets/audio/pepper.mp3"}, 
    {message: "Lou Ferrigno from the Hulk", word: "FERRIGNO", hint:"Beast or Bodybuilder?", picture:"assets/images/ferrigno.jpg", song:"assets/audio/hulkroar.mp3"}, 
    {message: "One of Xavier's finest, Cyclops", word: "CYCLOPS", hint:"You get ONE guess", picture:"assets/images/cyclops.png", song:"assets/audio/cyclops.mp3"}, 
    {message: "Wolverine's skeletal material, adamantium", word: "ADAMANTIUM", hint:"Not steel, but ..", picture:"assets/images/wolverine.jpg", song:"assets/audio/wolverine.mp3"}, 
    {message: "Captain America's nemesis, Hydra", word: "HYDRA", hint:"The first avenger's first enemy", picture:"assets/images/hydra.jpg", song:"assets/audio/hydra.mp3"}, 
    {message: "Frank Castle, the punisher", word: "CASTLE", hint:"Last name of the last guy you would fight", picture:"assets/images/castlePunisher.jpg", song:"assets/audio/generic_win.mp3"}, 
    {message: "Tobey Maguire", word: "MAGUIRE", hint:"Aracnid of the early 2000's", picture:"assets/images/maguire.jpg", song:"assets/audio/spiderman_homecoming.mp3"}, 
    {message: "The Thing from Fantastic 4", word: "THING", hint:"Superhero name, or noun property", picture:"assets/images/thing.jpg", song:"assets/audio/generic_win.mp3"}, 
    {message: "Blazing Skull", word: "BLAZING", hint:"Something on fire is also ...", picture:"assets/images/blazing.jpg", song:"assets/audio/generic_win.mp3"},      

]          

         
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
   
function clearGameOver () {
    hint.innerHTML = '';  
    currentWord.innerHTML = ''; 
    usedLetters.innerHTML = ''; 
    guessesRemaining.innerHTML = '';    
    winsCounter.innerHTML = ''; 
    lossCounter.innerHTML = '';  
    gameSwitch = false; 
} 
  

function wordGenerator () { //function that generates a random word and fills the 'current word' box with underlines   
        letterArray = [];
        usedArray.length = 0;  
        usedLetters.innerHTML = ''; 
        randomObject = words[Math.floor(Math.random() * words.length)];    
            randomWord = randomObject.word;
            randomMessage = randomObject.message;   
            randomHint = randomObject.hint;
            randomImage = randomObject.picture;  
            randomSong = randomObject.song; 

            var usedWord = words.indexOf(randomObject); 
            words.splice(usedWord, 1); 
        
            for (var i = 0; i < randomWord.length; i++) {
                letterArray[i] = ' __ ';    
            } 
            currentWordString = letterArray.join(" ");  
            currentWord.innerHTML = currentWordString; 
            document.getElementById("guesses-remaining").innerHTML = randomWord.length * 2;   
}                  
   
    document.onkeyup = function (event) {    
        if (event.keyCode === 13) {                
            winsCounter.innerHTML = '0';   
            lossCounter.innerHTML = '0';
            gameInterface.id = "";         
            startingText.id = "game-text";   
            wordGenerator ();       
                document.onkeyup = function (event) { 
                    if (event.keyCode >= 65 && event.keyCode <= 90 && gameSwitch === true) {  
                        trackerImage.src = "assets/images/placeholder.jpg";  
                        result.innerHTML = ""; 
                        wordbubble.innerHTML = "";    
                        themeSong.src = '';    
                        var letterGuessed = event.key.toUpperCase();   
                        var correctWordArray = randomWord.split(''); 
                        if (correctWordArray.includes(letterGuessed)) {
                            wordbubble.innerHTML = "Nice!"     
                        } else if (usedArray.includes(letterGuessed)) {
                            wordbubble.innerHTML = "You Tried that Already!"; 
                        } 
                        else {   
                            wordbubble.innerHTML = "Wrong!"; 
                            guessesRemaining.innerHTML--;   
                            usedArray.push(letterGuessed);  
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

                        if (guessesRemaining.innerHTML < 1) {
                            lossCounter.innerHTML++;
                            hint.innerHTML = '?';
                            themeSong.src = "assets/audio/wrong.mp3";   
                            wordbubble.innerHTML = "Point for me" 
                            wordGenerator();  
                        } else if (randomWord  === currentWord.innerHTML) {
                            winsCounter.innerHTML++;  
                         
                        switch (true) {
                            case (winsCounter.innerHTML <= 4):
                                trackerImage.src = randomImage;  
                                themeSong.src = randomSong;      
                                hint.innerHTML = '?'; 
                                result.innerHTML = "It's " + randomMessage + " !"; 
                                wordbubble.innerHTML = "Point for You!" 
                                wordGenerator();   
                                break; 
                            case (winsCounter.innerHTML > 4):
                                clearGameOver ();    
                                trackerImage.src = "assets/images/marvel-win.jpg";
                                result.innerHTML = "It was " + randomMessage + " !";    
                                wordbubble.innerHTML = "That's 5! You win! Marvel wiz!";
                                themeSong.src = "assets/audio/avengers.mp3";  
                                    break; 
                            case (lossCounter.innerHTML > 4 ): {
                                clearGameOver ();     
                                trackerImage.src = "assets/images/you-lose.jpg";
                                result.innerHTML = "Nice Try!";    
                                wordbubble.innerHTML = "Press Play again for a do-over"; 
                                themeSong.src = "assets/audio/lose_laugh.mp3"; 
                                    break; 
                            }        
 
                        }
                    } 
                        
                }   
           
            }    
  
        }          
     
    }       
    
   
             

 