import './App.css'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import TaskRecording from './taskRecording'
import Home from './pages/Home'

function App() {
  return (
    <Layout>
      <Routes> 
        <Route path='/' element={<Home />}/>
     </Routes>
     <Routes>
        <Route path="/newTask" element={<TaskRecording />} />
     </Routes>
     <Routes>
        <Route path='/profile' element={<main><h1>In development - profile</h1></main>}/>
      </Routes>
    </Layout>
  );
}

export default App;
