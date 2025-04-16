import { useState, useEffect } from 'react';

export interface ItemsInterface {
  description: string;
  quantity: number;
  price: number;
}

export const useInvoiceInputValues = () => {
  const [items, setItems] = useState<ItemsInterface[]>([
    { description: '', quantity: 1, price: 0 },
  ]);

  const [discountVal, setDiscountVal] = useState(0);
  const [taxVal, setTaxVal] = useState(0);
  const [shippingVal, setShippingVal] = useState(0);
  const [amountPaidVal, setAmountPaidVal] = useState(0);
  const [currency, setCurrency] = useState('USD');

  // Load values from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem('items');
      const storedDiscountVal = localStorage.getItem('discountVal');
      const storedTaxVal = localStorage.getItem('taxVal');
      const storedShippingVal = localStorage.getItem('shippingVal');
      const storedAmountPaidVal = localStorage.getItem('amountPaidVal');
      const storedCurrency = localStorage.getItem('currency');

      setItems(
        storedItems
          ? JSON.parse(storedItems)
          : [{ description: '', quantity: 1, price: 0 }]
      );
      setDiscountVal(storedDiscountVal ? parseFloat(storedDiscountVal) : 0);
      setTaxVal(storedTaxVal ? parseFloat(storedTaxVal) : 0);
      setShippingVal(storedShippingVal ? parseFloat(storedShippingVal) : 0);
      setAmountPaidVal(
        storedAmountPaidVal ? parseFloat(storedAmountPaidVal) : 0
      );
      setCurrency(storedCurrency || 'USD');
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('discountVal', discountVal.toString());
  }, [discountVal]);

  useEffect(() => {
    localStorage.setItem('taxVal', taxVal.toString());
  }, [taxVal]);

  useEffect(() => {
    localStorage.setItem('shippingVal', shippingVal.toString());
  }, [shippingVal]);

  useEffect(() => {
    localStorage.setItem('amountPaidVal', amountPaidVal.toString());
  }, [amountPaidVal]);

  useEffect(() => {
    localStorage.setItem('currency', currency); // 💰
  }, [currency]);

  // Clear all values and localStorage
  const handleClearAllValues = () => {
    localStorage.removeItem('items');
    localStorage.removeItem('discountVal');
    localStorage.removeItem('taxVal');
    localStorage.removeItem('shippingVal');
    localStorage.removeItem('amountPaidVal');
    localStorage.removeItem('currency');

    setItems([{ description: '', quantity: 1, price: 0 }]);
    setDiscountVal(0);
    setTaxVal(0);
    setShippingVal(0);
    setAmountPaidVal(0);
    setCurrency('USD');
  };

  // Return everything
  return {
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
  };
};
