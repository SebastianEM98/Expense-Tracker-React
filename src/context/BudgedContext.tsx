import { useReducer, createContext, type ActionDispatch, type ReactNode } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: ActionDispatch<[action: BudgetActions]>
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}