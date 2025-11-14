import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { DraftExpense, Value } from '../types';
import DatePicker from 'react-date-picker';
import { categories } from "../data/categories";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMesage from './ErrorMesage';
import { useBudget } from '../hooks/useBudget';

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
    const [error, setError] = useState('')
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleDateChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(expense).includes('') || expense.amount <= 0 || expense.expenseName.trim() === '' || expense.date === null) {
            setError('All fields are required')
            return
        }

        setError('')
        dispatch({ type: 'add-expense', payload: { expense } })

        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                Record Expense
            </legend>

            {error && <ErrorMesage>{error}</ErrorMesage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >
                    Expense Description:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Add a description to your expense"
                    className="bg-slate-100 p-2 rounded-lg"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >
                    Amount:
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Add the expense amount: e.g. 300"
                    className="bg-slate-100 p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    name="amount"
                    value={expense.amount > 0 ? expense.amount : ''}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >
                    Category:
                </label>
                <select
                    id="category"
                    className={`bg-slate-100 p-2 rounded-lg ${expense.category === '' && 'text-black/60'}`}
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="" disabled hidden>-- Select an option --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                            className="text-black"
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="date"
                    className="text-xl"
                >
                    Date:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 rounded-lg border-0"
                    value={expense.date}
                    onChange={handleDateChangeDate}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    maxDate={new Date()}
                />

            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 rounded-lg text-white uppercase font-bold tracking-wider transition-colors duration-300  hover:bg-blue-700 active:bg-blue-800"
                value="Save"
            />
        </form>
    )
}
