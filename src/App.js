import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <div>
        <Dashboard/>
      </div>
    </Router>
  );
}

export default App;
