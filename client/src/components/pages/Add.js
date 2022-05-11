import React, { useState } from 'react';
import axios from "axios"
import M from "materialize-css";

require('dotenv').config()
const serverUrl = process.env.REACT_APP_SERVER_URL;

function Add(props) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(null);

    function onSubmit(e) {
        e.preventDefault();
        const item = {
            name: name,
            description: description,
            amount: amount
        }
        axios.post(`${serverUrl}/api/inventory`, { inventory: item })
            .then(response => {
                props.history.replace("/");
            })
            .catch(err => M.toast({html: err.response.data, classes: "red lighten-1"}));
    };

    return (
        <div className="container">
            <div style={{ marginTop: "4rem", marginBottom:"5rem" }} className="row">
                <div className="col s8 offset-s2">
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Create Inventory Item</b>
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
                        disabled={!amount || !name || !description}
                        >
                            Create
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add;