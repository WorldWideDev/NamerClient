import React, {Component} from 'react';
import NameForm from './NameForm';
import NamesList from './NamesList';
import HttpService from '../services/httpService.js';
import './App.css';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNames: [],
            middleNames: []
        }
    }
    componentWillMount() {
        this.fetchNames();
    }
    fetchNames() {
        HttpService.get('first')
            .then(res => {
                this.setState({firstNames: res});
            })
            .catch(err => console.log(err, 'error from NamesList'));
        HttpService.get('middle')
            .then(res => {
                this.setState({middleNames: res});
            })
            .catch(err => console.log(err, 'error from NamesList'));
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <section className="App-section">
                        <NameForm onSuccess={()=>this.fetchNames()}/>
                    </section>
                    <section className="App-section">
                        <p>First Names</p>
                        <NamesList names={this.state.firstNames}/>
                        <p>Middle Names</p>
                        <NamesList names={this.state.middleNames}/>
                    </section>
                </header>
            </div>
        );
    }
}
