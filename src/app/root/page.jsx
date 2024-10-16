"use client";

import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { auth } from '../firebase/config';
import { UserAuth } from '../context/AuthContext';
import Navbar from './component/navbar';

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

    const saveStock = async (item) => {
        try {
            const token = await auth.currentUser.getIdToken(); // Firebase auth token
            const response = await fetch('/api/stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, stockData: item }),
            });

            // Log the response to check if it's actually JSON
            const text = await response.text();
            console.log('Response:', text);

            // Parse the response if it's JSON
            const result = JSON.parse(text);
            console.log('Parsed Result:', result);
        } catch (error) {
            console.error('Error saving stock:', error);
        }
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

                {/* add new item */}
                <div className="mt-10 flex justify-center items-center">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="border bg-white text-black p-2 mr-2 dark:text-black"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                        className="border bg-white text-black p-2 mr-2 dark:text-black"
                    />
                    {isEditing ? (
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={() => saveStock(newItem)}
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


                {/* display stock items */}
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

                <div className='mt-10  flex justify-center '>
                    <button
                        onClick={() => saveStock(newItem)}
                        className="bg-blue-500 text-white font-bold text-xl px-2 py-1 rounded mr-2">
                        Save
                    </button>
                </div>
            </div>


        </>
    )
}

export default Page