import './App.css';
import Layout from './components/Layout';
import { NavigateFunction, Route, Routes } from 'react-router-dom';
import TaskRecording from './pages/taskRecording';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { Component } from 'react';
import Landing from './pages/Landing';
import { computed, makeObservable } from 'mobx';
import ViewComponent from './interfaces/ViewComponent';

export default class App implements ViewComponent{
  constructor(private navigate: NavigateFunction ) {
    makeObservable(this);
  }

  @computed get login(): ViewComponent {
    return new Login(this.navigate); 
  }

  @computed get landing(): ViewComponent {
    return new Landing(this.navigate); 
  }

  View = () =>
     (
      <Layout>
        <Routes>
          <Route path='/' element={<this.landing.View/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/newTask' element={<TaskRecording />} />
          <Route path='/profile' element={<main><h1>In development - profile</h1></main>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<this.login.View/>} />
        </Routes>
      </Layout>
    );
  }
