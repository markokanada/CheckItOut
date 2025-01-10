import './App.css'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import TaskRecording from './taskRecording'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<main><h1>In development</h1></main>} />
        <Route path="/newTask" element={<TaskRecording />} />
        <Route path="/profile" element={<main><h1>In development - profile</h1></main>} />
      </Routes>
    </Layout>
  );
}

export default App;
