var inquirer = require('inquirer');
var isLetter = require('is-letter');
//require objects/exports
var Word = require('./word.js');
var List = require('./wordList.js');


require('events').EventEmitter.prototype._maxListeners = 100;

var hangman = {
    wordBank: List.newWord.wordList,
    guessesLeft: 10,
    guessedLetters: [],
    startGame: function(){
        if(this.guessedLetters.length > 0){
            this.guessedLetters = [];
        }
        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Y'all ready for this?"
        }]).then(function(answer){
            if(answer.play) {
                this.newGame();
            }else{
                console.log("Psych!");
            }
        })},

        newGame: function() {
            if(this.guessesLeft === 10){
                console.log("Let's get ready to RUMBLE!");
                console.log('***************');
            }
        }
    }
}