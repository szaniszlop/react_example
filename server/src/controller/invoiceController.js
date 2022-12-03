import InvoiceService from "../service/invoiceService.js";

export default class InvoiceController{
    constructor(){
        this.invoiceService = new InvoiceService();
    }
    // Get all invoices - 
    getAllInvoices = async (req, res) => {
        console.log("Get Invoices", req.auth);
        this.invoiceService.getInvoices()
            .catch((reason) => res.status(500).send(reason))
            .then((result) => res.status(200).send(result));
      }
  
    // Get single invoice
    getSingleInvoice = async (req, res) => {
        console.log("get Invoice", req.params);
        this.invoiceService.getInvoice(req.params.id)
            .catch((reason) => res.status(500).send(reason))
            .then((result) => res.status(200).send(result));
      }

    // Add new invoice
    addNewInvoice = async (req, res) => {
        let body = req.body
        console.log("Add Invoice", body);
        this.invoiceService.addInvoice(body)
            .catch((reason) => res.status(500).send(reason))
            .then((result) => res.status(200).send(result));        
      }
  
    // Delete an invoice
    deleteInvoice = async (req, res) => {
        console.log("delete invoice", req.params);
        this.invoiceService.deletInvoice(req.params.id)
            .catch((reason) => res.status(500).send(reason))
            .then((result) => res.status(201).send(result));        
      }
}