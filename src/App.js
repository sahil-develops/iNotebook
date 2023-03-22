import { useState } from 'react';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';



function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 2500);
  }

  return (
<>
<NoteState>
<Router>
<Navbar/>
<Alert message="This is a React Course" alert={alert}  />
  <Routes>
  <Route exact path="/" element={<Home showAlert={showAlert} />}/>
  <Route exact path="/about" element={<About/>} />
  <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
  <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
</Routes>
</Router>
</NoteState>
</>  );
}

export default App;
