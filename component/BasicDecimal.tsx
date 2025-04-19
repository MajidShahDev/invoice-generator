'use client'
import React, { useState } from "react";

interface ItemsInterface {
  description: string;
  quantity: number;
  price: number;
}

function BasicDecimal() {
  const [items, setItems] = useState<ItemsInterface[]>([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [discountVal, setDiscountVal] = useState(0);
  const handleItemChange = (
    index: number,
    key: keyof ItemsInterface,
    value: string
  ) => {
    const updatedItems = [...items];
  
    if (key === "description") {
      updatedItems[index].description = value;
    } else if (key === "quantity") {
      updatedItems[index].quantity = parseFloat(value) || 0; //  Even if we set <input type="number">, the value is still a string.
    } else if (key === "price") {
      updatedItems[index].price = parseFloat(value) || 0;
    }
  
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const totalAmount = items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
  
    // Remove leading zeros unless it's like "0.5"
    const sanitized = rawValue.replace(/^0+(?!\.)/, '') || '0';
  
    // Update both the value shown and the state
    setDiscountVal(parseFloat(sanitized));
    
    // Optionally update the input field value (for display)
    e.target.value = sanitized;
  };
  
  

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Invoice Generator</h1>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-4 mb-4 items-center"
        >
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) =>
              handleItemChange(index, "description", e.target.value)
            }
            className="flex-1 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", e.target.value)
            }
            className="w-24 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
              handleItemChange(index, "price", e.target.value)
            }
            className="w-24 p-2 border rounded"
          />
        </div>
      ))}
          <div className="relative w-34 ml-2 group block">
            <input
              id="discountVal"
              type="number"
              value={discountVal}
              onChange={handleDiscountChange}
              className="w-full p-2 pr-8 border border-gray-300 rounded focus:outline-none focus:border-gray-300 focus:shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),_0px_2px_6px_2px_rgba(60,64,67,0.15)] text-center group-hover:border-gray-400 selection:bg-gray-300"
            />
            {/* <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              {isDiscountInDollar ? currency : '%'} */}
            {/* </span> */}
          </div>

      <button
        onClick={addItem}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Add ItemsInterface
      </button>

      <div className="text-lg font-semibold">
        Total: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
}

export default BasicDecimal;


