import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(`http://localhost:5000/exercises/${this.props.match.params.id}`) //this.props.match.params.id means we're taking the id parameter directly from the URL
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date),
                })
            })
        axios.get('http://localhost:5000/users/')
            .then(res => {
                (res.data.length > 0 &&
                  this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username,
                    }));
            }) 
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }
    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const exercise = {
          username: this.state.username,
          description: this.state.description,
          duration: this.state.duration,
          date: this.state.date,  
        }

        console.log(exercise);

        axios.post(`http://localhost:5000/exercises/update/${this.props.match.params.id}`, exercise)
            .then(res => console.log(res.data));
        // window.location = '/';
    }
    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                            {this.state.users.map(user => {
                                return (<option
                                key={user}
                                value={user}>{user}
                                </option>);
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                        type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                         />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes)</label>
                        <input
                        type="text"
                        required
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                         />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker
                        selected={this.state.date}
                        className="form-control"
                        onChange={this.onChangeDate}
                         />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}