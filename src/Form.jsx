import React, { Component } from 'react';
import './App.css'
import axios from 'axios'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      optionsTime: [],
      optionsDate: [],
      initials: "",
      time: "",
      day: ""
    }

    this.handleRecords = this.handleRecords.bind(this)
    this.handleTime = this.handleTime.bind(this)
  }

  generateTime() {
    var x = 30; //minutes interval
    var times = []; // time array
    var tt = 480; // start time
    //loop to increment the time and push results in array
    for (var i = 0; tt < 19.5 * 60; i++) {
      var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      var mm = (tt % 60); // getting minutes of the hour in 0-55 format
      times[i] = {
        value: ("0" + (hh)).slice(-2) + ":" + ("0" + mm).slice(-2)

      }
      tt = tt + x;
    }
    return times
  }

  getDateforDrp() {
    const date = new Date();
    let datesCollection = []

    for (var i = 1; i < 8; i++) {
      const newDate = new Date(date.getTime() + i * 1000 * 60 * 60 * 24);
      datesCollection[i] = {
        value: (`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`)
      };
    }
    return datesCollection;

  }
  async componentDidMount() {

    this.setState({ optionsTime: this.generateTime() })
    this.setState({ optionsDate: this.getDateforDrp() })

    let rooms = []
    await axios.get('/rooms').then(res => {
      rooms = res.data
    })
    const data = rooms.filter(d => d.roomName === this.props.match.params.name)
    this.setState({ data: data })
  }

  handleInitials = (event) => {
    this.setState({
      initials: event.target.value
    });
  }
  handleTime = (event) => {
    // this.setState({ time: event.target.value })
    console.log(event.target.value)
  }


  saveSelectValue = (e) => {
    this.setState({ time: e.target.value })
  }
  saveDate = (e) => {
    this.setState({ date: e.target.value })
  }

  handleRecords() {
    console.log(this.state.initials + "+" + this.state.time + "+" + this.state.date)

    const a = this.props.match.params.name
    const data = JSON.stringify({
      roomName: a,
      initials: this.state.initials,
      time: this.state.time,
      day: this.state.date
    });

    axios.post('http://localhost:5000/rooms', data, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      }
    })
      .then(function (response) {
        console.log(response);
        //Perform action based on response
      })
      .catch(function (error) {
        console.log(error);
        //Perform action based on error
      });


  }



  render() {
    return (
      <React.Fragment>
        {this.state.data.length === 0 && <React.Fragment> <h1 id="roomHeading">{this.props.match.params.name}</h1>
          <h1 id="addHeading" >Enter Details To Book Room</h1>
          <div id="formInfo"  >
            <div className="form-group">

              <div className="row">

                <div className="col-lg-4 col-md-2 text-left"> <input type="text" className="form-control" placeholder="Enter Initials" value={this.state.initials} onChange={this.handleInitials} /></div>

                <div className="col-lg-2 col-md-2 text-left">
                  <select
                    name="time"
                    style={{ width: "100%", height: "40px", background: "#8A2BE2" }}
                    className="rounded border-none"
                    value={this.state.time}
                    onChange={this.saveSelectValue}
                  >
                    {this.state.optionsTime.map(d => {
                      return <option value={d.value}>{d.value}</option>
                    })}
                  </select>
                </div>

                <div className="col-lg-2 col-md-2 text-left">
                  <select
                    name="time"
                    style={{ width: "100%", height: "40px", background: "#8A2BE2" }}
                    className="rounded border-none"
                    value={this.state.date}
                    onChange={this.saveDate}
                  >
                    {this.state.optionsDate.map(d => {
                      return <option value={d.value}>{d.value}</option>
                    })}
                  </select>

                </div>

                <div className="col-lg-2 col-md-2 text-left"><button style={{ background: " #8A2BE2", marginLeft: "10%", color: "white" }} type="button" onClick={this.handleRecords} class=" btn" >Submit</button>
                </div>
              </div>

            </div>

          </div>
        </React.Fragment>}
        {this.state.data.length === 1 && <React.Fragment> <h1 id="roomHeading">{this.props.match.params.name}</h1>
          <h1 id="addHeading" >Enter Details To Book Room</h1>
          <div id="formInfo"  >
            <div className="form-group">

              <div className="row">

                <div className="col-lg-4 col-md-2 text-left"> <input type="text" className="form-control" placeholder="Enter Initials" value={this.state.initials} onChange={this.handleInitials} /></div>

                <div className="col-lg-2 col-md-2 text-left">
                  <select
                    name="time"
                    style={{ width: "100%", height: "40px", background: "#8A2BE2" }}
                    className="rounded border-none"
                    value={this.state.time}
                    onChange={this.saveSelectValue}
                  >
                    {this.state.optionsTime.map(d => {
                      return <option value={d.value}>{d.value}</option>
                    })}
                  </select>
                </div>

                <div className="col-lg-2 col-md-2 text-left">
                  <select
                    name="time"
                    style={{ width: "100%", height: "40px", background: "#8A2BE2" }}
                    className="rounded border-none"
                    value={this.state.date}
                    onChange={this.saveDate}
                  >
                    {this.state.optionsDate.map(d => {
                      return <option value={d.value}>{d.value}</option>
                    })}
                  </select>

                </div>

                <div className="col-lg-2 col-md-2 text-left"><button style={{ background: " #8A2BE2", marginLeft: "10%", color: "white" }} type="button" onClick={this.handleRecords} class=" btn" >Submit</button>
                </div>
              </div>

            </div>

          </div>


          <br /><br />


          <h1 id="alreadyBook">Already Booked Status</h1>
          <div style={{ width: "100%", textAlign: "center" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">Day</th>
                  <th scope="col">Room</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(d => {
                  return <tr>
                    <th scope="row">{d.initials}</th>
                    <td>{d.time}</td>
                    <td>{d.day}</td>
                    <td>{d.roomName}</td>
                  </tr>
                })}

              </tbody>
            </table>

          </div></React.Fragment>}
        {this.state.data.length > 1 && <React.Fragment>
          <h1 id="roomHeading">{this.props.match.params.name}</h1>
          <h1 style={{ marginTop: "4%" }} class="text-center">Room is Full</h1>
          <h1 id="alreadyBook">Already Booked Status</h1>
          <div style={{ width: "100%", textAlign: "center" }}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">Day</th>
                  <th scope="col">Room</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(d => {
                  return <tr>
                    <th scope="row">{d.initials}</th>
                    <td>{d.time}</td>
                    <td>{d.day}</td>
                    <td>{d.roomName}</td>
                  </tr>
                })}

              </tbody>
            </table>

          </div></React.Fragment>}

      </React.Fragment >
    );
  }
};
export default Form;