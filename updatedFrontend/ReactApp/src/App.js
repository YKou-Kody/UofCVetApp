import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';
import Navigation from "./Navigation.js"
import Login from "./Login.js"
import BrowseAnimal from './Components/Animal/BrowseAnimal.js';
import useLogin from "./useLogin"
import HomeScreen from "./Components/User/HomeScreen.js"
import Register from './Components/User/Register';
import Requests from './Components/Request/Requests';
import Manage from './Components/User/Manage';
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {
  const { login, setLogin } = useLogin();
  const [requestView, setRequestView] = useState("");
  if (!login) {
    return <Login setLogin={setLogin} />
  }

  return (
    <div className="App">
      <Router>
        <Navigation requestView={requestView} setRequestView={setRequestView} />
        <Routes>

          <Route path="/animal" element={<div class="columns is-centered">
            <div class="column is-four-fifths is-centered">
              <BrowseAnimal useLogin={useLogin} />
            </div>
          </div>
          }>
          </Route>
          <Route path="" element={<HomeScreen useLogin={useLogin} />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="" element={<HomeScreen useLogin={useLogin} />} /> */}
          <Route path="/requests" element={<Requests requestView={requestView} setRequestView={setRequestView} />} />
          <Route path="/manage" element={<Manage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
