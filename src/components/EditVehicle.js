import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class EditVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      selectedVehicle: [{
        _id: 'Välj ett id',
        type: "Trehjuling",
        brand: "Märke",
        model: "43i",
        year: 2015,
        price: 798,
        image: "https://url.se",
        bookable: true,
        notes: 'Det här är lite anteckningar'
      }]
    };
  }

  handleIdChange(event) {
    const select = event.target;
    const selectedId = select.value;
    const findById = this.state.data.filter(vehicle => vehicle._id.indexOf(selectedId) > -1);
    this.setState({
      selectedVehicle: findById
    });
    console.log(findById)
  }

  handleChange(event) {
    const target = event.target;
    const value = event.target.value;
    const oldState = this.state.selectedVehicle;
    if (target.type === 'radio') {
      console.log(target, value)
      oldState[0].bookable = !oldState[0].bookable;
      this.setState({
        selectedVehicle: oldState
      })
    } else {
      oldState[0][target.id] = value;
      this.setState({
        selectedVehicle: oldState
      })
    }
  }

  handleSubmit() {
    console.log(this.state.selectedVehicle);
  }
  render() {
    if (this.props.if) {
      console.log(this.state.selectedVehicle, '-----')
      return (
        <section className="edit-vehicle">
          <h1 className="section-heading">Redigera fordon</h1>
          <p>OBS! MYCKET AV DENNA HTML ÄR FIXAD/ÄNDRAD I COMPONENTEN [AddVehicles]</p>
          <form action="">
            <div className="form-group-container">
              <label htmlFor="vehicle-id">Fordons-id</label>
              <select onChange={this.handleIdChange.bind(this)} value={this.state.selectedVehicle[0]._id}>
                <option value={this.state.selectedVehicle[0]._id}>{this.state.selectedVehicle[0]._id}</option>
                {this.props.data.map((id, index) => {
                  return (
                    <option value={id._id} key={index}>{id._id}</option>
                  );
                })}
              </select>
            </div>
            <div className="form-group-container">
              <label htmlFor="type">Fordonstyp</label>
              <input type="text" placeholder="Personbil" id="type" value={this.state.selectedVehicle[0].type || 'Ingen' +
              ' data'} onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="form-group-container">
              <label htmlFor="license">Körkort</label>
              <select value={this.state.selectedVehicle[0].license || 'Ingen data'} onChange={this.handleChange.bind(this)} id="license">
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
              <input type="text" placeholder="Mazda" id="brand" value={this.state.selectedVehicle[0].brand || 'Ingen' +
              ' data'} onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="form-group-container">
              <label htmlFor="model">Modell</label>
              <input type="text" placeholder="321i" id="model" value={this.state.selectedVehicle[0].model || 'Ingen' +
              ' data'} onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="form-group-container">
              <label htmlFor="year">År</label>
              <input type="text" placeholder="1995" id="year" value={this.state.selectedVehicle[0].year || 'Ingen' +
                ' data'} onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="form-group-container">
              <label htmlFor="gearbox">Växellåda</label>
              <select value={this.state.selectedVehicle[0].gearbox || 'Ingen data'} onChange={this.handleChange.bind(this)} id="gearbox">
                <option value="manuell">Manuell</option>
                <option value="automat">Automat</option>
              </select>
            </div>
            <div className="form-group-container">
              <label htmlFor="price">Dagshyra</label>
              <input type="text" placeholder="999" id="price" value={this.state.selectedVehicle[0].price || 'Ingen' +
              ' data'} onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="form-group-container-full">
              <label htmlFor="image">Bildlänk</label>
              <input type="text" placeholder="http://url.se" id="image" value={this.state.selectedVehicle[0].image || 'Ingen data'} onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="form-group-container-full">
              <label htmlFor="notes" className="block">Noteringar</label>
              <textarea name="notes" id="notes" placeholder="Bilen är nästan trasig."  value={this.state.selectedVehicle[0].notes || 'Ingen' +
              ' data'} onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="form-group-container-full">
              <label htmlFor="available-for-rent">Tillgänglig för uthyrning:</label>
              <label htmlFor="available-for-rent-true">Ja</label>
              <input type="radio" id="available-for-rent-true" name="hire" value={true} checked={this.state.selectedVehicle[0].bookable} onChange={this.handleChange.bind(this)}/>
              <label htmlFor="available-for-rent-false">Nej</label>
              <input type="radio" id="available-for-rent-false" name="hire" value={false} checked={!this.state.selectedVehicle[0].bookable} onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="form-group-container-full">
              <button className="button" type="button" onClick={this.handleSubmit.bind(this)}>Redigera</button>
            </div>
            <div className="form-group-container-full">
              <button className="button button-danger">Ta bort fordon</button>
            </div>
          </form>
        </section>
      );
    } else {
      return null;
    }
  }
}

EditVehicle.propTypes = {
  if: PropTypes.bool.isRequired
};
