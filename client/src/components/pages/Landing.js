import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import M from "materialize-css";
import LinearLoadingSymbol from "../layout/LinearLoadingSymbol";
import './Landing.css'

require('dotenv').config()
const serverUrl = process.env.REACT_APP_SERVER_URL;

function Landing() {

    const [inventory, setInventory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shipmentItemId, setShipmentItemId] = useState(null);
    const [shipmentAmount, setShipmentAmount] = useState(null);

    useEffect(() => {
        getInventory().catch(err => console.log(err))
    }, [])

    async function getInventory() {
        window.scrollTo(0, 0);
        axios.get(`${serverUrl}/api/inventory`)
            .then(response => {
                setLoading(false);
                window.scrollTo(0, 0);
                setInventory(response.data);
                var elems = document.querySelectorAll('select');
                M.FormSelect.init(elems);
            })
            .catch(err => {
                setLoading(false);
                window.scrollTo(0, 0);
                M.toast({html: 'An error has occurred. Please try again', classes: "red lighten-1"});
            })
    }

    async function deleteItem(id) {
        axios.delete(`${serverUrl}/api/inventory/${id}`)
            .then(response => {
                M.toast({html: 'Deleted', classes: "green lighten-1"});
                getInventory();
            })
            .catch(err => {
                M.toast({html: 'An error has occurred. Please try again', classes: "red lighten-1"});
            })
    }
    async function makeShipment() {
        axios.post(`${serverUrl}/api/shipment`, { id: shipmentItemId, amount: shipmentAmount })
            .then(response => {
                M.toast({html: 'Shipment sent', classes: "green lighten-1"});
                getInventory();
            })
            .catch(err => {
                M.toast({html: err.response.data, classes: "red lighten-1"});
            })
    }

    let content;

    // If loading, render loading symbol
    if (loading || inventory === null) { 
        content = (<React.Fragment>
                        <i className="material-icons logo">public</i>
                        <LinearLoadingSymbol />
                        <h5 className="grey-text text-darken-2">
                            Loading...
                        </h5>
                    </React.Fragment>);
    }
    else if (inventory.length === 0) {
        content = (<h5 className="no-images grey-text text-darken-2">
                        No inventory found
                    </h5>);
    }
    else {
        const rows = inventory.map((item, index) => {
            return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                    <td>
                        <Link className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                            to={`/edit/${item.id}`}
                        >
                            Edit
                        </Link>
                        <button className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                            onClick={() => deleteItem(item.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>)}
        )

        content = (<table>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th></th>
              </tr>
            </thead>
    
            <tbody>
              { rows }
            </tbody>
          </table>);
    }

    const shipments = inventory ? inventory.map(item => <option value={item.id}>{item.name}</option>) : null;

    const shipmentForm = (
        <div>
        <h3>Shipments</h3>
        <div class="input-field col s12" style={{marginTop: "20px"}}>
            <select onChange={e => setShipmentItemId(e.target.value)}>
                <option value="" disabled selected>Choose inventory item</option>
                { shipments }
            </select>
            <label>Shipment Item</label>
        </div>
        <div className="input-field col s12">
            <input
                onChange={e => setShipmentAmount(parseInt(e.target.value) ?? 0)}
                value={shipmentAmount}
                id="amount"
                type="number"
            />
            <label htmlFor="amount">Amount</label>
        </div>
        <button
            style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
            }}
            onClick={() => makeShipment()}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            disabled={!shipmentAmount || (!shipmentItemId && shipmentItemId != 0)}
            >
                Send shipment
        </button>
        </div>
    )

    return (<div className="container" style={{marginBottom: "30px"}}>
                <div className="col s12 center-align" style={{paddingTop: "20px"}}>
                    <Link
                        to="/add"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Create new inventory item
                        </Link>
                </div>
                <div className="valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align" style={{marginBottom: "30px"}}>
                            { content }
                        </div>
                        { shipmentForm }
                    </div>
                </div>
            </div>);
}

export default Landing;