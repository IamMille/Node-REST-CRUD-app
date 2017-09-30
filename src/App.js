import React, {Component} from 'react';
import './App.css';
import AllVehicles from "./AllVehicles";
import CancelBooking from "./CancelBooking";
import AddVehicle from "./AddVehicle";
import RemoveVehicle from "./RemoveVehicle";
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
        bookDates: [],
        notes: 'String'
      },
      database: ''
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

  vehicleBooking(event) {
    //för att se till att oavsett vad vi klickar på i listan så är event.target alltid ett li element
    let target = event.target;
    if (event.target.localName === 'span' || event.target.localName === 'div') {
      target = event.target.parentElement;
    } else if (event.target.localName === 'img') {
      target = event.target.parentElement.parentElement;
    }

    const model = target.children[2].innerText.toLowerCase();
    const findCarInDatabase = this.state.database.filter(a => a.model.toLowerCase().indexOf(model) > -1);
    console.log(findCarInDatabase);
    this.setState({
      vehicleData: findCarInDatabase,
      bookVehicle: true
    })
  };

  handleModal() {
    console.log('asd')
    this.setState({
      bookVehicle: !this.state.bookVehicle
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
        <AllVehicles
          data={this.state.database}
          vehicleBooking={this.vehicleBooking.bind(this)}
        />
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
          closeModal={this.handleModal.bind(this)}
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
