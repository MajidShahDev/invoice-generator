import { useState, useEffect } from 'react';

export const useInvoiceInputLabels = () => {
  const [subtotalLabel, setSubtotalLabel] = useState('Subtotal');
  const [discountLabel, setDiscountLabel] = useState('Discount');
  const [taxLabel, setTaxLabel] = useState('Tax');
  const [shippingLabel, setShippingLabel] = useState('Shipping');
  const [totalLabel, setTotalLabel] = useState('Total');
  const [amountPaidLabel, setAmountPaidLabel] = useState('Amount Paid');
  const [balanceDueLabel, setBalanceDueLabel] = useState('Balance Due');

  // Load from localStorage only after initial render
  // check if we're running on browser not on server
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if localStorage values exist, then update state
      setSubtotalLabel(localStorage.getItem('subtotalLabel') || 'Subtotal');
      setDiscountLabel(localStorage.getItem('discountLabel') || 'Discount');
      setTaxLabel(localStorage.getItem('taxLabel') || 'Tax');
      setShippingLabel(localStorage.getItem('shippingLabel') || 'Shipping');
      setTotalLabel(localStorage.getItem('totalLabel') || 'Total');
      setAmountPaidLabel(
        localStorage.getItem('amountPaidLabel') || 'Amount Paid'
      );
      setBalanceDueLabel(
        localStorage.getItem('balanceDueLabel') || 'Balance Due'
      );
    }
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    if (subtotalLabel !== 'Subtotal')
      localStorage.setItem('subtotalLabel', subtotalLabel);
  }, [subtotalLabel]);

  useEffect(() => {
    if (discountLabel !== 'Discount')
      localStorage.setItem('discountLabel', discountLabel);
  }, [discountLabel]);

  useEffect(() => {
    if (taxLabel !== 'Tax') localStorage.setItem('taxLabel', taxLabel);
  }, [taxLabel]);

  useEffect(() => {
    if (shippingLabel !== 'Shipping')
      localStorage.setItem('shippingLabel', shippingLabel);
  }, [shippingLabel]);

  useEffect(() => {
    if (totalLabel !== 'Total') localStorage.setItem('totalLabel', totalLabel);
  }, [totalLabel]);

  useEffect(() => {
    if (amountPaidLabel !== 'Amount Paid')
      localStorage.setItem('amountPaidLabel', amountPaidLabel);
  }, [amountPaidLabel]);

  useEffect(() => {
    if (balanceDueLabel !== 'Balance Due')
      localStorage.setItem('balanceDueLabel', balanceDueLabel);
  }, [balanceDueLabel]);

  // Handlers
  const handleSubtotalLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtotalLabel(e.target.value);
  };

  const handleDiscountLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountLabel(e.target.value);
  };

  const handleTaxLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaxLabel(e.target.value);
  };

  const handleShippingLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingLabel(e.target.value);
  };

  const handleTotalLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalLabel(e.target.value);
  };

  const handleAmountPaidLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPaidLabel(e.target.value);
  };

  const handleBalanceDueLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBalanceDueLabel(e.target.value);
  };

  const handleClearAllLabels = () => {
    localStorage.removeItem('subtotalLabel');
    localStorage.removeItem('discountLabel');
    localStorage.removeItem('taxLabel');
    localStorage.removeItem('shippingLabel');
    localStorage.removeItem('totalLabel');
    localStorage.removeItem('amountPaidLabel');
    localStorage.removeItem('balanceDueLabel');

    setSubtotalLabel('Subtotal');
    setDiscountLabel('Discount');
    setTaxLabel('Tax');
    setShippingLabel('Shipping');
    setTotalLabel('Total');
    setAmountPaidLabel('Amount Paid');
    setBalanceDueLabel('Balance Due');
  };

  // ✅ Final return
  return {
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
  };
};

//   // Save to localStorage when values change
//   useEffect(() => {
//     localStorage.setItem('subtotalLabel', subtotalLabel);
//   }, [subtotalLabel]);

//   useEffect(() => {
//     localStorage.setItem('discountLabel', discountLabel);
//   }, [discountLabel]);

//   useEffect(() => {
//     localStorage.setItem('taxLabel', taxLabel);
//   }, [taxLabel]);

//   useEffect(() => {
//     localStorage.setItem('shippingLabel', shippingLabel);
//   }, [shippingLabel]);

//   useEffect(() => {
//     localStorage.setItem('totalLabel', totalLabel);
//   }, [totalLabel]);

//   useEffect(() => {
//     localStorage.setItem('amountPaidLabel', amountPaidLabel);
//   }, [amountPaidLabel]);

//   useEffect(() => {
//     localStorage.setItem('balanceDueLabel', balanceDueLabel);
//   }, [balanceDueLabel]);
