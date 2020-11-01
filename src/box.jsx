import React, { Component } from 'react';
import "./App.css";
import axios from 'axios'
import { Link } from 'react-router-dom'


class Box extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }


    }

    async componentDidMount() {
        await axios.get('/rooms').then(res => {
            const rooms = res.data
            this.setState({ data: rooms })
        })
    }


    buttonColor(key) {
        const number = this.state.data.filter(d => d.roomName === key)
        if (number.length === 0) {
            return "#4CAF50"
        }
        else if (number.length === 1) {
            return "#FCE205"
        }
        else {
            return "#f44336"
        }


    }
    handleBook() {

    }

    render() {
        return (
            <div className="plan">
                <div className="start"></div>

                <div className="room">
                    <Link to='/rooms/werkstatt'><button style={{ background: `${this.buttonColor("werkstatt")}` }} key="werkstatt" id="werkstatt" onClick={this.handleBook}><p>Werkstatt</p></button></Link>
                </div>
                <div className="room">
                    <Link to='/rooms/schweiben'><button style={{ background: `${this.buttonColor("schweiben")}` }} key="schweiben" id="schweiben"><p>Schweiben</p></button></Link>
                </div>
                <div className="room">
                    <Link to='/rooms/Mikroskopie'><button style={{ background: `${this.buttonColor("Mikroskopie")}` }} key="Mikroskopie" id="Mikroskopie"><p>Mikroskopie</p></button></Link>
                </div>
                <div className="room">
                    <Link to='/rooms/Prufen'><button style={{ background: `${this.buttonColor("Prufen")}` }} key="Prufen" id="Prufen"><p>Prufen</p></button></Link>
                </div>
                <div className="room">
                    <Link to='/rooms/Optik'><button style={{ background: `${this.buttonColor("Optik")}` }} key="Optik" id="Optik"><p>Optik</p></button></Link>
                </div>

            </div >
        )
    }
}

export default Box;