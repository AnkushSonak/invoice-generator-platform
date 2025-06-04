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
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const previewRef = useRef(null);

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount - discount;

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updated = [...items];
    updated[index][field as keyof typeof updated[0]] = field === 'description' ? value : +value;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { description: '', quantity: 1, price: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const handleDownloadPDF = () => {
    if (!previewRef.current) return;
    html2pdf().from(previewRef.current).save(`invoice-${invoiceNumber || 'preview'}.pdf`);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-extrabold">Free Invoice Generator</h1>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="text-sm px-4 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input type="text" placeholder="Your Company Name" value={company} onChange={e => setCompany(e.target.value)} className="input" />
            <input type="text" placeholder="Client Name" value={client} onChange={e => setClient(e.target.value)} className="input" />
            <input type="text" placeholder="Invoice Number" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className="input" />
            <input type="date" placeholder="Issue Date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className="input" />
            <input type="date" placeholder="Due Date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="input" />
          </div>

        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Currency, Tax & Discount</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="input">
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>
            <input type="number" min="0" placeholder="Discount" value={discount} onChange={e => setDiscount(+e.target.value)} className="input" />
            <input type="number" min="0" placeholder="Tax (%)" value={taxRate} onChange={e => setTaxRate(+e.target.value)} className="input" />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                <input
                  type="text"
                  placeholder="Item Description"
                  value={item.description}
                  onChange={e => handleItemChange(index, 'description', e.target.value)}
                  className="input md:col-span-2"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={e => handleItemChange(index, 'quantity', +e.target.value)}
                  className="input"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Price"
                  value={item.price}
                  onChange={e => handleItemChange(index, 'price', +e.target.value)}
                  className="input"
                />
                <div className="text-right text-sm font-semibold">
                  {currency} {(item.quantity * item.price).toFixed(2)}
                </div>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-600 text-sm hover:underline md:col-span-full text-left"
                >
                  Remove
                </button>
              </div>
            ))}

            <button onClick={addItem} className="text-blue-600 hover:underline text-sm">+ Add Item</button>
          </div>
        </section>

        <textarea
          placeholder="Additional Notes (optional)"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="input"
          rows={3}
        />


        <button
          onClick={handleDownloadPDF}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md"
        >
          Download Invoice PDF
        </button>

        {company && (
          <section ref={previewRef} className="mt-12 p-6 bg-gray-50 dark:bg-gray-700 border rounded-xl">
            <h2 className="text-2xl font-bold mb-2">Invoice Preview</h2>
            <p><strong>Company:</strong> {company}</p>
            <p><strong>Client:</strong> {client}</p>
            <p><strong>Invoice #:</strong> {invoiceNumber}</p>
            <p><strong>Date:</strong> {issueDate}</p>
            <table className="w-full mt-4 border-t border-gray-300 text-left">
              <thead>
                <tr className="text-sm font-semibold">
                  <th>Description</th><th>Qty</th><th>Price</th><th>Total</th>
                </tr>
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
            <div className="text-right mt-4 space-y-1">
              <p><strong>Subtotal:</strong> {currency} {subtotal.toFixed(2)}</p>
              <p><strong>Tax ({taxRate}%):</strong> {currency} {taxAmount.toFixed(2)}</p>
              <p><strong>Discount:</strong> -{currency} {discount.toFixed(2)}</p>
              <p className="text-xl font-bold border-t pt-2 mt-2">Grand Total: {currency} {grandTotal.toFixed(2)}</p>
            </div>

            {dueDate && <p className="mt-4"><strong>Due Date:</strong> {dueDate}</p>}
            {notes && (
              <div className="mt-4">
                <strong>Notes:</strong>
                <p className="whitespace-pre-wrap">{notes}</p>
              </div>
            )}

          </section>
        )}
      </div>
    </main>
  );
}
