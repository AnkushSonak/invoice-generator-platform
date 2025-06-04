'use client';

import { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';

export default function HomePage() {
  const [theme, setTheme] = useState('light');
  const [company, setCompany] = useState('');
  const [client, setClient] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  const previewRef = useRef(null);

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updated = [...items];
    updated[index][field as keyof typeof updated[0]] = field === 'description' ? value : +value;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { description: '', quantity: 1, price: 0 }]);
  const removeItem = index => setItems(items.filter((_, i) => i !== index));
  const handleDownloadPDF = () => {
    if (!previewRef.current) return;
    html2pdf().from(previewRef.current).save(`invoice-${invoiceNumber || 'preview'}.pdf`);
  };

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount - discount;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Free Invoice Generator</h1>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="text-sm px-3 py-1 border rounded">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input type="text" placeholder="Your Company Name" value={company} onChange={e => setCompany(e.target.value)} className="input" />
          <input type="text" placeholder="Client Name" value={client} onChange={e => setClient(e.target.value)} className="input" />
          <input type="text" placeholder="Invoice Number" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className="input" />
          <input type="date" placeholder="Issue Date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className="input" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="input">
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select>
          <input type="number" min="0" placeholder="Discount" value={discount} onChange={e => setDiscount(+e.target.value)} className="input" />
          <input type="number" min="0" placeholder="Tax (%)" value={taxRate} onChange={e => setTaxRate(+e.target.value)} className="input" />
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
              <input type="text" placeholder="Item Description" value={item.description} onChange={e => handleItemChange(index, 'description', e.target.value)} className="input" />
              <input type="number" min="1" placeholder="Quantity" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', +e.target.value)} className="input" />
              <input type="number" min="0" placeholder="Price" value={item.price} onChange={e => handleItemChange(index, 'price', +e.target.value)} className="input" />
              <button onClick={() => removeItem(index)} className="text-red-600 text-sm hover:underline">Remove</button>
            </div>
          ))}
          <button onClick={addItem} className="text-blue-600 text-sm hover:underline">+ Add Item</button>
        </div>

        <button onClick={handleDownloadPDF} className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow">
          Download Invoice PDF
        </button>

        {company && (
          <div ref={previewRef} className="mt-10 p-6 bg-gray-50 dark:bg-gray-700 border rounded-xl">
            <h2 className="text-2xl font-semibold mb-2">Invoice Preview</h2>
            <p><strong>Company:</strong> {company}</p>
            <p><strong>Client:</strong> {client}</p>
            <p><strong>Invoice #:</strong> {invoiceNumber}</p>
            <p><strong>Date:</strong> {issueDate}</p>
            <table className="w-full mt-4 text-left border-t border-gray-300">
              <thead>
                <tr><th>Description</th><th>Qty</th><th>Price</th><th>Total</th></tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{currency} {item.price}</td>
                    <td>{currency} {item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right mt-4">
              <p>Subtotal: {currency} {subtotal}</p>
              <p>Tax ({taxRate}%): {currency} {taxAmount}</p>
              <p>Discount: -{currency} {discount}</p>
              <p className="font-bold text-lg">Grand Total: {currency} {grandTotal}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
