import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Submitter from './Components/Submitter';
import News from './Components/News'; // Import News component
import Community from './Components/Community'; // Import Community component
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch" element={<Submitter />} />
          <Route path="/news" element={<News />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
