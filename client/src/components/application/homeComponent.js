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
        <main style={{ padding: "1rem", textAlign:"center" }}>
            <h2>Welcome</h2>
        </main> 
    );
  }
