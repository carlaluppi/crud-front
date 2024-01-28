import React from 'react';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";

import ShowCoches from '../components/Coches/ShowCoches';
import CreateCoche from '../components/Coches/CreateCoche';
import EditCoche from '../components/Coches/EditCoche';


export default class PublicRoute extends React.Component {
    render() {
      return (
        <Router>
            <Routes>
            <Route path='/' element= {<ShowCoches/>}/>
          <Route path='/create' element= {<CreateCoche/>}/>  
          <Route path='/edit/:id' element= {<EditCoche/>}/>

            </Routes>
        </Router>
      );
    }
  }