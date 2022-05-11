import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios"
import M from "materialize-css";

require('dotenv').config()
const serverUrl = process.env.REACT_APP_SERVER_URL;

function Edit(props) {

    const { id } = useParams()
    const [name, setName] = useState(" ");
    const [description, setDescription] = useState(" ");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        getItem().catch(err => console.log(err))
    }, [])

    async function getItem() {
        window.scrollTo(0, 0);
        axios.get(`${serverUrl}/api/inventory/${id}`)
            .then(response => {
                window.scrollTo(0, 0);
                setName(response.data.name);
                setDescription(response.data.description);
                setAmount(response.data.amount);
            })
            .catch(err => {
                window.scrollTo(0, 0);
                M.toast({html: 'An error has occurred. Please try again', classes: "red lighten-1"});
            })
    }

    function onSubmit(e) {
        e.preventDefault();
        const item = {
            name: name,
            description: description,
            amount: amount
        }
        axios.put(`${serverUrl}/api/inventory/${id}`, { inventory: item })
            .then(response => {
                props.history.replace("/");
            })
            .catch(err => M.toast({html: 'An error has occurred. Please try again', classes: "red lighten-1"}));
    };

    return (
        <div className="container">
            <div style={{ marginTop: "4rem", marginBottom:"5rem" }} className="row">
                <div className="col s8 offset-s2">
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Edit Item</b>
                        </h4>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                    <div className="input-field col s12">
                        <input
                            onChange={e => setName(e.target.value)}
                            value={name}
                            id="name"
                            type="text"
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            id="description"
                            type="text"
                        />
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={e => setAmount(parseInt(e.target.value) ?? 0)}
                            value={amount}
                            id="amount"
                            type="number"
                        />
                        <label htmlFor="amount">Amount</label>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        disabled={(!amount && amount !== 0) || !name || !description}
                        >
                            Edit
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Edit;