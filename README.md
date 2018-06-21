# Word-Guess-Game
UofT Bootcamp - Week 3 Homework

# Description
Marvel themed hangman style word guessing game. 

## Technology Used
* HTML
* CSS
* Javascript

## Resolutions
When developing this game I realized that, when choooisng a random index from an array, the same value can be chosen quite often if the set of values is relatively small. This is a problem if the program should run without duplicate values, like in a word guessing game where random words are gathered from an array. I solved this by deleting the value of an array after it was chosem, therefore eliminating the chance of duplicates. 

## Instructions
* Press Enter to start
* Guess letters in the word; the amount of guesses you have is double the length of the word
* Use a hint if you need it, but it costs a guess
* Get the word without running out of guesses and you get a point, otherwise computer gets a point
* First to 5 wins

[Play it here](https://davidlapadula.github.io/Word-Guess-Game/)
