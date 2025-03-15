import './App.css'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import TaskRecording from './pages/taskRecording'
import Home from './pages/Home'
import Register from './pages/Register';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/newTask" element={<TaskRecording />} />
      </Routes>
      <Routes>
        <Route path='/profile' element={<main><h1>In development - profile</h1></main>} />
      </Routes>

      <Routes>
        <Route path='/register' element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;
