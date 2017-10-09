import React, {Component} from 'react';
import PropTypes from 'prop-types';
import config from '../config.json';

export default class EditVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleData: this.props.data
        }
    }

    componentDidMount() {
        console.log(this.state.vehicleData)
    }

    componentWillReceiveProps() {
        console.log('recieved new props')
        this.setState({
            vehicleData: this.props.data
        })
    }

    serializeUpdateObject(obj) {
        return Object.keys(obj).map(prop => {
            if (prop === '_id') {
                return false;
            }
            return encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop])
        }).join('&')
    };

    handleChange(event) {
        const target = event.target;
        const value = event.target.value;
        const oldState = this.state.vehicleData;
        if (target.type === 'radio') {
            oldState[0].bookable = !oldState[0].bookable;
            this.setState({
                vehicleData: oldState
            })
        } else {
            oldState[0][target.id] = value;
            this.setState({
                vehicleData: oldState
            })
        }
    }

    handleDelete() {
        const [deleteVehicle] = this.state.vehicleData; // first item

        // TODO: delete all bookings associated with car
        fetch(config.apiRoot + "vehicle/delete/" + deleteVehicle._id)
            .then(resp => resp.json())
            .then(json => {
                // show success message to the user
                console.log("API response:", json);
                this.props.handleSuccessMessage(json);
            })
            .catch(error => {
                // show error message to the user (validation is handles by the api/model)
                console.error("API error:", error);
                this.props.handleErrorMessage(error.message);
            });

        // close modal
        this.props.setState({editVehicle: false});

        // uppdate global state
        let updatedDatabase = this.props.getState.database.filter(
            vehicle => (vehicle._id !== deleteVehicle._id)
        );

        this.props.setState({database: updatedDatabase});
    }

    handleSubmit() {
        let [updatedVehicle] = this.state.vehicleData; // first item

        fetch(config.apiRoot + "vehicle/update/" + updatedVehicle._id + '?' + this.serializeUpdateObject(updatedVehicle))
            .then(resp => resp.json())
            .then(json => {
                console.log("API response:", json);
                this.props.handleSuccessMessage(json);

                if (json.result === 'ok') {
                    // close modal
                    this.props.setState({editVehicle: false});

                    // uppdate global state
                    let updatedDatabase = this.props.getState.database.map(vehicle => {
                        return vehicle._id === updatedVehicle._id
                            ? updatedVehicle
                            : vehicle;
                    });

                    this.props.setState({database: updatedDatabase});
                }
            })
            .catch(error => {
                // show error message to the user (validation is handles by the api/model)
                console.error("API error:", error);
                this.props.handleErrorMessage(error.message);
            });
    }

    render() {
        //this.state.vehicleData.length > 0) return null;
        //if ( !this.props.dataIsFinished) return null
        //console.log(this.props.data, '---render editvehicles');

        return <section className="edit-vehicle" onClick={this.props.closeEditModal}>
            <div className="edit-vehicle-container">

                <h1 className="section-heading">Redigera fordon</h1>

                <form action="">
                    <div className="form-group-container">
                        <label htmlFor="type">Fordonstyp</label>
                        <input type="text" placeholder="ex. Personbil" id="type"
                               value={this.state.vehicleData[0].type}
                               onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group-container">
                        <label htmlFor="license">Körkort</label>
                        <select value={this.state.vehicleData[0].license || ""}
                                onChange={this.handleChange.bind(this)} id="license">
                            <option value="" disabled>Välj</option>
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
                               value={this.state.vehicleData[0].brand}
                               onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group-container">
                        <label htmlFor="model">Modell</label>
                        <input type="text" placeholder="ex. 321i" id="model"
                               value={this.state.vehicleData[0].model}
                               onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group-container">
                        <label htmlFor="year">År</label>
                        <input type="text" placeholder="ex. 1995" id="year"
                               value={this.state.vehicleData[0].year}
                               onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group-container">
                        <label htmlFor="gearbox">Växellåda</label>
                        <select value={this.state.vehicleData[0].gearbox || ""}
                                onChange={this.handleChange.bind(this)} id="gearbox">
                            <option value="" disabled>Välj</option>
                            <option value="manuell">Manuell</option>
                            <option value="automat">Automat</option>
                        </select>
                    </div>
                    <div className="form-group-container">
                        <label htmlFor="price">Dagshyra</label>
                        <input type="text" placeholder="ex. 999" id="price"
                               value={this.state.vehicleData[0].price}
                               onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group-container">
                        <label htmlFor="fuel">Drivmedel</label>
                        <select id="fuel" onChange={this.handleChange.bind(this)}
                                value={this.state.vehicleData[0].fuel || ""}>
                            <option value="" disabled>Välj</option>
                            <option value="95">95</option>
                            <option value="E85">E85</option>
                            <option value="diesel">diesel</option>
                            <option value="gas">gas</option>
                            <option value="jetbränsle">jetbränsle</option>
                        </select>
                    </div>
                    <div className="form-group-container-full">
                        <label htmlFor="image">Bildlänk</label>
                        <input type="text" placeholder="ex. http://url.se" id="image"
                               value={this.state.vehicleData[0].image}
                               onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group-container-full">
                        <label htmlFor="note" className="block">Noteringar</label>
                        <textarea name="note" id="note" placeholder="ex. Bilen är nästan trasig."
                                  value={this.state.vehicleData[0].note}
                                  onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group-container-full">
                        <label htmlFor="available-for-rent">Tillgänglig för uthyrning:</label>
                        <label htmlFor="available-for-rent-true">Ja</label>
                        <input type="radio" id="available-for-rent-true" name="hire" value={true}
                               checked={this.state.vehicleData[0].bookable}
                               onChange={this.handleChange.bind(this)}/>
                        <label htmlFor="available-for-rent-false">Nej</label>
                        <input type="radio" id="available-for-rent-false" name="hire" value={false}
                               checked={!this.state.vehicleData[0].bookable}
                               onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="button-container">
                        <div className="form-group-container-full">
                            <button className="button" type="button" onClick={this.handleSubmit.bind(this)}>Spara
                            </button>
                        </div>
                        <div className="form-group-container-full">
                            <button className="button button-danger" type="button"
                                    onClick={this.handleDelete.bind(this)}>Ta bort fordon
                            </button>
                        </div>
                        <div className="form-group-container-full">
                            <button className="button button-danger" type="button"
                                    onClick={this.props.closeEditModal}>Stäng
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>;
    }
}

EditVehicle.propTypes = {
    data: PropTypes.array.isRequired
};
