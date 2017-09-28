import React, {Component} from 'react';
import './App.css';
import AllVehicles from "./AllVehicles";
import CancelBooking from "./CancelBooking";
import AddVehicle from "./AddVehicle";
import RemoveVehicle from "./RemoveVehicle";
import EditVehicle from "./EditVehicle";
import Menu from "./Menu";
import BookVehicle from "./BookVehicle";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: true,
      location: '',
      bookVehicle: true,
      vehicleData: {
        type: "personbil",
        license: "B",
        brand: "Mazda",
        model: "323i",
        year: 1991,
        gearbox: "manuell",
        price: 298,
        image: "https://linktofile.jpg",
        bookable: true,
        bookDates: []
      }
    }
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.checkUrl()
    })
  }

  checkUrl() {
    console.log('sdöklfjsdlkjf');
    switch (window.location.hash) {
      case '#add':
        this.setState({
          location: 'add'
        });
        break;
      case '#show':
        this.setState({
          location: 'show'
        });
        break;
      case '#book':
        this.setState({
          location: 'book'
        });
        break;
      case '#cancel':
        this.setState({
          location: 'cancel'
        });
        break;
      case '#remove':
        this.setState({
          location: 'remove'
        });
        break;
      case '#edit':
        this.setState({
          location: 'edit'
        });
        break;
      default:
        break;
    }
  }

  handleLogin() {
    this.setState({
      admin: !this.state.admin
    })
  }

  render() {
    return (
      <div className="App">
        <Menu
          admin={this.state.admin}
          checkUrl={this.checkUrl.bind(this)}
          handleLogin={this.handleLogin.bind(this)}
        />
        {this.state.location === 'show' &&
        <AllVehicles/>
        }
        {this.state.location === 'cancel' &&
        <CancelBooking/>
        }
        {this.state.admin &&
        <div>
          {this.state.location === 'add' &&
          <AddVehicle/>
          }
          {this.state.location === 'remove' &&
          <RemoveVehicle/>
          }
          {this.state.location === 'edit' &&
          <EditVehicle/>
          }
        </div>
        }
        {this.state.bookVehicle &&
        <BookVehicle
          data={this.state.vehicleData}
        />
        }
      </div>
    );
  }
}
/*
  data.forEach(el => {
    var x = "gearbox" in el ? el.gearbox : 'unknown'
    var x = el.gearbox || 'Unknown'
})
 */

export default App;
