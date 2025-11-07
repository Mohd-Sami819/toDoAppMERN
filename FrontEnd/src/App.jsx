import './style/app.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './components/List'
import UpdateTask from './components/updateTask'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Protected from './components/Protected'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Protected><List/></Protected>}/>
        <Route path='/add' element={<Protected><AddTask/></Protected>}/>
        <Route path='/update/:id' element={<UpdateTask/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
