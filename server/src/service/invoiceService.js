import repository from '../data/invoices.js'

export default class InvoiceService{
    constructor(){
        this.invoiceRepository = repository;
        this.newInvoiceValidator = new NewInvoiceValidator();
    }

    getInvoices = async () =>  this.invoiceRepository.getInvoices();

    getInvoice = async (id) =>  this.invoiceRepository.getInvoice(id);

    addInvoice = async (invoice) => {
        let newInvoice = {...invoice, number: new Date().valueOf().toString()}
        this.newInvoiceValidator.validate(newInvoice);
        this.invoiceRepository.addInvoice(newInvoice);
        return newInvoice;
    }
    
    deletInvoice = async (id) =>  this.invoiceRepository.addInvoice(id);
}

class NewInvoiceValidator{
    validate(invoice){
        const {name, number, amount, due} = invoice;
        if (name && number && amount && due){
            if( String(name).length < 3 ){
                throw "Name too short";    
            }
            if(amount < 0 || amount > 99999999 ){
                throw "Amount invalid";    
            }
            if(Date.parse(due) < new Date()){
                throw "Due Date invalid";    
            }
        }
        else {
            throw "Invoice data invalid";
        }
    }
}