import { useState, type FC } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import type { IResponseTransactionLoader } from '../types/types'
import { CategoryModal } from './CategoryModal'

export const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState<boolean>(false)

	return (
		<div className="rounded-md bg-slate-800 p-4 ">
			<Form className="grid gap-2" method="post" action="/transactions">
				<label className="grid" htmlFor="title">
					<span>Title</span>
					<input
						type="text"
						className="input border-slate-700"
						placeholder="Title..."
						name="title"
						required
					/>
				</label>
				<label className="grid" htmlFor="amount">
					<span>Amount</span>
					<input
						type="number"
						className="input border-slate-700"
						placeholder="Amount..."
						name="amount"
						required
					/>
				</label>
				{/** Select */}
				{categories.length ? (
					<label htmlFor="category" className="grid">
						<span>Category</span>
						<select name="category" className="input border-slate-700">
							{/* <option value="1">Salary</option> */}

							{categories.map((category, ind) => (
								<option value={category.id} key={ind}>
									{category.title}
								</option>
							))}
							{/* <option value="2">Gift</option> */}
						</select>
					</label>
				) : (
					<h1 className="mt-1 text-red-300">
						To continue create a category first
					</h1>
				)}
				<button className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white">
					<FaPlus />
					<span onClick={() => setVisibleModal(true)}>Manage Categories</span>
				</button>
				{/** Radio Buttons */}
				<div className="flex gap-4 items-center">
					<label className="cursor-pointer flex items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'income'}
							className="form-radio text-blue-600"
						/>
						<span>Income</span>
					</label>
					<label className="cursor-pointer flex items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'expense'}
							className="form-radio text-blue-600"
						/>
						<span>Expense</span>
					</label>
				</div>

				{/** Submit button */}
				<button className="btn btn-green max-w-fit">Submit</button>
			</Form>
			{visibleModal && (
				<CategoryModal type="POST" setVisibleModal={setVisibleModal} />
			)}
		</div>
	)
}
