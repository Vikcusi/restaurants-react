import "./InputSearch.css"
import  SearchIcon from '../../assets/search.svg?react';

type inputProps = {
    value: string;
    onChange: (v: string) => void
}

export const InputSearch = ({value, onChange}: inputProps) => {
    
    return (
    <div className="input__wrapper">
        <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search for restaurants"/>
        <SearchIcon width={20} height={20} className="input__icon"/>
    </div>
    )
}