export default class Comments {
    constructor(formElement) {
        this.formElement = document.querySelector(`${formElement}`);
        this.counterDisplay = document.querySelector('.counter-display');
        this.wordExclusions = ['blah', 'duck', 'jam', 'glitch', 'mushy'];
        this.maxLength = 250;
    }

    //Clips text beyond "maxLength"
     clipText(maxLength, textContent, textLength) {
        textContent = textLength > maxLength ? 
        textContent.substr(0, maxLength) : 
        textContent;

        this.cleanText(textContent);
    }

    //Replaces "wordExclusions" with asterisks
     cleanText(textContent) {
        let replacementText = "*";

        this.wordExclusions.forEach(exclude => {
            let excludedWordCount = exclude.length;
            textContent = textContent.replaceAll(exclude, `${replacementText.repeat(excludedWordCount)}`);
        });
        this.refreshContent(textContent);
    }

    //Assigns cleaned and clipped text back to "formElement"
    refreshContent(refreshedText) {
        this.formElement.value = refreshedText;
    }

    //Checks character count and updates "counterDisplay"  
     displayCount(maxLength, textLength) {
        let characterCount = maxLength - textLength;

        characterCount = textLength < maxLength ? 
        `Characters Remaining: ${characterCount}` :
        `Character Limt Reached.`;

        this.counterDisplay.innerHTML = characterCount;
    }

    init() { //Gets "formElement" value on "keyup" event
        this.formElement.addEventListener('keyup', (event) => {
            let textElement = event.target,
                 textContent = textElement.value,
                 textLength = textElement.value.length;
                
            this.clipText(this.maxLength, textContent, textLength)
            this.displayCount(this.maxLength, textLength);
        });
    }
}