import React, {useState} from "react";
import options from "../data/data";
import { Form } from "semantic-ui-react";

export default function SearchBar({ handleSearch }) {
    const [state, setState] = useState({
        search: ''
    })


    const handleSelect = (e, value ) => setState({ [value.name]: value.value })


    function handleSubmit() {
        handleSearch(state.search)
    }

    return (
        <>
            <Form.Select
                placeholder='search by state or province'
                options={options}
                name='search'
                onChange={handleSelect}
                required
            />
            <button onClick={handleSubmit}><i className="search icon"></i></button>
        </>
    )
}
