import React, {Component} from 'react';
import PropTypes from 'prop-types';
import config from '../config.json';

export default class EditVehicle extends Component {
    render() {
        if (this.props.if) {
            console.log(this.props.data, '---render');
            return (
                <section className="edit-vehicle" onClick={this.props.closeModal}>
                    <div className="edit-vehicle-container">
                        <h1 className="section-heading">Redigera fordon</h1>
                        <form action="">
                            <div className="form-group-container">
                                <label htmlFor="type">Fordonstyp</label>
                                <input type="text" placeholder="ex. Personbil" id="type"
                                       value={this.props.data[0].type}
                                       onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group-container">
                                <label htmlFor="license">Körkort</label>
                                <select value={this.props.data[0].license}
                                        onChange={this.props.handleChange} id="license">
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
                                <label htmlFor="brand">Märke</label>
                                <input type="text" placeholder="ex. Mazda" id="brand"
                                       value={this.props.data[0].brand}
                                       onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group-container">
                                <label htmlFor="model">Modell</label>
                                <input type="text" placeholder="ex. 321i" id="model"
                                       value={this.props.data[0].model}
                                       onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group-container">
                                <label htmlFor="year">År</label>
                                <input type="text" placeholder="ex. 1995" id="year"
                                       value={this.props.data[0].year}
                                       onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group-container">
                                <label htmlFor="gearbox">Växellåda</label>
                                <select value={this.props.data[0].gearbox}
                                        onChange={this.props.handleChange} id="gearbox">
                                    <option value="manuell">Manuell</option>
                                    <option value="automat">Automat</option>
                                </select>
                            </div>
                            <div className="form-group-container">
                                <label htmlFor="price">Dagshyra</label>
                                <input type="text" placeholder="ex. 999" id="price"
                                       value={this.props.data[0].price}
                                       onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group-container-full">
                                <label htmlFor="image">Bildlänk</label>
                                <input type="text" placeholder="ex. http://url.se" id="image"
                                       value={this.props.data[0].image}
                                       onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group-container-full">
                                <label htmlFor="note" className="block">Noteringar</label>
                                <textarea name="note" id="note" placeholder="ex. Bilen är nästan trasig."
                                          value={this.props.data[0].note}
                                          onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group-container-full">
                                <label htmlFor="available-for-rent">Tillgänglig för uthyrning:</label>
                                <label htmlFor="available-for-rent-true">Ja</label>
                                <input type="radio" id="available-for-rent-true" name="hire" value={true}
                                       checked={this.props.data[0].bookable}
                                       onChange={this.props.handleChange}/>
                                <label htmlFor="available-for-rent-false">Nej</label>
                                <input type="radio" id="available-for-rent-false" name="hire" value={false}
                                       checked={!this.props.data[0].bookable}
                                       onChange={this.props.handleChange}/>
                            </div>
                            <div className="form-group-container-full">
                                <button className="button" type="button" onClick={this.props.handleSubmit}>Redigera
                                </button>
                            </div>
                            <div className="form-group-container-full">
                                <button className="button button-danger" type="button"
                                        onClick={this.props.handleDelete}>Ta bort fordon
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            );
        } else {
            return null;
        }
    }
}

EditVehicle.propTypes = {
    if: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired
};
