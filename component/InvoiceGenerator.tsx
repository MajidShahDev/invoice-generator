'use client';
import React, { useState, useRef, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { countryList } from './codes';
import { useInvoiceInputLabels } from './InvoiceInputLabels';
import { useInvoiceInputValues } from './InvoiceInputValues';
import { ItemsInterface } from './InvoiceInputValues';

import { IoClose } from 'react-icons/io5';
import { FaArrowRightArrowLeft } from 'react-icons/fa6';
import { IoMdDownload } from 'react-icons/io';
import { IoReload } from 'react-icons/io5';

// Invoice Generator Component
const InvoiceGenerator = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isDiscountInDollar, setIsDiscountInDollar] = useState(false); // Track whether discountVal is in dollar or percentage
  const [isTaxInDollar, setIsTaxInDollar] = useState(false); // Track whether taxVal is in dollar or percentage
  const [isResetModal, setIsResetModal] = useState(false);

  const {
    items,
    setItems,
    discountVal,
    setDiscountVal,
    taxVal,
    setTaxVal,
    shippingVal,
    setShippingVal,
    amountPaidVal,
    setAmountPaidVal,
    currency,
    setCurrency,
    handleClearAllValues,
  } = useInvoiceInputValues();

  const {
    subtotalLabel,
    discountLabel,
    taxLabel,
    shippingLabel,
    totalLabel,
    amountPaidLabel,
    balanceDueLabel,
    handleSubtotalLabel,
    handleDiscountLabel,
    handleTaxLabel,
    handleShippingLabel,
    handleTotalLabel,
    handleAmountPaidLabel,
    handleBalanceDueLabel,
    handleClearAllLabels,
  } = useInvoiceInputLabels();

  const handleItemChange = (
    // Handle input changes for description, quantity, and price
    index: number,
    key: keyof ItemsInterface,
    value: string
  ) => {
    const updatedItems = [...items];

    if (key === 'description') {
      updatedItems[index].description = value;
    } else if (key === 'quantity') {
      updatedItems[index].quantity = parseFloat(value) || 0;
    } else if (key === 'price') {
      updatedItems[index].price = parseFloat(value) || 0;
    }

    setItems(updatedItems);
  };

  // Handle currency Change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  // Add a new item row
  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  // Calculate subtotal amount
  const subtotalAmount = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Handle Delete item
  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  // Handle Discount Change
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let discountValue = e.target.value.trim();

    // Remove leading zeros if there is no decimal point
    if (!discountValue.includes('.') && discountValue.length > 1) {
      discountValue = discountValue.replace(/^0+/, '');
    }

    // Convert to number after cleaning
    const parsedDiscount = parseFloat(discountValue);
    setDiscountVal(isNaN(parsedDiscount) ? 0 : parsedDiscount);
  };

  // Toggle between dollar and percentage discountVal
  const toggleDiscountType = () => {
    setIsDiscountInDollar(!isDiscountInDollar); // Toggle between percentage and dollar discountVal
  };

  // Handle Tax Change
  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let taxValueStr = e.target.value.trim();

    // If no decimal point and the number has more than one character, remove any leading zeros.
    if (!taxValueStr.includes('.') && taxValueStr.length > 1) {
      taxValueStr = taxValueStr.replace(/^0+/, '');
      // In case the resulting string is empty, default it to '0'
      if (taxValueStr === '') {
        taxValueStr = '0';
      }
    }

    const parsedTax = parseFloat(taxValueStr);
    setTaxVal(isNaN(parsedTax) ? 0 : parsedTax);
  };

  // Toggle between dollar and percentage taxVal
  const toggleTaxType = () => {
    setIsTaxInDollar(!isTaxInDollar); // Toggle between percentage and dollar taxVal
  };

  // Handle Shipping Change
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let shippingValueStr = e.target.value.trim();

    // If there's no decimal and more than one character, remove all leading zeros.
    if (!shippingValueStr.includes('.') && shippingValueStr.length > 1) {
      shippingValueStr = shippingValueStr.replace(/^0+/, '');
      if (shippingValueStr === '') {
        shippingValueStr = '0';
      }
    }

    const parsedShipping = parseFloat(shippingValueStr);
    setShippingVal(isNaN(parsedShipping) ? 0 : parsedShipping);
  };

  // Handle Amount Change
  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let amountPaidStr = e.target.value.trim();

    // If there's no decimal and more than one character, remove all leading zeros.
    if (!amountPaidStr.includes('.') && amountPaidStr.length > 1) {
      amountPaidStr = amountPaidStr.replace(/^0+/, '');
      if (amountPaidStr === '') {
        amountPaidStr = '0';
      }
    }

    const parsedAmount = parseFloat(amountPaidStr);
    setAmountPaidVal(isNaN(parsedAmount) ? 0 : parsedAmount);
  };

  // Calculate Total After Discount, Tax, and Shipping (Percentage or Dollar)
  const totalAfterDiscountTaxShipping = (
    subtotal: number,
    discountVal: number,
    taxVal: number,
    shippingVal: number
  ) => {
    let discountedAmount = 0;

    // Apply discountVal (percentage or dollar)
    if (isDiscountInDollar) {
      discountedAmount = subtotal - discountVal;
    } else {
      const discountAmount = (discountVal / 100) * subtotal;
      discountedAmount = subtotal - discountAmount;
    }

    // Apply taxVal
    let finalAmount = discountedAmount;
    if (isTaxInDollar) {
      finalAmount += taxVal;
    } else {
      const taxAmount = (taxVal / 100) * subtotal;
      finalAmount += taxAmount;
    }

    finalAmount += shippingVal;

    return finalAmount; // Allow negative values
  };

  const totalSubtractingAmountPaid = () => {
    const totalAmount = totalAfterDiscountTaxShipping(
      subtotalAmount,
      discountVal,
      taxVal,
      shippingVal
    ); // Get the total after discountVal, taxVal, and shippingVal
    return totalAmount - amountPaidVal; // Subtract the amount paid from the total amount
  };

  // const handleClearAllItems = () => {
  //   setItems([{ description: '', quantity: 1, price: 0 }]);
  // };
  // Download PDF function using jsPDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const element = invoiceRef.current;

    if (element) {
      const pageWidth = doc.internal.pageSize.getWidth();
      const topMargin = 20;
      let yPosition = topMargin;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);

      // Title
      doc.text('Invoice', 10, yPosition);
      yPosition += 10;

      // Table header
      doc.text('Description', 10, yPosition);
      doc.text('Quantity', 90, yPosition);
      doc.text('Price', 130, yPosition);
      doc.text('Total', 170, yPosition);
      yPosition += 10;

      // ItemInterface loop
      items.forEach((item) => {
        if (item.price && item.quantity) {
          doc.text(item.description, 10, yPosition);
          doc.text(item.quantity.toString(), 96, yPosition);
          doc.text(`${currency} ${item.price.toFixed(2)}`, 130, yPosition);
          doc.text(
            `${currency} ${(item.quantity * item.price).toFixed(2)}`,
            170,
            yPosition
          );
          yPosition += 10;
        }
      });

      yPosition += 10;

      const drawRightAlignedText = (label: string, value: number | string) => {
        const text = `${label}: ${typeof value === 'number' ? `${currency} ${value.toFixed(2)}` : value}`;
        const textWidth = doc.getTextWidth(text);
        const marginLeft = 21;
        doc.text(text, pageWidth - textWidth - marginLeft, yPosition);
        yPosition += 10;
      };

      // Apply discountVal
      let discountAmount = 0;
      if (isDiscountInDollar) {
        discountAmount = discountVal;
      } else {
        discountAmount = (subtotalAmount * discountVal) / 100;
      }

      // Apply taxVal
      let taxAmount = 0;
      if (isTaxInDollar) {
        taxAmount = taxVal;
      } else {
        taxAmount = (subtotalAmount * taxVal) / 100;
      }

      const total = subtotalAmount - discountAmount + taxAmount + shippingVal;
      const balanceDue = total - amountPaidVal;

      if (subtotalAmount === 0) {
        drawRightAlignedText(balanceDueLabel, 0);
      } else {
        drawRightAlignedText(subtotalLabel, subtotalAmount);

        if (discountVal > 0) {
          if (isDiscountInDollar) {
            drawRightAlignedText(discountLabel, discountAmount);
          } else {
            drawRightAlignedText(
              discountLabel,
              `(${discountVal}%) ${currency} ${discountAmount.toFixed(2)}`
            );
          }
        }

        if (taxVal > 0) {
          if (isTaxInDollar) {
            drawRightAlignedText(taxLabel, taxAmount);
          } else {
            drawRightAlignedText(
              taxLabel,
              `(${taxVal}%) ${currency} ${taxAmount.toFixed(2)}`
            );
          }
        }

        if (shippingVal > 0) {
          drawRightAlignedText(shippingLabel, shippingVal);
        }

        drawRightAlignedText(totalLabel, total);

        if (amountPaidVal > 0) {
          drawRightAlignedText(amountPaidLabel, amountPaidVal);
        }

        drawRightAlignedText(balanceDueLabel, balanceDue);
      }

      doc.save('invoice.pdf');
    }
  };

  return (
    <div className="w-[650] mx-auto tracking-wide">
      <div
        ref={invoiceRef}
        className="p-6 rounded shadow"
        style={{ backgroundColor: 'hsl(0, 0%, 97%)' }}
      >
        <h1 className="tracking-wider text-2xl font-bold mb-6 text-center text-gray-600 bg-gray-100 border border-gray-300 rounded py-4">
          Invoice Generator
        </h1>

        {/* Currency selection */}
        <div className="flex items-center justify-end mb-4">
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            className="w-24 p-[11px] text-gray-700 border border-gray-300 rounded text-center ml-2 text-sm hover:text-gray-950 hover:border-gray-500 hover:bg-gray cursor-pointer focus:outline-none focus:border-gray-400 focus:shadow"
            value={currency} // Set value to the state
            onChange={handleCurrencyChange} // Handle change event
          >
            {Object.entries(countryList).map(([currencyCode, countryCode]) => (
              <option
                key={currencyCode}
                value={currencyCode}
                className="text-sm"
              >
                {currencyCode}
              </option>
            ))}
          </select>
        </div>

        {/* Header row for the input columns */}
        <div className="w-full max-w-[640px] grid grid-cols-[2.5fr_1.1fr_1.1fr_1.5fr_0.4fr] gap-2 items-center mb-4 tracking-widest">
          <span className="text-gray-50 bg-gray-600 p-2 rounded">
            Item / Service
          </span>
          <span className="text-gray-50 bg-gray-600 p-2 rounded text-center">
            Quantity
          </span>
          <span className="text-gray-50 bg-gray-600 p-2 rounded text-center">
            Rate
          </span>
          <span className="text-gray-50 bg-gray-600 p-2 rounded text-center">
            Amount
          </span>
          <span className="text-gray-50 bg-gray-600 p-2 rounded text-center text-lg h-10 flex items-center justify-center">
            {/* <FontAwesomeIcon icon={faTimes} /> */}
            <IoClose />
          </span>
        </div>

        {items.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-[640px] tracking-wider grid grid-cols-[2.5fr_1.1fr_1.1fr_1.5fr_0.4fr] gap-2 items-center mb-4"
          >
            <input
              type="text"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, 'description', e.target.value)
              }
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] hover:border-gray-400  selection:bg-gray-300"
              placeholder="Description"
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, 'quantity', e.target.value)
              }
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-center hover:border-gray-400 selection:bg-gray-300 "
              placeholder="Qty"
              // style={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', e.target.value)}
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-center hover:border-gray-400 selection:bg-gray-300"
              placeholder="Rate"
            />
            <input
              type="text"
              value={`${currency} ${(item.quantity * item.price).toFixed(2)}`}
              readOnly
              disabled
              className="p-2 border border-gray-300 rounded w-full text-center bg-gray-100"
            />
            <button
              onClick={() => handleDeleteItem(index)}
              className="outline-gray-400 p-2 border text-lg border-gray-300 rounded w-full h-10 text-gray-400 hover:text-gray-600 hover:border-gray-500 flex items-center justify-center"
            >
              <IoClose />
            </button>
          </div>
        ))}

        <button
          onClick={addItem}
          className="outline-gray-400 text-2xl w-[211px] text-gray-500 px-4 py-1 rounded border border-gray-300 hover:text-gray-600 hover:border-gray-500 hover:bg-gray cursor-pointer hover:shadow-sm "
        >
          +
        </button>

        {/* Subtotal */}
        <div className="mt-4 text-right">
          <label htmlFor="sutotal">
            <input
              type="text"
              value={subtotalLabel}
              onChange={handleSubtotalLabel}
              className="w-34 p-2 border border-gray-100 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-right hover:border-gray-300 selection:bg-gray-300"
            />{' '}
          </label>
          <span id="subtotal" className="text-blue-600">
            {currency} {subtotalAmount.toFixed(2)}
          </span>
        </div>

        {/* Discount */}
        <div className="mt-4 text-right flex items-center justify-end gap-1.5">
          <label htmlFor="discountVal" className="inline-flex items-center">
            <input
              type="text"
              value={discountLabel}
              onChange={handleDiscountLabel}
              className="w-34 p-2 border border-gray-100 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-right hover:border-gray-300 selection:bg-gray-300"
            />
          </label>
          <div className="relative w-34 ml-2 group">
            <input
              id="discountVal"
              type="text"
              value={discountVal}
              onChange={handleDiscountChange}
              className="w-full p-2 pr-8 border border-gray-300 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-center group-hover:border-gray-400 selection:bg-gray-300"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              {isDiscountInDollar ? currency : '%'}
            </span>
          </div>

          <button
            onClick={toggleDiscountType}
            className=" flex items-center justify-center text-gray-500 w-[37px] h-[40px] border border-gray-300 px-[9px] py-2 rounded hover:border-gray-500  hover:text-gray-600 hover:bg-gray-50 cursor-pointer outline-gray-400"
          >
            <FaArrowRightArrowLeft className="text-sm" />
          </button>
        </div>

        {/* Tax */}
        <div className="mt-4 text-right flex items-center justify-end gap-1.5">
          <label htmlFor="taxVal" className="inline-flex items-center">
            <input
              type="text"
              value={taxLabel}
              onChange={handleTaxLabel}
              className="w-34 p-2 border border-gray-100 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-right hover:border-gray-300 selection:bg-gray-300"
            />
          </label>
          <div className="relative w-34 ml-2 group">
            <input
              id="taxVal"
              type="text"
              value={taxVal}
              onChange={handleTaxChange}
              className="w-full p-2 pr-8 border border-gray-300 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-center group-hover:border-gray-400 selection:bg-gray-300"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              {isTaxInDollar ? currency : '%'}
            </span>
          </div>

          <button
            onClick={toggleTaxType}
            className="flex items-center justify-center w-[37px] h-[40px] text-gray-500 border border-gray-300 px-[9px] py-2 rounded hover:border-gray-500  hover:text-gray-600 hover:bg-gray-50 cursor-pointer outline-gray-400  "
          >
            <FaArrowRightArrowLeft className="text-sm" />
          </button>
        </div>

        {/* Shipping */}
        <div className="mt-4 text-right flex items-center justify-end gap-1 relative right-11">
          <label htmlFor="shippingVal" className="inline-flex items-center">
            <input
              type="text"
              value={shippingLabel}
              onChange={handleShippingLabel}
              className="w-34 p-2 border border-gray-100 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-right hover:border-gray-300 selection:bg-gray-300"
            />
          </label>
          <div className="relative w-34 ml-2 group">
            <input
              id="shippingVal"
              type="text"
              value={shippingVal}
              onChange={handleShippingChange}
              className="w-full p-2 pr-8 border border-gray-300 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-center group-hover:border-gray-400 selection:bg-gray-300"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              {currency}
            </span>
          </div>
        </div>

        {/* Total after discountVal, taxVal, and shippingVal */}
        <div className="mt-4 text-right">
          <label htmlFor="total">
            <input
              type="text"
              value={totalLabel}
              onChange={handleTotalLabel}
              className="w-34 p-2 border border-gray-100 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-right hover:border-gray-300 selection:bg-gray-300"
            />{' '}
          </label>
          <span
            id="total"
            className={
              totalAfterDiscountTaxShipping(
                subtotalAmount,
                discountVal,
                taxVal,
                shippingVal
              ) < 0
                ? 'text-red-600'
                : 'text-blue-600'
            }
          >
            {currency}{' '}
            {totalAfterDiscountTaxShipping(
              subtotalAmount,
              discountVal,
              taxVal,
              shippingVal
            ).toFixed(2)}
          </span>
        </div>

        {/* Amount Paid */}
        <div className="mt-4 text-right relative right-11 flex items-center justify-end gap-3">
          <label htmlFor="amount-paid" className="inline-flex items-center">
            <input
              type="text"
              value={amountPaidLabel}
              onChange={handleAmountPaidLabel}
              className="w-34 p-2 border border-gray-100 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-right hover:border-gray-300 selection:bg-gray-300"
            />
          </label>

          <div className="relative group">
            <input
              id="amount-paid"
              type="text"
              value={amountPaidVal}
              onChange={handleAmountPaidChange}
              className="w-34 p-2 pr-8 border border-gray-300 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-center group-hover:border-gray-400 selection:bg-gray-300"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-md">
              {currency}
            </span>
          </div>
        </div>

        {/* Balance Due */}
        <div className="  mt-6 text-right font-bold mb-8">
          <label htmlFor="balance-due">
            <input
              type="text"
              value={balanceDueLabel}
              onChange={handleBalanceDueLabel}
              className="w-34 p-2 border border-gray-100 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-right hover:border-gray-300 selection:bg-gray-300"
            />{' '}
          </label>
          <span
            id="balance-due"
            className={
              totalSubtractingAmountPaid() < 0
                ? 'text-red-600'
                : 'text-blue-600'
            }
          >
            {currency} {totalSubtractingAmountPaid().toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={downloadPDF}
          className="bg-green-600 w-[250] cursor-pointer text-white px-4 py-2 border border-green-600 rounded hover:bg-green-700   hover:active:bg-green-800 tracking-wider shadow-md hover:shadow-lg outline-green-800"
        >
          <IoMdDownload className="text-lg inline-block mr-1" /> Download PDF
        </button>
      </div>

      <div className="flex flex-col items-center justify-center mt-6">
        {/* Reset Button */}
        <button
          onClick={() => setIsResetModal(true)}
          className="bg-gray-600 w-[250px] cursor-pointer text-white px-4 py-2  rounded hover:bg-gray-700 hover:active:bg-gray-800 mb-24 tracking-wider shadow-md hover:shadow-lg  outline-gray-700"
        >
          <IoReload className="text-lg inline-block mr-3" />
             &nbsp;&nbsp;&nbsp;Reset Form
        </button>

        {/* Modal */}
        {isResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center border border-gray-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Are you sure you want to reset the form?
              </h2>
              <p className="mb-6 text-gray-600 text-sm tracking-wider">
                This action will restore default labels and all entered data
                will be lost.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    handleClearAllLabels();
                    handleClearAllValues();
                    setIsResetModal(false);
                  }}
                  className="w-[100px] tracking-widest bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 hover:active:bg-gray-800"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsResetModal(false)}
                  className="w-[100px] tracking-wider text-white bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 hover:active:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceGenerator;
