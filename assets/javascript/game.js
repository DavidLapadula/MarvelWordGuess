//set global methods to dynamically change HTML and store in variables with name matching Id of element returned. 
var winsCounter = document.getElementById('wins');   
var lossCounter = document.getElementById('losses');
var usedLetters = document.getElementById('used-letters');  
var guessesRemaining = document.getElementById('guesses-remaining'); 
var hint = document.getElementById('hint');   
var trackerImage = document.getElementById('tracker-image'); 
var currentWord = document.getElementById('word-at-play'); 
var winMessage = document.getElementById('win-message');  
var wordbubble = document.getElementById('word-bubble'); 
var gameInterface = document.getElementById('game-interface'); 
var startingText = document.getElementById('starting-text');
var themeSong = document.getElementById('theme-song');
var gameSwitch = null; 
   
    // Game code organized as object 
    var fullGame = {    
        
        //An array of objects, each with associated values used for the game. This also allows for words to be added if desired
        words : [   
         
            {message: "Ironman's girlfriend !", word: "PEPPER", hint:"Stark's Successor", picture:"assets/images/pPotts.png", song:"assets/audio/pepper.mp3"}, 
            {message: "the Hulk of the 80's !", word: "FERRIGNO", hint:"Beast or Bodybuilder?", picture:"assets/images/ferrigno.jpg", song:"assets/audio/hulkroar.mp3"}, 
            {message: "from X-men !", word: "CYCLOPS", hint:"You get ONE guess", picture:"assets/images/cyclops.jpg", song:"assets/audio/cyclops.mp3"}, 
            {message: "Wolverine's skeletal material !", word: "ADAMANTIUM", hint:"Not steel, but ..", picture:"assets/images/wolverine.jpg", song:"assets/audio/wolverine.mp3"}, 
            {message: "Captain America's nemesis !", word: "HYDRA", hint:"The first avenger's first enemy", picture:"assets/images/hydra.jpg", song:"assets/audio/hydra.mp3"}, 
            {message: "as in Frank Castle, The Punisher !", word: "CASTLE", hint:"Last name of the last guy you would fight", picture:"assets/images/castlePunisher.jpg", song:"assets/audio/generic_win.mp3"}, 
            {message: "as in Tobey Maguire, from Spiderman !", word: "MAGUIRE", hint:"Aracnid of the early 2000's", picture:"assets/images/maguire.jpg", song:"assets/audio/spiderman_homecoming.mp3"}, 
            {message: "one of the Fantastic 4 !", word: "THING", hint:"Superhero name, or noun property", picture:"assets/images/thing.jpg", song:"assets/audio/generic_win.mp3"}, 
            {message: "as in Blazing Skull !", word: "BLAZING", hint:"Something on fire is also ...", picture:"assets/images/blazing.jpg", song:"assets/audio/generic_win.mp3"},      
        

        ], 
 
        // function called on 'hint' button event lisetener. Generates a hint specific to the state of the game
        hintGenerator: function () { 
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
        },                
         
        // function that ends the game and blanks the screen when either wins or losses reach 5. It gets called in the 'state change' function
        clearGameOver: function () {
            hint.innerHTML = '';  
            currentWord.innerHTML = ''; 
            usedLetters.innerHTML = ''; 
            guessesRemaining.innerHTML = '';    
            winsCounter.innerHTML = ''; 
            lossCounter.innerHTML = '';  
            gameSwitch = false; 
        },  

        // generates a random object from words array, stores properties in variables and then removes that item from the array to prevent double use of a word in one game
        wordGenerator: function () { 
            letterArray = []; // resets the letters used element and the current word element to ensure for a clear screen every time the function is called
            usedArray = [];   
            usedLetters.innerHTML = '';   
            
            randomObject = this.words[Math.floor(Math.random() * this.words.length)]; // generates random word from the word array and stores properties 
            randomWord = randomObject.word;
            randomMessage = randomObject.message;   
            randomHint = randomObject.hint; 
            randomImage = randomObject.picture;  
            randomSong = randomObject.song;     
                function createUnderline () {    // nested function that makes underline for current word and then removes it from the array. It get's returned and executed when the word generator function is called
                    for (var i = 0; i < randomWord.length; i++) {
                        letterArray[i] = ' __ ';    
                    }      
                    currentWordPlaceholder = letterArray.join(' ');   
                    currentWord.innerHTML = currentWordPlaceholder; 
                    guessesRemaining.innerHTML = randomWord.length * 2;   
                    var generatedWord = fullGame.words.indexOf(randomObject); 
                    fullGame.words.splice(generatedWord, 1);  
    
                    }   
            return createUnderline(); 
        },        
         
        // function called when user presses 'Enter'. Sets starting values and sets boolean 'game switch' to true
        gameInitialize: function () {
            winsCounter.innerHTML = '0';   
            lossCounter.innerHTML = '0';
            gameInterface.id = '';   // changes the Id of top left div. Starting text is hidden and the image/message div is displayed      
            startingText.id = 'game-text';   
            gameSwitch = true;  
        },     

        // clears the screen on the first guess of every new word. 
        newWordStart: function () {
            trackerImage.src = 'assets/images/placeholder.jpg';  
            winMessage.innerHTML = ''; 
            wordbubble.innerHTML = '';    
            themeSong.src = '';     
        },    

        // alters the state of the game based on user getting word right or wrong  
        stateChange: function () {
            if (guessesRemaining.innerHTML < 1) { //gets word wrong
                lossCounter.innerHTML++;
                    switch (true) {
                        case (lossCounter.innerHTML <= 4):
                            hint.innerHTML = '?';
                            winMessage.innerHTML = 'Wrong !';
                            themeSong.src = 'assets/audio/wrong.mp3';   
                            wordbubble.innerHTML = 'Point for me';  
                            this.wordGenerator();  
                                break; 
                        case (lossCounter.innerHTML > 4): 
                            this.clearGameOver ();     
                            trackerImage.src = 'assets/images/you-lose.jpg';
                            winMessage.innerHTML = 'Nice Try!';     
                            wordbubble.innerHTML = 'Press Play again for a rematch !'; 
                            themeSong.src = 'assets/audio/lose_laugh.mp3'; 
                                break;         
                    }
            } else if (randomWord  === currentWord.innerHTML) { //gets word right
                winsCounter.innerHTML++;   
                    switch (true) {
                        case (winsCounter.innerHTML <= 4):
                            hint.innerHTML = '?'; 
                            trackerImage.src = randomImage;  
                            themeSong.src = randomSong;      
                            winMessage.innerHTML = "The word is " + randomWord + ", " + randomMessage;  
                            wordbubble.innerHTML = "Point for You!" 
                            this.wordGenerator();   
                            break;  
                        case (winsCounter.innerHTML > 4 ):
                            this.clearGameOver ();    
                            trackerImage.src = "assets/images/marvel-win.jpg";
                            winMessage.innerHTML = "The word was " + randomWord + ", " + randomMessage;     
                            wordbubble.innerHTML = "That's 5! You win! Marvel wiz!";
                            themeSong.src = "assets/audio/avengers.mp3";  
                                break;   
                    }  
                }    
            
        },    
               
        // handles the letters inputted by the user
        guessChecker: function () {
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
            } else if (usedArray.includes(letterGuessed)) { //Ensures wrong guesses only trigger effect once, and not if the user pushes it again
            wordbubble.innerHTML = 'You Tried that Already!'; 
            } else {   
                wordbubble.innerHTML = 'Wrong!'; //handles incorrect letters. Removes a guess and adds letter to an array
                guessesRemaining.innerHTML--;   
                usedArray.push(letterGuessed);  
                wrongLetters = usedArray.join(' , ');   
                usedLetters.innerHTML = wrongLetters;   
            }   
        
        }     
    }     
       
    document.addEventListener('keyup', function (event){
        if (event.keyCode === 13) { // game wont start until user presses 'Enter'
        fullGame.gameInitialize ();               
        fullGame.wordGenerator();                      
        document.onkeyup = function (event) { 
            if (event.keyCode >= 65 && event.keyCode <= 90 && gameSwitch === true) {  // Guesses can only be letters, and 'gameSwitch' ensures user can only push letters when a game is being played
                fullGame.newWordStart ();    
                fullGame.guessChecker ();   
                fullGame.stateChange (); 
                }      
 
            }    
        }       
    });   