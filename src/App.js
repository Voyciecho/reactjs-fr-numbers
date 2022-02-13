
import React from 'react';

const frenchDictionary = {1: 'un', 2: 'deux', 3: 'trois', 4: 'quatre', 5: 'cinq', 6: 'six', 7: 'sept', 8: 'huit', 9: 'neuf', 10: 'dix'};

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
            <table>
            <tbody>
                <tr>
                    <th>Correct:</th>
                    <th>{this.props.correctCount}</th>
                </tr>
                <tr>
                    <th>Failed:</th>
                    <th>{this.props.failedCount}</th>
                </tr>
            </tbody>
            </table>
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
                </tr>
                )
            );
        });
        rows.reverse();

        return (
            <div style={{overflowY:'auto', height:'100px'}}>
            <table>
            <tbody>
            {rows}
            </tbody>
            </table>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numero: Math.floor((Math.random() * 10) + 1),
            correctCount: 0,
            failedCount: 0,
            answersList: []
        }
    }

    submitAnswer = (answer) => {
        if (frenchDictionary[this.state.numero] === answer) {
            this.setState({correctCount: this.state.correctCount + 1})
        }
        else {
            this.setState({failedCount: this.state.failedCount + 1})
        }
        this.state.answersList.push({number: this.state.numero, french: answer});
        this.setState({numero: Math.floor((Math.random() * 10) + 1) });
    }

    render() {
        return (
            <div>
                <h1>{this.state.numero}</h1>
                <FrenchInputForm handleSubmit={this.submitAnswer} />
                <UserStatistics correctCount={this.state.correctCount} failedCount={this.state.failedCount}/>
                <HistoryTable answersList={this.state.answersList}/>
            </div>
        );
    }
}

export default App;
