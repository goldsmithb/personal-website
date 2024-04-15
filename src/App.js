import logo from './logo.svg';
import Home from './components/Home.js'
import NavBar from './components/NavBar.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Layout from "./components/Layout.js"

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/about" element={<About />}/>
          <Route path="/experience" element={<Dashboard />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
    </Router>

  );
}

function About() {
  return (
    <div>
			<NavBar />

      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
			<NavBar />

      <h2>Experience</h2>
    </div>
  );
}


export default App;
