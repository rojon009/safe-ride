import React from 'react';
import { useForm } from "react-hook-form";
import './SearchForm.css'

const SearchForm = ({setDirection}) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        setDirection(data);
    };


    return (
            <div className="search-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="from">Pick From</label>
                    <input id="from" name="from" type="text" placeholder="Pick From" ref={register({ required: true })} />
                    {errors.from && <span className="error">This field is required</span>}
                    <label htmlFor="to">Pick To</label>
                    <input id="to" name="to" type="text" placeholder="Pick To" ref={register({ required: true })} />
                    {errors.to && <span className="error">This field is required</span>}
                    <input type="submit" value="Search" />
                </form>
            </div>
    );
}

export default SearchForm;;