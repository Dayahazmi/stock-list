import { useState } from "react";

export default function StockTable() {
    const [stockItems, setStockItems] = useState([
        { id: 1, name: "Item A", quantity: 10 },
        { id: 2, name: "Item B", quantity: 20 },
    ]);

    const [newItem, setNewItem] = useState({ name: "", quantity: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Handle add item
    const addItem = () => {
        setStockItems([
            ...stockItems,
            { id: stockItems.length + 1, name: newItem.name, quantity: newItem.quantity },
        ]);
        setNewItem({ name: "", quantity: "" });
    };

    // Handle delete item
    const deleteItem = (id) => {
        setStockItems(stockItems.filter((item) => item.id !== id));
    };

    // Handle edit item
    const startEdit = (id) => {
        const item = stockItems.find((item) => item.id === id);
        setNewItem({ name: item.name, quantity: item.quantity });
        setIsEditing(true);
        setEditingId(id);
    };

    const saveEdit = () => {
        setStockItems(
            stockItems.map((item) =>
                item.id === editingId ? { ...item, ...newItem } : item
            )
        );
        setIsEditing(false);
        setNewItem({ name: "", quantity: "" });
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Stock List</h1>

            <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 text-black px-4 py-2">Item Name</th>
                        <th className="border border-gray-300 text-black px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 text-black px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stockItems.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="bg-blue-500 text-black px-2 py-1 rounded mr-2"
                                    onClick={() => startEdit(item.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-black px-2 py-1 rounded"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="border border-gray-300 p-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    className="border border-gray-300 p-2 mr-2"
                />
                {isEditing ? (
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={saveEdit}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={addItem}
                    >
                        Add
                    </button>
                )}
            </div>
        </div>
    );
}
