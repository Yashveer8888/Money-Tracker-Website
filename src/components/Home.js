import React, { useContext, useState } from 'react';
import History from './History';
import contexttran from '../context/Addtran';

function Home() {
    const { Income, balance, setBalance, expense, setExpense, addtran } = useContext(contexttran);
    const [tran, setTran] = useState({ expense: "", amount: "" });

    const handleClick = (e) => {
        e.preventDefault();

        // Convert the amount to a number
        const amount = parseFloat(tran.amount);

        // Update balance and expense
        if (!isNaN(amount)) {
            setBalance(balance - amount);
            setExpense(expense + amount);

            // Add transaction
            addtran(tran.expense, amount);
        }

        // Reset the form
        setTran({ expense: "", amount: "" });
    };

    const onChange = (e) => {
        setTran({ ...tran, [e.target.name]: e.target.value });
    };

    return (
        <div className="text-center">
            <h1>Money Tracker</h1>
            <div className="container border rounded bg-secondary-subtle">
                <div className="container d-inline-flex p-2 mx-3">
                    <div className="p-2">
                        <h3>Balance: {balance}</h3>
                        <div className="container d-inline-flex p-2">
                            <div className="mx-2 border rounded px-3">
                                <h4>Income</h4>
                                <h4>{Income}</h4>
                            </div>
                            <div className="mx-2 border rounded px-3">
                                <h4>Expense</h4>
                                <h4>{expense}</h4>
                            </div>
                        </div>
                        <h3>New Transaction</h3>
                        <form className="mx-2" onSubmit={handleClick}>
                            <div className="mb-3 text-start">
                                <label className="form-label">Expense</label>
                                <input
                                    type="text"
                                    name="expense"
                                    value={tran.expense}
                                    onChange={onChange}
                                    placeholder="Enter Expense"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label">Amount</label>
                                <input
                                    type="text"
                                    name="amount"
                                    value={tran.amount}
                                    onChange={onChange}
                                    placeholder="Enter Amount"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Add Transaction
                            </button>
                        </form>
                    </div>
                    <div className="p-2">
                        <h3>Transaction History</h3>
                        <History />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
