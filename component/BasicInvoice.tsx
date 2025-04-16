'use client'
import React, { useState } from "react";

interface ItemsInterface {
  description: string;
  quantity: number;
  price: number;
}

function BasicInvoice() {
  const [items, setItems] = useState<ItemsInterface[]>([
    { description: "", quantity: 1, price: 0 },
  ]);

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

export default BasicInvoice;




// const handleItemChange = (
//     index: number,
//     key: keyof ItemsInterface,
//     value: string
//   ) => {
//     const updatedItems = [...items];
//     const parsedValue =
//       key === "description" ? value : parseFloat(value) || 0;

//     updatedItems[index][key] = parsedValue as ItemsInterface[typeof key];
// //  updatedItems[index][key] = parsedValue as never;
//     setItems(updatedItems);
// };

// with as never typescript gives error
// Type 'string | number' is not assignable to type 'never'.
// Type 'string' is not assignable to type 'never'.

//It only reports the first failed type in the union — which is "string" in this case.
// It could also say:
// Type 'number' is not assignable to type 'never'.
// as never is type assertion means
// "I'm treating this value as if it were 'never' (a type that should never exist), just so TypeScript stops complaining and lets me assign it anyway."