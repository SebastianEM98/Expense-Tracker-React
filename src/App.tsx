import BudgetForm from "./components/BudgetForm"


function App() {

    return (
        <>
            <header className="bg-blue-600 py-8 max-h-72">
                <h1 className="uppercase text-center font-black text-4xl text-white">Expense Tracker</h1>
            </header>

            <div className="lg:max-w-3xl lg:mx-auto sm:mx-10 m-5 bg-white shadow-lg rounded-lg mt-10 p-10">
                <BudgetForm />
            </div>
        </>
    )
}

export default App
