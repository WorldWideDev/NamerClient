import React, {Component} from 'react';
import './NamesList.css';
export default class NamesList extends Component {
    onNameSelected(name) {
        const {nameType} = this.props;
        console.log(name,nameType);
        this.props.handleSelectedName(nameType,name);
    }
    render() {
        const {names} = this.props;
        return (
            <ul>
                {names.map(name => 
                    <li onClick={()=>this.onNameSelected(name.name)}
                        key={name.id}>{name.name}</li>)}
            </ul>
        );
    }
}
