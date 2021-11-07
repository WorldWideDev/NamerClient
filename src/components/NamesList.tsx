import React, {Component} from 'react';
import './NamesList.css';
import Name from '../models/Name';

export type NameType = "middle" | "first";
interface NamesListProps {
    nameType:NameType,
    names:Name[]
    handleSelectedName: (type:NameType, name:Name) => void
}
const NamesList:React.FC<NamesListProps> = props => {
    const {names, nameType, handleSelectedName} = props;
    return (
        <ul>
            {names.map(name => 
                <li onClick={()=>handleSelectedName(nameType, name)}
                    key={name.id}>{name.name}</li>)}
        </ul>
    )
}
export default NamesList;
