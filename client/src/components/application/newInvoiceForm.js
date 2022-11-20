import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import DatePicker from 'react-date-picker';
import { invoiceAdded } from "../../state/invoiceSlice"; 

export default function NewInvoiceForm() {
    console.log("InvoNewInvoiceFormice");     
    const [name, setName ] = useState("");
    const [amount, setAmount ] = useState(0);
    const [dueDate, setDueDate ] = useState(new Date());
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNameChanged = e => setName(e.target.value)
    const onAmountChanged = e => setAmount(e.target.value)
    const formSubmit = () => {
        if(isFormValid()) {
            dispatch(invoiceAdded(name, amount, dueDate.toJSON().split(0, 10)));
            navigate("/invoices")    
        }
    }

    function isFormValid(){
        return isNameValid() && isAmountValid() && isDueDateValid()
    }    

    function isNameValid(){
        return name && name.length >= 3
    }

    function isAmountValid(){
        const parsedAmount = parseInt(amount, 10);
        return parsedAmount && parsedAmount > 0 && parsedAmount < 99999999
    }

    function isDueDateValid(){
        const parsedDate = Date.parse(dueDate)
        return parsedDate && parsedDate > new Date()
    }

    return (
      <main className="container App-item-details-box">
        <section>
        <h2>New Invoice</h2>
        <form>
            <label htmlFor="postName">Name:</label>
            <input
                type="text"
                id="postName"
                name="postName"
                placeholder="Customer Name"
                value={name}
                onChange={onNameChanged}
                className={isNameValid() ? "is-success" : "has-error"}
            />
            <label htmlFor="postAmount">Amount:</label>
            <input
                type="text"
                id="postAmount"
                name="postAmount"
                placeholder="Invoice amount"
                value={amount}
                onChange={onAmountChanged}
                className={isAmountValid() ? "is-success" : "has-error"}
            />
            <label htmlFor="postDueDate">Due Date:</label>
            <div style={{display: "clear"}} className={isDueDateValid() ? "is-success" : "has-error"}>
                <DatePicker onChange={setDueDate} value={dueDate} required={true}/>
            </div>
            <label htmlFor="submitForm">{ isFormValid() ? "Entry is valid" : "Enter a valid customer name, amount and due date"}</label>
            <button 
                type="button" 
                id="submitForm"
                onClick={formSubmit} 
                className={isFormValid() ? "button" : "muted-button"}>
                Save Invoice
            </button>
        </form>
        </section>
      </main>
    );
  }