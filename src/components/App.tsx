import React, { useState, useEffect } from 'react';
import NameForm from './NameForm';
import NamesList, {NameType} from './NamesList';
import HttpService from '../services/httpService';
import SelectedName from '../models/SelectedName';
import Name from '../models/Name';
import './App.css';

const INIT_NAME_STATE:SelectedName = {
    first: "[First]",
    middle: "[Middle]",
    last: "Newsom"
};

const App = () => {
    const [firstNames, setFirstNames] = useState<Name[]>([]);
    const [middleNames, setMiddleNames] = useState<Name[]>([]);
    const [selectedName, setSelectedName] = useState<SelectedName>(INIT_NAME_STATE);

    useEffect(()=> {
        fetchNames();
    },[])
    
    const selectName = (type:NameType, name:Name) => {
        let newSelectedName:SelectedName = {...selectedName, [type]:name.name};
        if(newSelectedName.first === "Devon" &&
            newSelectedName.middle === "Scott")
        {
            newSelectedName.last = "Newsom Jr.";
        } else {
            newSelectedName.last = "Newsom";
        }
        setSelectedName(newSelectedName);
    }
    const fetchNames = ():void => {
        HttpService.get('?nameType=first')
            .then(res => {
                setFirstNames(res);
            })
            .catch(err => console.log(err, 'error from NamesList'));
        HttpService.get('?nameType=middle')
            .then(res => {
                setMiddleNames(res);
            })
            .catch(err => console.log(err, 'error from NamesList'));
    }
    const {first,middle,last} = selectedName;
    return (
        <div className="App">
            <header className="App-header">
                <section className="App-section">
                        <h3 className="App-sub-section">{first} {middle} {last}</h3>
                        <div className="App-sub-section">
                            <NameForm onSuccess={()=>fetchNames()}/>
                        </div>
                </section>
                <section className="App-section">
                    <p>First Names</p>
                    <NamesList nameType="first" 
                        names={firstNames}
                        handleSelectedName={(type,name)=>selectName(type,name)}/>
                    <p>Middle Names</p>
                    <NamesList nameType="middle" 
                        names={middleNames}
                        handleSelectedName={(type,name)=>selectName(type,name)}/>
                </section>
            </header>
        </div>
    );
}
export default App;
