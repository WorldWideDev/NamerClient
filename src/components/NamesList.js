import React, {Component} from 'react';
import './NamesList.css';
export default class NamesList extends Component {
    render() {
        return (
            <ul>
                {this.props.names.map(name => <li key={name.id}>{name.name}</li>)}
            </ul>
        );
    }
}
