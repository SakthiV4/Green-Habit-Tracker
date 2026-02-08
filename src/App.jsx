import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AIAssistant from './pages/AIAssistant'
import Calculator from './pages/Calculator'
import Challenges from './pages/Challenges'
import Alternatives from './pages/Alternatives'
import Directory from './pages/Directory'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<AIAssistant />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="alternatives" element={<Alternatives />} />
          <Route path="directory" element={<Directory />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
