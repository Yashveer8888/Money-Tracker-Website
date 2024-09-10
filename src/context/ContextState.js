import React, { useState } from 'react';
import contexttran from './Addtran';

const ContextState = (props) => {
    const host = "http://localhost:5000";
    const [balance, setBalance] = useState(50000);
    const [expense, setExpense] = useState(0);
    const [Income, setIncome] = useState(50000);
    const [history, setHistory] = useState([]);

    // Fetch transactions from the backend
    const getTran = async () => {
        try {
            const response = await fetch(`${host}/api/transactions/getTran`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const json = await response.json();
                setHistory(json);
            } else {
                console.error("Failed to fetch transactions");
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    // Add transaction
    const addtran = async (expense, amount) => {
        try {
            const response = await fetch(`${host}/api/transactions/addtran`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expense, amount }),
            });
            if (response.ok) {
                const tran = await response.json();
                setHistory((prevHistory) => [...prevHistory, tran]);

                // Update balance and expense
                const transactionAmount = parseFloat(amount);
                setBalance((prevBalance) => prevBalance - transactionAmount);
                setExpense((prevExpense) => prevExpense + transactionAmount);
            } else {
                console.error("Failed to add transaction");
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    // Delete transaction by id
    const deletetran = async (id) => {
        try {
            const response = await fetch(`${host}/api/transactions/deletetran/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                setHistory((prevHistory) => prevHistory.filter((tran) => tran._id !== id));
            } else {
                console.error("Failed to delete transaction");
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return (
        <contexttran.Provider value={{
            balance, setBalance, expense, setExpense, Income, setIncome, history, getTran, addtran, deletetran
        }}>
            {props.children}
        </contexttran.Provider>
    );
};

export default ContextState;
