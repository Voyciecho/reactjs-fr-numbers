
import React from 'react';

const frenchDictionary = {
    1: 'un', 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq', 6: 'six', 7: 'sept', 8: 'huit', 9: 'neuf', 10: 'dix',
    11: 'onze', 12: 'douze', 13: 'treize', 14: 'quatorze', 15: 'quinze', 16: 'seize', 17: 'dix-sept', 18: 'dix-huit', 19: 'dix-neuf',
    20: 'vingt', 30: 'trente', 40: 'quarante', 50: 'cinquante', 60: 'soixate'
};

class Numero extends React.Component {
    render() {
        return (
            <div>
                <h3>French numbers [1-60]</h3>
                <hr />
                <h1>{this.props.numero}</h1>
            </div>
        );
    }
}

class FrenchInputForm extends React.Component {
    state = {
        frenchText: 'type in french number here'
    }

    handleChange = (event) => {
        this.setState({frenchText: event.target.value});
        event.preventDefault();
        event.stopPropagation();
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.props.handleSubmit(this.state.frenchText);
            event.preventDefault();
            event.stopPropagation();
            this.setState({frenchText: ''});
        }
    }

    render() {
        return (
            <div>
            <form autoComplete="off">
                <input
                    type="text"
                    name="name"
                    style={{width:'350px'}}
                    value={this.state.frenchText}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </form>
            </div>
        );
    }
}

class UserStatistics extends React.Component {
    render() {
        return (
            <table><tbody>
                <tr>
                    <th>Correct:</th>
                    <th>{this.props.correctCount}</th>
                    <th>Failed:</th>
                    <th>{this.props.failedCount}</th>
                </tr>
            </tbody></table>
        );
    }
}

class HistoryTable extends React.Component {
    render() {
        let rows = [];

        this.props.answersList.forEach((answer) => {
            rows.push((
                <tr>
                    <th>{answer.number}</th>
                    <th>{answer.french}</th>
                    <th>{answer.result ? "" : "!="}</th>
                    <th>{answer.result ? "" : answer.frenchCorrect}</th>
                </tr>
                )
            );
        });
        rows.reverse();

        return (
            <div style={{overflowY:'auto', height:'100px', color:"rgb(200,200,200)"}}>
                <table><tbody>{rows}</tbody></table>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numero: Math.floor((Math.random() * 60) + 1),
            correctCount: 0,
            failedCount: 0,
            answersList: []
        }
    }

    submitAnswer = (answer) => {
        let correctAnswer;
        let result;

        if (frenchDictionary.hasOwnProperty(this.state.numero)) {
            correctAnswer = frenchDictionary[this.state.numero];
        }
        else if (this.state.numero % 10 === 1) {
            correctAnswer = frenchDictionary[this.state.numero-1] + '-et-un';
        }
        else {
            correctAnswer = frenchDictionary[this.state.numero-this.state.numero%10] + '-' + frenchDictionary[this.state.numero%10];
        }

        if (correctAnswer === answer.replaceAll(' ', '-').toLowerCase()) {
            this.setState({correctCount: this.state.correctCount + 1})
            result = true;
        }
        else {
            this.setState({failedCount: this.state.failedCount + 1})
            result = false;
        }

        this.state.answersList.push({number: this.state.numero, french: answer, frenchCorrect: correctAnswer, result: result});
        this.setState({numero: Math.floor((Math.random() * 60) + 1) });
    }

    render() {
        return (
            <div style={{width:'400px'}}>
                <Numero numero={this.state.numero}/>
                <FrenchInputForm handleSubmit={this.submitAnswer} />
                <UserStatistics correctCount={this.state.correctCount} failedCount={this.state.failedCount}/>
                <HistoryTable answersList={this.state.answersList}/>
            </div>
        );
    }
}

export default App;
