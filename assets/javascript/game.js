//set global functions to dynamically change HTML
var winsCounter = document.getElementById('wins');   
var lossCounter = document.getElementById('losses');
var usedLetters = document.getElementById('used-letters');  
var guessesRemaining = document.getElementById('guesses-remaining'); 
var hint = document.getElementById('hint');   
var trackerImage = document.getElementById('tracker-image'); 
var currentWord = document.getElementById('word-at-play'); 
var result = document.getElementById('win-message'); 
var wordbubble = document.getElementById('word-bubble'); 
var gameInterface = document.getElementById('game-interface'); 
var startingText = document.getElementById('starting-text');
var themeSong = document.getElementById('theme-song');
var gameSwitch = null; 
 
//array with objects that hold messages, guesses, songs, and hints for the game
var words = [ 
 
    {message: "as in Ironman's lady !", word: "PEPPER", hint:"Stark's Successor", picture:"assets/images/pPotts.png", song:"assets/audio/pepper.mp3"}, 
    {message: "the Hulk of the 80's !", word: "FERRIGNO", hint:"Beast or Bodybuilder?", picture:"assets/images/ferrigno.jpg", song:"assets/audio/hulkroar.mp3"}, 
    {message: "from X-men !", word: "CYCLOPS", hint:"You get ONE guess", picture:"assets/images/cyclops.png", song:"assets/audio/cyclops.mp3"}, 
    {message: "Wolverine's skeletal material !", word: "ADAMANTIUM", hint:"Not steel, but ..", picture:"assets/images/wolverine.jpg", song:"assets/audio/wolverine.mp3"}, 
    {message: "Captain America's nemesis !", word: "HYDRA", hint:"The first avenger's first enemy", picture:"assets/images/hydra.jpg", song:"assets/audio/hydra.mp3"}, 
    {message: "as in Frank Castle, The Punisher !", word: "CASTLE", hint:"Last name of the last guy you would fight", picture:"assets/images/castlePunisher.jpg", song:"assets/audio/generic_win.mp3"}, 
    {message: "as in Tobey Maguire, from Spiderman !", word: "MAGUIRE", hint:"Aracnid of the early 2000's", picture:"assets/images/maguire.jpg", song:"assets/audio/spiderman_homecoming.mp3"}, 
    {message: "one of the Fantastic 4 !", word: "THING", hint:"Superhero name, or noun property", picture:"assets/images/thing.jpg", song:"assets/audio/generic_win.mp3"}, 
    {message: "as in Blazing Skull !", word: "BLAZING", hint:"Something on fire is also ...", picture:"assets/images/blazing.jpg", song:"assets/audio/generic_win.mp3"},      

]                 

// function called on 'hint' button, and generates a message based on the state of the game
function hintGenerator () { 
    switch (true) {
        case (hint.innerHTML === '?'): 
            hint.innerHTML = randomHint; 
            guessesRemaining.innerHTML--; 
                break; 
        case (guessesRemaining.innerHTML >= 1): 
            hint.innerHTML = 'You only get one!';
                break; 
        case (guessesRemaining.innerHTML === ''):
            hint.innerHTML = 'You need to be playing!';
                break;   
    }  
}              
 
// function that ends the game and blanks the screen when either wins or losses reach 5
function clearGameOver () {
    hint.innerHTML = '';  
    currentWord.innerHTML = ''; 
    usedLetters.innerHTML = ''; 
    guessesRemaining.innerHTML = '';    
    winsCounter.innerHTML = ''; 
    lossCounter.innerHTML = '';  
    gameSwitch = false; 
} 

// generates a random object from words array, stores properties in variables and then removes that item from array to prevent double use of a word
function wordGenerator () { 
    letterArray = []; // function resets the letters used element and the current word element to ensure for a clear screen every time function is called
    usedArray = [];   
    usedLetters.innerHTML = '';   
    
    randomObject = words[Math.floor(Math.random() * words.length)]; // generates random word and store properties
    randomWord = randomObject.word;
    randomMessage = randomObject.message;   
    randomHint = randomObject.hint;
    randomImage = randomObject.picture;  
    randomSong = randomObject.song;    
        
    function createUnderline () {    // nested function that makes underline for current word and then removes it from the array
        for (var i = 0; i < randomWord.length; i++) {
            letterArray[i] = ' __ ';    
        } 
        currentWordString = letterArray.join(' ');  
        currentWord.innerHTML = currentWordString; 
        document.getElementById('guesses-remaining').innerHTML = randomWord.length * 2;   
        var generatedWord = words.indexOf(randomObject); 
        words.splice(generatedWord, 1);  

        }   
    return createUnderline(); 
}      

