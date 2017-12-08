var Letter = function(letter){
    this.letter = lttr;
    this.visible = false;
    this.letterRender = function(){
        if(this.letter == ' '){
            this.visible = true;
            return '  ';
        } if(this.visible === false){
            return ' _';
        } else{
            return this.letter;
        }
    };
};

module.exports = Letter;