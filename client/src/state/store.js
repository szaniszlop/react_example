import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userSlice'
import invoicesReducer from './invoiceSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    invoices: invoicesReducer
  }
})