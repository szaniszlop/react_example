import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  status: "pending",
  error: ""
}

export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async (client) => {
  console.log("fetchInvoices", client)
  const response = await client.getInvoices()
  console.log("fetchInvoices", response)
  return response
})

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    invoiceAdded: {
      reducer( state, action){
        console.log("addInvoice", action);
        state.data.push(action.payload);
      },
      prepare(name, amount, due){
        return {
          payload: {
            name,
            number: nanoid(),
            amount,
            due  
          }
        };
      }

    },
    invoiceUpdated( state, action){
        console.log("updateInvoice", action);
        state.data.map((invoice) => {return invoice.number === action.payload.number ? action.payload : invoice});
    },
    invoiceDeleted( state, action){
        console.log("deleteInvoice", action);
        state.data.filter((invoice) => {return invoice.number !== action.payload.number });
    },
    resetStatus(state, action){
      state.status = "pending"
      state.error = ""
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchInvoices.pending, (state, action) =>{
      console.log("fetchInvoice pending");
      state.status = "loading";
    })
    .addCase(fetchInvoices.fulfilled, (state, action) => {
      console.log("fetchInvoice loaded");
      state.status = "loaded"
      state.data = action.payload;
    })
    .addCase(fetchInvoices.rejected, (state, action) => {
      console.log("fetchInvoice failed");
      state.status = "failed"
      state.error = action.error.message
      state.data = []
    })
  }
})

export const { invoiceAdded, invoiceUpdated,  invoiceDeleted, resetStatus} = invoiceSlice.actions

export const selectInvoices = state => state.invoices.data;
export const selectInvoicesStatus = state => state.invoices.status;
export const selectInvoicesError = state => state.invoices.error;
export const selectInvoice = (number) => (state) => state.invoices.data.find( invoice => invoice.number === number);

export default invoiceSlice.reducer
