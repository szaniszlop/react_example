import jwtAuthz from 'express-jwt-authz';
import {Router} from 'express';
import InvoiceController from '../controller/invoiceController.js';

const router = new Router();
const invoiceController = new InvoiceController();

// Get all invoices - 
router.get('/invoices', jwtAuthz(["read:all"], {customUserKey: "auth"}), invoiceController.getAllInvoices);
  
// Get single invoice
router.get('/invoices/:id', jwtAuthz(['read:all'], {customUserKey: "auth"}), invoiceController.getSingleInvoice);
  
// Add new invoice
router.post('/invoices', jwtAuthz(['write:all'], {customUserKey: "auth"}), invoiceController.addNewInvoice);
  
// Delete an invoice
router.delete('/invoices/:id', jwtAuthz(['write:all'], {customUserKey: "auth"}), invoiceController.deleteInvoice);
  
export default router;