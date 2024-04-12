import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Layout from "./components/Layout.js"

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

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Experience</h2>
    </div>
  );
}


export default App;
