import Home from './components/Home.js'
import Layout from "./components/Layout.js";
import NavBar from './components/NavBar.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route path="/about" element={<About />}/>
            <Route path="/experience" element={<Dashboard />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
      </Layout>
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
