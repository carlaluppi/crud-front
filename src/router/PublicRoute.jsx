import React from 'react';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";

import ShowCoches from '../components/Coches/ShowCoches';
import CreateCoche from '../components/Coches/CreateCoche';
import EditCoche from '../components/Coches/EditCoche';
import ShowPropietarios from '../components/Propietarios/ShowPropietarios';
import CreatePropietario from '../components/Propietarios/CreatePropietario';
import EditPropietario from '../components/Propietarios/EditPropietario'

export default class PublicRoute extends React.Component {
    render() {
      return (
        <Router>
            <Routes>
            <Route path='/' element= {<ShowPropietarios/>}/>
            <Route path='/coches' element= {<ShowCoches/>}/>  
            <Route path='/createcoche' element= {<CreateCoche/>}/>  
            <Route path='/edit/:id' element= {<EditCoche/>}/>
            <Route path='/propietarios' element= {<ShowPropietarios/>}/>
            <Route path='/createpropietario' element= {<CreatePropietario/>}/>  
            <Route path='/editprop/:id' element= {<EditPropietario/>}/> 

            </Routes>
        </Router>
      );
    }
  }