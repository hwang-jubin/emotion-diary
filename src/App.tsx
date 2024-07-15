import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* 다른 Route들도 필요에 따라 추가 */}
      </Routes>
    </Router>
  );
}
export default App;
