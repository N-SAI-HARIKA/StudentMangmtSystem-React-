import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import StudentList from './StudentList';
import Register from './Register';
import StuDetails from './StuDetails';
import EditStu from './EditStu';
import DeleteStu from './DeleteStu';
const App = () => {
  return (
    <div className='App'>
      <h1>Student Management Portal</h1>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<StudentList/>}></Route>
        <Route path='/student/Register' element={<Register/>}></Route>
        <Route path='/student/Details/:id' element={<StuDetails/>}></Route>
        <Route path='/student/edit/:id' element={<EditStu/>}></Route>
        <Route path='/student/delete/:id' element={<DeleteStu/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
