
export default function BudgetTracker() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/donut-chart.jpg" alt="Expenses Donut Chart" />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer transition-colors hover:bg-pink-500 active:bg-pink-700"
                >
                    Reset App
                </button>
            </div>
        </div>
    )
}