// function called when user presses 'Enter'. Sets starting values and sets boolean 'game switch' to true
function gameInitialize () {
    winsCounter.innerHTML = '0';   
    lossCounter.innerHTML = '0';
    gameInterface.id = '';   // changes the Id of top left div. Starting text is hidden and the image/message div is displayed      
    startingText.id = 'game-text';   
    gameSwitch = true;  
}   

// clears the screen on the first guess of every new word. 
function newWordStart () {
    trackerImage.src = 'assets/images/placeholder.jpg';  
    result.innerHTML = ''; 
    wordbubble.innerHTML = '';    
    themeSong.src = '';     
}    

// alters the state of the game based on user getting word right or wrong  
function stateChange () {
    if (guessesRemaining.innerHTML < 1) { //gets word wrong
        lossCounter.innerHTML++;
            switch (true) {
                case (lossCounter.innerHTML <= 4):
                    hint.innerHTML = '?';
                    themeSong.src = 'assets/audio/wrong.mp3';   
                    wordbubble.innerHTML = 'Point for me';  
                    wordGenerator();  
                        break; 
                case (lossCounter.innerHTML > 4): 
                    clearGameOver ();     
                    trackerImage.src = 'assets/images/you-lose.jpg';
                    result.innerHTML = 'Nice Try!';     
                    wordbubble.innerHTML = 'Press Play again for a do-over'; 
                    themeSong.src = 'assets/audio/lose_laugh.mp3'; 
                        break;        
            }
    } else if (randomWord  === currentWord.innerHTML) { //gets word right
        winsCounter.innerHTML++;   
            switch (true) {
                case (winsCounter.innerHTML <= 4):
                    trackerImage.src = randomImage;  
                    themeSong.src = randomSong;      
                    hint.innerHTML = '?'; 
                    result.innerHTML = "The word is " + randomWord + ", " + randomMessage;  
                    wordbubble.innerHTML = "Point for You!" 
                    wordGenerator();   
                    break; 
                case (winsCounter.innerHTML > 4 ):
                    clearGameOver ();    
                    trackerImage.src = "assets/images/marvel-win.jpg";
                    result.innerHTML = "The word was " + randomWord + ", " + randomMessage;     
                    wordbubble.innerHTML = "That's 5! You win! Marvel wiz!";
                    themeSong.src = "assets/audio/avengers.mp3";  
                        break;   
            }  
        }   
    
}
   
 
document.onkeyup = function (event) {    
    if (event.keyCode === 13) { // game wont start until user presses 'Enter'
        gameInitialize ();               
        wordGenerator ();        
              
            document.onkeyup = function (event) { 
                if (event.keyCode >= 65 && event.keyCode <= 90 && gameSwitch === true) {  // Guesses can only be letters
                    newWordStart ();    
                    var letterGuessed = event.key.toUpperCase();   // control for letter casing. Words stored are all upper case
                    var correctWordArray = randomWord.split('');  // converts random word string to array 
                        
                        if (correctWordArray.includes(letterGuessed)) { //checks if the letter is correct or not, and updates game accordingly
                            wordbubble.innerHTML = 'Nice!'   
                                for (var i = 0; i < correctWordArray.length; i++) { // replaces blank underline with correctly guessed letter
                                    if (correctWordArray[i] === letterGuessed) {  
                                        letterArray[i] = letterGuessed;  
                                        currentGuess = letterArray.join(''); 
                                        currentWord.innerHTML = currentGuess;   
                                    }   
                                }    
                        } else if (usedArray.includes(letterGuessed)) {
                        wordbubble.innerHTML = 'You Tried that Already!'; 
                        } else {   
                            wordbubble.innerHTML = 'Wrong!'; 
                            guessesRemaining.innerHTML--;   
                            usedArray.push(letterGuessed);  
                            wrongLetters = usedArray.join(' , ');  
                            usedLetters.innerHTML = wrongLetters;   
                        }    
                    
                    stateChange (); // test state of the game after each leter is guessed 
                }     
  
            }    
  
    }           

}  
    
   
             

 