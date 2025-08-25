import { useState } from 'react'
import './App.css'
import ListIphonesComponent from './components/ListIphonesComponent'
import { HeaderComponent } from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import AddIphoneComponent from './components/AddIphoneComponent'

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className='container-fluid px-4'>
          <Routes>
            <Route exact path='/' element={<ListIphonesComponent />}></Route>
            <Route path='/iphones' element={<ListIphonesComponent />}></Route>
            <Route path='/add-iphone' element={<AddIphoneComponent />}></Route>
            <Route path='/edit-iphone/:id' element={<AddIphoneComponent />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
