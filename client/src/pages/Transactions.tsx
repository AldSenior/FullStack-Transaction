import type { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'
import { Chart } from '../components/Chart'
import { TransactionForm } from '../components/TransactionForm'
import { TransactionTable } from '../components/TransactionTable'
import { formatToUSD } from '../helpers/currency.helper'
import type {
	ICategory,
	IResponseTransactionLoader,
	ITransaction,
} from '../types/types'
export const transactionLoader = async () => {
	const categories = await instance.get<ICategory[]>('/categories')
	const transactions = await instance.get<ITransaction[]>('/transactions')
	const totalIncome = await instance.get<number>('/transactions/income/find')
	const totalExpense = await instance.get<number>('/transactions/expense/find')
	const data = {
		categories: categories.data,
		transactions: transactions.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data,
	}
	return data
}
export const transactionAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get('title'),
				amount: +formData.get('amount'),
				category: formData.get('category'),
				type: formData.get('type'),
			}
			await instance.post('/transactions', newTransaction)
			toast.success('Transaction added.')
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const transactionId = formData.get('id')
			await instance.delete(`/transactions/transaction/${transactionId}`)
			return null
		}
	}
}

export const Transactions: FC = () => {
	const { totalExpense, totalIncome } =
		useLoaderData() as IResponseTransactionLoader
	return (
		<>
			<div className="grid grid-cols-3 gap-4 mt-4 items-start">
				{/** Add Transaction Form */}
				<div className="grid  col-span-2">
					<TransactionForm />
				</div>

				{/** Statistic Blocks*/}
				<div className="rounded-md bg-slate-800 p-3">
					<div className="grid-cols-2 grid gap-3">
						<div>
							<p className="uppercase text-md font-bold text-center">
								Total Income:
							</p>
							<p className="bg-green-600 p-1  text-center mt-2 rounded-sm">
								{formatToUSD.format(totalIncome)}
							</p>
						</div>
						<div>
							<p className="uppercase text-md font-bold text-center">
								Total Expense:
							</p>
							<p className="bg-red-500 p-1  text-center mt-2 rounded-sm">
								{formatToUSD.format(totalExpense)}
							</p>
						</div>
					</div>
					<Chart totalExpense={totalExpense} totalIncome={totalIncome} />
				</div>

				{/** Transactions Table */}
			</div>
			<TransactionTable limit={5} />
		</>
	)
}
