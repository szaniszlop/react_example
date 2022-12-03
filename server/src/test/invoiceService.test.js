import repository from '../data/invoices.js'
import InvoiceService from '../service/invoiceService.js';
import {jest, expect} from '@jest/globals';

jest.mock('../data/invoices.js');

const mockedRepository = jest.mocked(repository, true);

describe("Invoice Service Test", () => {
    beforeEach( () => {
        console.log("beforeEach");        
    });
    test("test create new invoice adds number", async () => {
        const invoiceService = new InvoiceService();
        const newInvoice = await invoiceService.addInvoice({name: "name", amount: 1000, due: new Date().setDate(new Date().getDate() + 10000)});
        expect(newInvoice.number).toBeDefined();
        expect(mockedRepository.addInvoice).toHaveBeenCalledTimes(1);
        expect(mockedRepository.addInvoice).toHaveBeenCalledWith(newInvoice);
    })
})