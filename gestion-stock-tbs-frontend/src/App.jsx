import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ListIphonesComponent />}></Route>
            <Route exact path='/iphones' element={<ListIphonesComponent />}></Route>
            <Route exact path='/add-iphone' element={<AddIphoneComponent />}></Route>
            <Route exact path='/edit-iphone/:id' element={<AddIphoneComponent />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
