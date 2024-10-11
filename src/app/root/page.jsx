"use client";

import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { UserAuth } from '../context/AuthContext';
import Navbar from '../root/component/Navbar'

export const Page = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null)
            }
        });

        return () => unsubscribe();
    }, [])
    const [stockItems, setStockItems] = useState([
        { id: 1, name: 'Item 1', quantity: 10 },
        { id: 2, name: 'Item 2', quantity: 20 },
    ]);

    const [newItem, setNewItem] = useState({ name: '', quantity: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setIsEditingId] = useState(null);

    const addItem = () => {
        setStockItems([
            ...stockItems,
            {
                id: stockItems.length + 1,
                name: newItem.name,
                quantity: newItem.quantity
            }
        ]);
        setNewItem({ name: '', quantity: '' });
    };

    const deleteItem = (id) => {
        setStockItems(stockItems.filter((item) => item.id !== id));
    };

    const startEdit = (id) => {
        const item = stockItems.find((item) => item.id === id);
        setNewItem({ name: item.name, quantity: item.quantity });
        setIsEditing(true);
        setIsEditingId(id);
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
        <>
            <Navbar />
            <div className='container mx-auto mt-10'>
                <div>
                    <div>
                        <h1 className="text-xl font-bold text-teal-400">Welcome, {user ? (user.displayName || user.email) : 'User'}!</h1>
                    </div>

                </div>

                <h1 className='text-5xl text-black font-bold text-center mb-4 mt-15 dark:text-white'>Stock List</h1>

                <div className="mt-10 flex justify-center items-center">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="border  bg-white text-black p-2 mr-2 dark:text-white"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                        className="border  bg-white text-black p-2 mr-2 dark:text-white"
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

                <table className='mt-10 table-auto w-full border-collapse border border-gray-400'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='border border-gray-300 text-black px-4 py-2'>Item Name</th>
                            <th className='border border-gray-300 text-black px-4 py-2'>Quantity</th>
                            <th className='border border-gray-300 text-black px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockItems.map((item) => (
                            <tr key={item.id}>
                                <td className="border border-gray-300 text-black px-4 py-2 dark:text-white">{item.name}</td>
                                <td className="border border-gray-300 text-black px-4 py-2 dark:text-white">{item.quantity}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                                        onClick={() => startEdit(item.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>


        </>
    )
}

export default Page