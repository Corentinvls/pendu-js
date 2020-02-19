
import React from 'react';
import '../App.css';
export default class Accueil extends React.Component {

    constructor() {
        super();
        this.state = {
            alphabet : ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"],
            wordAnswer: "",
            wordAsk:'',
            wrong: 0,

        };
    }

    /*generateWord() {
        const words = ["Acheteur", "Acrobate", "Acteur", "Actrice", "Actuaire", "Affreteur", "Agriculteur", "Alchimiste", "Alpiniste",
            "Ambassadeur", "Ambulancier", "Analyste", "Anesthesiste", "Animateur"];

        let wordIndex = Math.floor(Math.random() * words.length);
        let word = words[wordIndex];
        let worlab = document.createElement('h2');
        worlab.setAttribute("id", "mot");
        document.getElementById("mystery").appendChild(worlab);
        let wordAnswer = word.split("");
        console.log(wordAnswer);
        let wordAsk = [];

        for (let i = 0; i < wordAnswer.length; i++) {
            if (i === 0 || i === (wordAnswer.length - 1)) {
                wordAsk.push(wordAnswer[i]);
            } else {
                wordAsk.push(" _ ");
            }
        }

        wordAsk.forEach(function (el, index) {

            let span = document.createElement('span');
            span.innerHTML = el.toString();
            span.setAttribute("id", index.toString());
            document.getElementById("mot").appendChild(span);

        });

    }*/


    render () {
        return (
        <div>
        <header >
            <h1 id="maintitle">Le Pendu</h1>
            <button id="newgame" type="button" >Nouvelle partie</button>
            <hr/>
        </header>
        <div id="game">
            <div id="image"> </div>
            <div id="mystery"> </div>
            <div id="letters">
                {this.state.alphabet.map((letter, i) =>
                    (
                        <button key={i}/* onClick={this.selectedLetter(letter)}*/>{letter}</button>
                    )
                )}
            </div>
            <div id="mistake"> </div>
            <h2> </h2>
        </div>

        </div>
        );
    }
}



