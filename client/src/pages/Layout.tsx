import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export const Layout: FC = () => {
	return (
		<div
			style={{ fontFamily: 'Roboto, sans-serif' }}
			className="min-h-screen bg-slate-900 pb-20 text-xl font-roboto text-white"
		>
			<Header />
			<div className="container mx-auto">
				<Outlet />
			</div>
		</div>
	)
}
