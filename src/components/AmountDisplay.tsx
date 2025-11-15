import { formatCurrency } from "../helpers/formatCurrency"

type AmountDisplayProps = {
    label?: string,
    amount: number
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    return (
        <p className="sm:text-2xl text-xl text-blue-600 font-bold">
            {label && `${label}: `}
            <span className="font-black text-black">{formatCurrency(amount)}</span>
        </p>
    )
}
