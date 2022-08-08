import React, { Component } from 'react'

class Calculator extends Component {
    // Declare state variables
    state = {
        current: '',
        prev: '',
        operator: '',
        error: ''
    }

    //handle clearing
    handleClear = () => {
        this.setState({
            current: '',
            prev: '',
            operator: '',
            error: ''
        })
    }
    //handle number press, also include floats
    handleNumberPress = (event) => {
        event.persist()
        //handle error
        if (event.target.innerText === '.' && this.state.current.includes('.')) {
            return this.setState({ error: 'Double decimal pressed, select another' })
        }

        this.setState(prevState => {
            return {
                current: prevState.current + event.target.innerText,
                error: ''
            }
        })
    }
    //handle operator
    handleOperator = (event) => {
        event.persist()
        if ((this.state.current === '') || (this.state.current === '.')) {
            return this.setState({ error: 'No number selected' })
        }

        //if there is a prev value to calculate
        if (this.state.prev !== '') {
            this.calculate()
        }

        this.setState(prevState => {
            return {
                operator: event.target.innerText,
                prev: prevState.current,
                current: '',
                error: ''
            }
        })
    }
    //handle calculation
    calculate = () => {
        let runningTotal
        const prev = parseFloat(this.state.prev)
        const current = parseFloat(this.state.current)

        if (isNaN(prev) || isNaN(current)) {
            return this.setState({ error: 'warning, error' })
        }

        switch (this.state.operator) {
            case '+':
                runningTotal = prev + current
                break
            case '-':
                runningTotal = prev - current
                break
            case 'x':
                runningTotal = prev * current
                break
            case '/':
                runningTotal = prev / current
                break
            default:
                return
        }

        this.setState({
            current: `${runningTotal}`,
            prev: '',
            operator: '',
            error: ''
        })

    }



    render() {
        return (
            <div className="container">
                <h1>React Calculator</h1>
                <div className="calc-container">
                    <p>Values: </p>
                    <div className="answer-box">{this.state.error ? this.state.error : this.state.current}</div>
                    <div className="calc-row">
                        <button onClick={this.handleClear} className="calc-button calc-button-top">AC</button>
                        <button className="calc-button calc-button-top">+/-</button>
                        <button className="calc-button calc-button-top">%</button>
                        <button onClick={this.handleOperator} className="calc-button calc-button-op">/</button>
                    </div>
                    <div className="calc-row">
                        <button onClick={this.handleNumberPress} className="calc-button">7</button>
                        <button onClick={this.handleNumberPress} className="calc-button">8</button>
                        <button onClick={this.handleNumberPress} className="calc-button">9</button>
                        <button onClick={this.handleOperator} className="calc-button calc-button-op">x</button>
                    </div>
                    <div className="calc-row">
                        <button onClick={this.handleNumberPress} className="calc-button">4</button>
                        <button onClick={this.handleNumberPress} className="calc-button">5</button>
                        <button onClick={this.handleNumberPress} className="calc-button">6</button>
                        <button onClick={this.handleOperator} className="calc-button calc-button-op">-</button>
                    </div>
                    <div className="calc-row">
                        <button onClick={this.handleNumberPress} className="calc-button">1</button>
                        <button onClick={this.handleNumberPress} className="calc-button">2</button>
                        <button onClick={this.handleNumberPress} className="calc-button">3</button>
                        <button onClick={this.handleOperator} className="calc-button calc-button-op">+</button>
                    </div>
                    <div className="calc-row">
                        <button onClick={this.handleNumberPress} className="calc-button width-2">0</button>
                        <button onClick={this.handleNumberPress} className="calc-button">.</button>
                        <button onClick={this.calculate} className="calc-button calc-button-op">=</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator