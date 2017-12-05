var Letter = require('./letter.js');

function Word(word){
    this.word = w;
    this.letters = [];
    this.wordFound = false;
    this.getLetters = function(){
        for(var i = 0; i<this.word.length; i++){
            var newLetter = new Letter(this.word[i]);
            this.letters.push(newLetter);
        }
    };
    this.Correct = function(){
        if(this.letters.every(function(lttr){
            return lttr.visible === true;
        })){
            this.correctWord = true;
            return true;
        }
    };
    this.CheckLetter = function(guessedLet){
        var returnThis = 0;
        this.letters.forEach(function(lttr){
            if(lttr.letter === guessedLet){
                lttr.visible = true;
                returnThis++;
            }
        })
        return returnThis;
    };
    this.wordRender = function(){
        var display = '';
        this.letters.forEach(function(lttr){
            var currentLetter = lttr.letterRender();
            display+= currentLetter;
        });
        return display;
        };
}

module.exports = Word;