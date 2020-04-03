import React, {Component} from 'react';
import NameForm from './NameForm';
import NamesList from './NamesList';
import HttpService from '../services/httpService.js';
import './App.css';

const INIT_NAME_STATE = {
    first: "[First]",
    middle: "[Middle]",
    last: "Newsom"
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNames: [],
            middleNames: [],
            selectedName: INIT_NAME_STATE
        }
    }
    componentWillMount() {
        this.fetchNames();
    }
    selectName(type, name) {
        const newSelectedName = {...this.state.selectedName};
        newSelectedName[type] = name;
        if(newSelectedName.first == "Devon" &&
            newSelectedName.middle == "Scott")
        {
            newSelectedName.last = "Newsom Jr.";
        } else {
            newSelectedName.last = "Newsom";
        }
        this.setState({selectedName:newSelectedName});
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
        const {first,middle,last} = this.state.selectedName;
        return (
            <div className="App">
                <header className="App-header">
                    <section className="App-section">
                            <h3 className="App-sub-section">{first} {middle} {last}</h3>
                            <div className="App-sub-section">
                                <NameForm onSuccess={()=>this.fetchNames()}/>
                            </div>
                    </section>
                    <section className="App-section">
                        <p>First Names</p>
                        <NamesList nameType="first" names={this.state.firstNames}
                            handleSelectedName={(type,name)=>this.selectName(type,name)}/>
                        <p>Middle Names</p>
                        <NamesList nameType="middle" names={this.state.middleNames}
                            handleSelectedName={(type,name)=>this.selectName(type,name)}/>
                    </section>
                </header>
            </div>
        );
    }
}
