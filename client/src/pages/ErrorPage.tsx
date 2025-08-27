import type { FC } from 'react'
import { Link } from 'react-router-dom'

export const ErrorPage: FC = () => {
	return (
		<div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10">
			<h1>404</h1>
			<Link
				to={'/'}
				className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600"
			>
				Back
			</Link>
		</div>
	)
}
