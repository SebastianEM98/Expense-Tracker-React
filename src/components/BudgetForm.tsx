import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'set-budget', payload: { budget } })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                    Set Budget
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Set your budget"
                    name="budget"
                    value={budget > 0 ? budget : ''}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value="Set Budget"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white font-bold uppercase tracking-wider transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                disabled={isValid}
            />
        </form>
    )
}
