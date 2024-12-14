import 'bootstrap/dist/css/bootstrap.min.css'
import AddItem from './Components/AddItem'
import DisplayItem from './Components/DisplayItem'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">CRUD Operations</h1>

        {/* Navigation Links */}
        <nav className="nav justify-content-center mb-4">
          <Link className="nav-link" to="/add">Add Item</Link>
          <Link className="nav-link" to="/">Display Items</Link>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/add" element={<AddItem />} />
          <Route path="/" element={<DisplayItem />} />
        </Routes>
      </div>
    </Router>
  );
  
}

export default App
