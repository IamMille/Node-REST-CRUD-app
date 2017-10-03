import React, {Component} from 'react';
import AllVehicles from "./components/AllVehicles";
import CancelBooking from "./components/CancelBooking";
import AddVehicle from "./components/AddVehicle";
import EditVehicle from "./components/EditVehicle";
import Menu from "./components/Menu";
import BookVehicle from "./components/BookVehicle";
import Render from './components/Render';
import './App.css';
import config from './config.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: true,
      location: '',
      bookVehicle: false,
      vehicleData: [],
      database: [],
      finished: false
    }
  }

  componentDidMount() {
    fetch(config.apiRoot + "vehicle/read?")
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          database: json.data,
          finished: true
        })
      })
      .catch(error => {
        console.error("API error:", error);
      });

    if (window.location.hash === '')
        window.location.hash = "#show";

      this.checkUrl()
    window.addEventListener("hashchange", () => {
      this.checkUrl()
    });
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
    const carId = target.getAttribute('data-id');
    //kom ihåg att lägga till && vehicle.bookable så att vi inte listar fordon som ej är tillgängliga för uthyrning
    const findCarInDatabase = this.state.database.filter(vehicle => vehicle._id.indexOf(carId) > -1);
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

        <Render if={this.state.location === 'add' && this.state.admin}>
          <AddVehicle/>
        </Render>

        <Render if={this.state.finished}>
        <EditVehicle
          if={this.state.location === 'edit' && this.state.admin}
          data={this.state.database}
        />
        </Render>

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
