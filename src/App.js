import Home from './components/Home.js'
import Layout from "./components/Layout.js";
import Experience from "./components/Experience.js";

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
            {/* <Route path="/about" element={<About />}/> */}
            <Route path="/experience" element={<Experience />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
      </Layout>
    </Router>

  );
}

export default App;
