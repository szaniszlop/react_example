import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { userLoggedIn } from '../../state/userSlice'
import UserDetails from './userDetailsComponent'

export default function LoginComponent() {
  console.log("LoginComponent");
  const navigate = useNavigate()
  const location = useLocation()
  const { loginWithPopup, logout } = useAuth0();    
  const dispatch = useDispatch();

  let { from } = location.state || { from: { pathname: "/" } };
  
  let navBack = () => { navigate(from)}
  let navHome = () => {navigate('/')}
 
   let logIn = () => {
    console.log("Login called");
    loginWithPopup()
      .then(navBack);
  }
 
  let logOut = () => {
    console.log("Logout called");
    logout({returnTo: window.location.origin});
    dispatch(userLoggedIn({}));
    navHome();
  }
 
  return (
          <div>
            <h2> Login </h2>
            <LoginButton onClick={() => logIn() }/> {"  "}
            <LogoutButton onClick={() => logOut() }/>
            <UserDetails/>
          </div>   
    );
  }

function LoginButton(params) {
  const { isAuthenticated } = useAuth0();   
  if( !isAuthenticated){
    return <button onClick={params.onClick }>Login</button>;
  }
}

function LogoutButton(params) {
  const { isAuthenticated } = useAuth0();   
  if( isAuthenticated){
    return <button onClick={params.onClick }>Logout</button>;
  }
}

