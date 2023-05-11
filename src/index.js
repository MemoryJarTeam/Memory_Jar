import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LogIn } from './components/logIn';
import { SignUp } from './components/signUp';
import { UserSettings } from './components/userSetting';
import { MainPage } from './components/mainPage';
import { AddJar } from './components/addJar';
import { MemoryWriting } from './components/memoryWriting';
import { Intro } from './components/intro';
import { KeyWord } from './components/keyWord';
import { Memory } from './components/memory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<App/>}
      />
      <Route
        path="/intro"
        element={<Intro/>}
      />
      <Route
        path="/login"
        element={<LogIn/>}
      />
      <Route
        path="/sign-up"
        element={<SignUp/>}
      />
      <Route
        path="/user-setting"
        element={<UserSettings/>}
      />
      <Route
        path="/main-page"
        element={<MainPage/>}
      />
      <Route
        path="/new-jar"
        element={<AddJar/>}
      />
      <Route
        path="/new-memory"
        element={<MemoryWriting/>}
      />
      <Route
        path="/keyword"
        element={<KeyWord/>}
      />
      <Route
        path="/calendar"
        element={<Intro/>}
      />
      <Route
        path="/memory"
        element={<Memory/>}
      />
    </Routes>
  </BrowserRouter>
);
