import React, { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import { Login } from './Pages/Login';
import { ChoiceDept } from './Pages/ChoiceDept';
import { ChoiceEmplyee } from './Pages/ChoiceEmplyee';
import { ForgotPass } from './Pages/ForgotPass';
import { ToastContainer, toast } from 'react-toastify';

import { SetnesPassword } from './Pages/SetnesPassword';

import { Dashboard } from './Pages/Dashboard'


import { Passcode } from './Pages/Passcode';

import { VerifyForm } from './Pages/VerifyForm';

function App() {


  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Departmemt" element={<ChoiceDept />} />
        <Route path="/Employee" element={<ChoiceEmplyee />} />
        <Route path="/Verify" element={<VerifyForm />} />

        <Route path="/Passcode" element={<Passcode />} />

        <Route path="/ForgotPassword" element={<ForgotPass />} />
        <Route path="/setNew" element={<SetnesPassword />} />

        <Route path="/Dashboard" element={<Dashboard />} />



      </Routes>
      <ToastContainer />

    </React.Fragment>
  )
}

export default App
