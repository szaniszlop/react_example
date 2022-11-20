import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userLoggedIn } from '../../state/userSlice'
import {useAuth0} from '@auth0/auth0-react'

export default function Home() {
  console.log("Home");
  const { isAuthenticated, user } = useAuth0();    
  const dispatch = useDispatch();

  useEffect(() =>{ 
    if(isAuthenticated){
      dispatch(userLoggedIn(user));
    }
  }, [isAuthenticated, dispatch, user])
  
  return (
        <main className="App-info">
            <h2 className="App-info">Welcome</h2>
        </main> 
    );
  }
