//router.js
//pretend we imported all of our components
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import PublicComponent from './publicComponent.js'
import PrivateComponent from './privateComponent.js'
import LoginComponent from './loginComponent.js'
import InvalidRouteComponent from './invalidRouteComponent.js'
import Invoices from './invoicesComponent.js'
import Invoice from './invoiceComponent.js'
import App from '../../App.js'
import Home from './homeComponent.js'
import NewInvoiceForm from './newInvoiceForm.js'

export default function Router() {
  console.log("inside Router");
  return (

        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<App />}>
                  <Route index element={<Home/>} />
                  <Route exact path='login' element={<LoginComponent />}/>
                  <Route path='public' element={<PublicComponent />}/>
                  <Route exact path='private' element={<PrivateRoute><PrivateComponent /></PrivateRoute>} />    
                  <Route path='invoices' element={<PrivateRoute><Invoices /></PrivateRoute>}>
                    <Route index element={<PrivateRoute><PrivateComponent /></PrivateRoute>} />
                    <Route path=':invoiceId' element={<PrivateRoute><Invoice /></PrivateRoute>} />
                    <Route exact path='new' element={<PrivateRoute><NewInvoiceForm /></PrivateRoute>} />
                  </Route>                  
                  <Route path="*" element={<InvalidRouteComponent/>} />                  
                </Route>            
            </Routes>
        </BrowserRouter>
  )
}

function PrivateRoute({ children, ...rest }) {
    console.log("inside PrivateRoute ");
    // const auth = useAuth()
    const { user, isAuthenticated } = useAuth0();  
    const location = useLocation();
    console.log("auth user is {} from location {}", user, location);
    return (
        isAuthenticated ? (children) : (<Navigate to='/login' state={{ from: location }}/>)
    )
  }

