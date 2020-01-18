import React, {Component} from 'react';
import './NameForm.css'

const INITIAL_MODEL = {
    name: "",
    weight: .5,
}
export default class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {...INITIAL_MODEL}
        }
    }
    onSubmit(event) {
        const {model} = this.state;
        event.preventDefault();
        alert("Submiting", {...model});
        this.setState({model: {...INITIAL_MODEL}});
    }
    updateModel(value, field) {
        let toUpdate = {...this.state.model};
        toUpdate[field] = value;
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
