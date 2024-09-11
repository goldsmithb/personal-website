import Home from './components/Home.js'
import Layout from "./components/Layout.js";
import Experience from "./components/Experience.js";
import ContactPage from './components/ContactPage.js';
import Blog from './components/Blog.js';
import { VariableProvider } from "./context/VariableProvider.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <VariableProvider>
      <Router>
        <Layout>
          <Routes>
              {/* <Route path="/about" element={<About />}/> */}
              <Route path="/" element={<Home />}/>''
              <Route path="/experience" element={<Experience />}/>
              <Route path="/blog" element={<Blog />}/>
              <Route path="/contact" element={<ContactPage />}/>
            </Routes>
        </Layout>
      </Router>
    </VariableProvider>
  

  );
}

export default App;
