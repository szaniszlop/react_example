import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'
import invoicesReducer from './invoiceSlice'
import navigationReducer from './navigationSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    invoices: invoicesReducer,
    navigation: navigationReducer
  }
})