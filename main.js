var inquirer = require('inquirer');
var isLetter = require('is-letter');
//require objects/exports
var Word = require('./word.js');
var List = require('./wordList.js');

require('events').EventEmitter.prototype._maxListeners = 100;

var hangman = {
    wordBank: List.wordList,
    guessesLeft: 10,
    guessedLetters: [],
    display: 0,
    currentWord: null,
    startGame: function(){
        var that = this;
        if(this.guessedLetters.length > 0){
            this.guessedLetters = [];
        }
        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "Want to play Awesome 90's Hangman?"
        }]).then(function(answer){
            if(answer.play) {
                that.newGame();
            }else{
                console.log("Psych!");
            }
        })},

        newGame: function() {
            if(this.guessesLeft === 10){
                console.log("Y'all ready for this?");
                console.log('***************');
                var randNum = Math.floor(Math.random()*this.wordBank.length);
                this.currentWord = new Word(this.wordBank[randNum]);
                this.currentWord.getLetters();
                console.log(this.currentWord.wordRender());
                this.promptAgain();
            } else{
                this.reset();
                this.newGame();
                }
            },
            reset: function(){
                this.guessesLeft = 10;
        },
        promptAgain: function(){
            var that = this;
            inquirer.prompt([{
                name: "chosenLtr",
                type: "input",
                message: "Choose a letter: ",
                validate: function(value) {
                    if(isLetter(value)){
                        return true;
                    } else{
                        return false;
                    }
                }
            }]).then(function(ltr){
                var letterReturned = (ltr.chosenLtr).toUpperCase();
                var guessedPrev = false;
                    for(var i = 0; i<that.guessedLetters.length; i++){
                        if(letterReturned === that.guessedLetters[i]){
                            guessedPrev = true;
                        }
                    }if(guessedPrev === false){
                        that.guessedLetters.push(letterReturned);
                        var found = that.currentWord.checkLetter(letterReturned);
                        if(found === 0){
                            console.log('Wrong!');
                            that.guessesLeft--;
                            that.display++;
                            console.log('You have ' + that.guessesLeft + ' guesses left');
                            console.log('\n******************');
                            console.log(currentWord.wordRender());
                            console.log('\n******************');
                            console.log("Letters guessed: " + that.guessedLetters);
                        } else {
                            console.log('Great job!');
                            if(that.currentWord.foundCorrect() === true){
                                console.log(that.currentWord.wordRender());
                                console.log('You Win!');
                            } else{
                                console.log('You have ' + that.guessesLeft + ' guesses left');
                                console.log('\n******************');
                                console.log("Letters guessed: " + that.guessedLetters);
                            }
                        }
                        if(guessesLeft > 0 && that.currentWord.wordFound === false){
                            that.promptAgain();
                        }else if (that.guessesLeft === 0){
                            console.log('Loser!');
                            console.log('The answer was ' + that.currentWord.word);
                        }
                    }else {
                        console.log("Try again!")
                        that.promptAgain();
                    }
            });
        }
    }
hangman.startGame();