var Letter = require('./letter.js');

function Word(wrd){
    var that = this;
    this.word = wrd;
    this.letters = [];
    this.wordFound = false;
    this.getLetters = function(){
        for(var i = 0; i<that.word.length; i++)
        {
            var newLetter = new Letter(that.word[i]);
            this.letters.push(newLetter);
        }
    };
    this.foundCorrect = function(){
        if(this.letters.every(function(lttr){
            return lttr.visible === true;
        })){
            this.wordFound = true;
            return true;
        }
    };
    this.checkLetter = function(guessedLet){
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
        that.letters.forEach(function(lttr){
            var currentLetter = lttr.letterRender();
            display += currentLetter;
        });
        return display;
        };
        this.updateConsole = function(){
            console.log(this.letters.join(" "))
          }
}

module.exports = Word;