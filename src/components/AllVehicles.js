import React, {Component} from 'react';
import PropTypes from 'prop-types';
import config from '../config.json';
import Render from './Render';

export default class AllVehicles extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            gearbox: '',
            type: ''
        };
    }

    handleChange = (event) => {
        const {id, value} = event.target;
        this.setState({[id]: value});
        console.log("handelChange:", value);

        let filters = {...this.state, [id]: value};

        for (let prop in filters) {
            if (filters[prop] === '')
                delete filters[prop]
        }

        fetch(config.apiRoot + "vehicle/read?" + this.serializeUpdateObject(filters))
            .then(resp => resp.json())
            .then(json => {
                this.props.setState({database: json.data.reverse()});
                console.log("API response (filter):", json.data);
                this.props.handleSuccessMessage(json)
            })
            .catch(error => {
                console.error("API error:", error);
                this.props.handleErrorMessage(error)
            });
    };

    serializeUpdateObject(obj) {
        return Object.keys(obj).map(prop => {
            return encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop])
        }).join('&')
    };

    render() {
        // if not admin, show only bookable -- SECURITY RISK
        let allVehicles = this.props.isAdmin
            ? this.props.data
            : this.props.data.filter(v => v.bookable);

        //console.log('render allvehicles');

        return <section className="all-vehicles">
            <h1 className="section-heading">Alla fordon</h1>

            <div className="filter-container">
                <h3 className="section-heading">Filter</h3>
                <div className="center-select">

                    <div className="form-group-container">
                        <label htmlFor="license">Körkort</label>
                        <select id="license" onChange={this.handleChange} value={this.state.license}>
                            <option value="">Visa alla</option>
                            <option value="A">A</option>
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="AM">AM</option>
                            <option value="B">B</option>
                            <option value="BE">BE</option>
                            <option value="C">C</option>
                            <option value="CE">CE</option>
                            <option value="C1">C1</option>
                            <option value="C1E">C1E</option>
                            <option value="D">D</option>
                            <option value="D1E">D1E</option>
                        </select>
                    </div>

                    <div className="form-group-container">
                        <label htmlFor="gearbox">Växellåda</label>
                        <select id="gearbox" onChange={this.handleChange} value={this.state.gearbox}>
                            <option value="">Visa alla</option>
                            <option value="manuell">Manuell</option>
                            <option value="automat">Automat</option>
                        </select>
                    </div>

                    <div className="form-group-container">
                        <label htmlFor="fuel">Drivmedel</label>
                        <select id="fuel" onChange={this.handleChange} value={this.state.fuel}>
                            <option value="">Visa alla</option>
                            <option value="95">95</option>
                            <option value="E85">E85</option>
                            <option value="diesel">diesel</option>
                            <option value="gas">gas</option>
                            <option value="jetbränsle">jetbränsle</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="vehicle-search-head">
                <span>Bild</span>
                <span>Märke</span>
                <span>Modell</span>
                <span>Typ</span>
                <span>Dygnspris</span>
            </div>

            <Render if={allVehicles.length === 0}>
                <p className="filter-message">Inget matchar ditt filter</p>
            </Render>

            <Render if={allVehicles.length > 0}>
                <ul>
                    {allVehicles.map((vehicle, index) => {
                        return (
                            <li key={index} data-id={vehicle._id}
                                onClick={this.props.handleClick}>
                                <div className="image-container">
                                    <img src={vehicle.image || "https://loslonelyboysmovie.com/wp-content/uploads/2017/06/1644c9b3a6faa81a6b9ad3c39ea80858-300x164.jpg"} alt=""
                                         width="120"/>
                                </div>
                                <span>{vehicle.brand || 'Ingen data'}</span>
                                <span>{vehicle.model || 'Ingen data'}</span>
                                <span>{vehicle.type || 'Ingen data'}</span>
                                <span>{!vehicle.price ? 'Ingen data' : vehicle.price + ':-'}</span>
                                <br/>
                            </li>
                        );
                    })}
                </ul>
            </Render>

        </section>;
    }
}
//bild, brand, model, (typ av bil), pris

AllVehicles.propTypes = {
    data: PropTypes.array.isRequired,
};