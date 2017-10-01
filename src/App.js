import React, {Component} from 'react';
import './App.css';
import AllVehicles from "./AllVehicles";
import CancelBooking from "./CancelBooking";
import AddVehicle from "./AddVehicle";
import EditVehicle from "./EditVehicle";
import Menu from "./Menu";
import BookVehicle from "./BookVehicle";
import placeholderData from "./data.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: true,
      location: '',
      bookVehicle: false,
      vehicleData: [],
      database: []
    }
  }

  componentDidMount() {
    this.checkUrl();
    window.addEventListener("hashchange", () => {
      this.checkUrl()
    });

    this.setState({
      database: placeholderData
    })
  }

  checkUrl() {
    const currentLocation = window.location.hash.replace('#', '');
    this.setState({
      location: currentLocation
    })
  }

  handleLogin() {
    this.setState({
      admin: !this.state.admin
    })
  }

  vehicleBooking(event) {
    //för att se till att oavsett vad vi klickar på i listan så är event.target alltid ett li element
    let target = event.target;
    if (target.localName === 'span' || target.localName === 'div') {
      target = target.parentElement;
    } else if (target.localName === 'img') {
      target = target.parentElement.parentElement;
    }

    const carModel = target.children[2].innerText.toLowerCase();
    const findCarInDatabase = this.state.database.filter(vehicle => vehicle.model.toLowerCase().indexOf(carModel) > -1);
    console.log(findCarInDatabase);
    this.setState({
      vehicleData: findCarInDatabase,
      bookVehicle: true
    })
  };

  handleModal(event) {
    const target = event.target;
    if (target.localName === 'section' || target.innerText === 'Stäng') {
      this.setState({
        bookVehicle: !this.state.bookVehicle
      })
    }
  }

  render() {
    return (
      <div className={this.state.bookVehicle ? 'no-scroll App' : 'App'}>
        <Menu
          admin={this.state.admin}
          checkUrl={this.checkUrl.bind(this)}
          handleLogin={this.handleLogin.bind(this)}
        />
        <AllVehicles
          if={this.state.location === 'show'}
          data={this.state.database}
          vehicleBooking={this.vehicleBooking.bind(this)}
        />
        <CancelBooking
          if={this.state.location === 'cancel'}
        />
        <AddVehicle
          if={this.state.location === 'add' && this.state.admin}
        />
        <EditVehicle
          if={this.state.location === 'edit' && this.state.admin}
        />
        <BookVehicle
          if={this.state.bookVehicle === true}
          data={this.state.vehicleData}
          closeModal={this.handleModal.bind(this)}
        />
      </div>
    );
  }
}

export default App;
