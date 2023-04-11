import './App.css';
import Navbar from './componants/Navbar';
import Home from './componants/Home';
import About from './componants/About';
import NoteState from './context/notes/noteState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './componants/Login';
import Singup from './componants/Singup';


function App() {
  return (
    <div>
    <NoteState>
         <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/Login" element={<Login/>} exact />
          <Route path="/SignUp" element={<Singup/>} exact />
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
