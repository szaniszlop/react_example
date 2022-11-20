import React, { useContext, createContext } from 'react'
import {useAuth0} from '@auth0/auth0-react'
import configureFetchWrapper from '../utils/fetchWrapper'
import {env} from '../env/environment.js'

// declare context
const apiClientContext = createContext()

export default function ApiClientProvider({children}){
    const apiClient = useApiClientProvider()
    return <apiClientContext.Provider value={apiClient}>{children}</apiClientContext.Provider>
}

export const useApiClient = () => useContext(apiClientContext)

function useApiClientProvider(){
    const { getAccessTokenSilently } = useAuth0();  
    const fetchWraper = configureFetchWrapper({refreshToken: getAccessTokenSilently, audience: env.BACKEND_AUDIENCE, scope: env.BACKEND_SCOPE});
    const backendUrl = env.BACKEND_URL

    const getInvoices = async () => {
        return fetchWraper.get(`${backendUrl}/api/invoices`)        
    }

    return ({
        getInvoices
    })
}
