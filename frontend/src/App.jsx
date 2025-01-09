import './App.css'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<main><h1>In development</h1></main>}/>
      </Routes>
      <Routes>
        <Route path='/newTask' element={<main><h1>In development - new task</h1></main>}/>
      </Routes>
      <Routes>
        <Route path='/profile' element={<main><h1>In development - profile</h1></main>}/>
      </Routes>
    </Layout>
  )
}

export default App
