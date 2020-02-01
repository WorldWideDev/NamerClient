import React, {Component} from 'react';
import HttpService from '../services/httpService';
import './NameForm.css'

const INITIAL_MODEL = {
    name: "",
    weight: .5,
}
export default class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {...INITIAL_MODEL},
            errors: []
        }
    }
    onSubmit(event) {
        const {model} = {...this.state};
        event.preventDefault();
        console.log("Submiting", model.name);
        HttpService.create(model)
            .then(result => {
                if(result.errors) {
                    this.setState({errors: result.errors});
                } else {
                    this.setState({model: {...INITIAL_MODEL}, errors: []});
                    this.props.onSuccess();
                }
            })
            .catch(err => console.log(err, "error in component"));
    }
    updateModel(value, field) {
        let toUpdate = {...this.state.model};
        toUpdate[field] = field==="weight" ? parseFloat(value) : value;
        this.setState({model:toUpdate});
    }
    render() {
        const {model}  = this.state;
        // NOTE: range input changes value to string
        // leaving strong comparison, like the effect (only inital load shows "or")
        let middleViz = (model.weight === 0.5) 
            ? "visible" : "hidden";
        return (
            <form onSubmit={(e)=> this.onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" 
                        id="name"
                        value={model.name}
                        className="form-control" 
                        onChange={(e)=> this.updateModel(e.target.value, "name")}
                    />
                </div>
                <div className="form-group">
                    <label className="flex-text-even" htmlFor="weight">
                        <span 
                            style={{opacity:(1 - model.weight)}}>First</span>
                        <span 
                            style={{visibility:middleViz}}> or </span>
                        <span 
                            style={{opacity:model.weight}}>Middle</span>
                    </label>
                    <input type="range" 
                        min="0" max="1" step=".01"
                        value={model.weight} 
                        className="form-control" 
                        onChange={(e)=> this.updateModel(e.target.value, "weight")}
                    />
                </div>
                <button className="btn btn-primary">Enter</button>
            </form>
        );
    }
}
