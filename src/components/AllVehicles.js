import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AllVehicles extends Component
{
    render() {
        if (!this.props.data.length) return null;

        // if not admin, show only bookable
        let allVehicles = this.props.isAdmin
            ? this.props.data
            : this.props.data.filter(v => v.bookable);

        console.log('render allvehicles');
        return <section className="all-vehicles">

            <h1 className="section-heading">Alla fordon</h1>

            <div className="filter-container">
                <h3 className="section-heading">Filter</h3>
                <div className="form-group-container">
                    <label htmlFor="gearbox">Växellåda</label>
                    <select id="gearbox">
                        <option value="manuell">Manuell</option>
                        <option value="automat">Automat</option>
                    </select>
                </div>
                <div className="form-group-container">
                    <label htmlFor="type">Typ</label>
                    <select id="type">
                        <option value="car">Personbil</option>
                        <option value="motorcycle">Motorcykel</option>
                        <option value="atv">ATV</option>
                        <option value="tricycle">Trehjuling</option>
                        <option value="truck">Lätt lastbil</option>
                    </select>
                </div>
            </div>

            <div className="vehicle-search-head">
                <span>Bild</span>
                <span>Märke</span>
                <span>Modell</span>
                <span>Typ</span>
                <span>Dygnspris</span>
            </div>

            <ul>
                {allVehicles.map((vehicle, index) => {
                    return (
                        <li key={index} data-id={vehicle._id}
                            onClick={this.props.handleClick}>
                            <div className="image-container">
                                <img src={vehicle.image || "http://via.placeholder.com/150x150"} alt=""
                                     width="120"/>
                            </div>
                            <span>{vehicle.brand || 'Ingen data'}</span>
                            <span>{vehicle.model || 'Ingen data'}</span>
                            <span>{vehicle.type || 'Ingen data'}</span>
                            <span>{vehicle.price || 'Ingen data'}</span>
                        </li>
                    );
                })}
            </ul>

        </section>;
    }
}
//bild, brand, model, (typ av bil), pris

AllVehicles.propTypes = {
    data: PropTypes.array.isRequired,
};

// TODO: check if merged correctly