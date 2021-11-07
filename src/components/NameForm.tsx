import React, {Component, FormEvent, useState, CSSProperties} from 'react';
import HttpService from '../services/httpService';
import './NameForm.css';
import Name from '../models/Name';
import {NameType} from './NamesList';
interface NameFormProps {
    onSuccess: () => void
}
interface NameFormErrors {
    Name?: String[],
    Weight?: String[]
}

const INITIAL_MODEL:Name = {
    name: "",
    weight: .5,
}
const NameForm:React.FC<NameFormProps> = props => {
    const {onSuccess} = props;
    const [model, setModel] = useState<Name>(INITIAL_MODEL);
    const [errors, setErrors] = useState<NameFormErrors>({});
    const onSubmit = (event:FormEvent):void => {
        event.preventDefault();
        console.log("Submitting", model.name);
        HttpService.create(model)
            .then(result => {
                if(result.errors) {
                    setErrors(result.errors);
                } else {
                    setErrors({});
                    setModel(INITIAL_MODEL);
                    onSuccess();
                }
            })
            .catch(err => console.log(err, "error in component"));
    }
    const updateModel = (value:string, field:string):void => {
        let toUpdate:any = {...model};
        toUpdate[field] = field === "weight" ? parseFloat(value) : value;
        setModel(toUpdate);
    }
    const visibilityStyles = (weight:number):CSSProperties => {
        switch(weight) {
            case 0.5:
                return { visibility: "hidden"};
            default:
                return { visibility: "visible" };
        }
    }
    return (
        <form onSubmit={(e)=> onSubmit(e)}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                { errors.Name?.map((error:String, i:number) => (
                    <span className="name-form-error" key={i}>{error}</span>
                ))}
                <input type="text" 
                    id="name"
                    value={model.name}
                    className="form-control" 
                    onChange={(e)=> updateModel(e.target.value, "name")}
                />
            </div>
            <div className="form-group">
                <label className="flex-text-even" htmlFor="weight">
                    <span 
                        style={{opacity:(1 - model.weight)}}>First</span>
                    <span 
                        style={visibilityStyles(model.weight)}> or </span>
                    <span 
                        style={{opacity:model.weight}}>Middle</span>
                </label>
                <input type="range" 
                    min="0" max="1" step=".01"
                    value={model.weight} 
                    className="form-control" 
                    onChange={(e)=> updateModel(e.target.value, "weight")}
                />
            </div>
            <button className="btn btn-primary">Enter</button>
        </form>
    );
}
export default NameForm;