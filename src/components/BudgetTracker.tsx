import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"

export default function BudgetTracker() {

    const { state, dispatch, totalExpenses, remainingBudget } = useBudget()

    const percentage = Math.round(+((totalExpenses / state.budget) * 100).toFixed(2))

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#DC2626' : percentage >= 75 ? '#FFCC00' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textSize: 10,
                        textColor: percentage === 100 ? '#DC2626' : percentage >= 75 ? '#FFCC00' : '#3B82F6'
                    })}
                    text={`${percentage}% Spent`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer transition-colors hover:bg-pink-500 active:bg-pink-700"
                    onClick={() => dispatch({type: 'reset-app'})}
                >
                    Reset App
                </button>

                <AmountDisplay
                    label="Budget"
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Remaining"
                    amount={remainingBudget}
                />

                <AmountDisplay
                    label="Spent"
                    amount={totalExpenses}
                />
            </div>
        </div>
    )
}
