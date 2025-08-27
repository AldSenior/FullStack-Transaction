import type { FC } from 'react'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeTokenFromLocaleStorage } from '../helpers/localstorage.helper'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/userSlice'
import { NavHeaderComponent } from './NavHeaderComponent'
export const Header: FC = () => {
	const isAuth = useAuth()
	const distpatch = useAppDispatch()
	const navigate = useNavigate()
	const logoutHandler = () => {
		distpatch(logout())
		removeTokenFromLocaleStorage('token')
		toast.success('You Logged Out.')
		navigate('/')
	}
	const headMass = [
		{
			to: '/',
			title: 'Home',
		},
		{
			to: '/transactions',
			title: 'Transactions',
		},
		{
			to: '/categories',
			title: 'Categories',
		},
	]
	return (
		<header className="flex items-center  p-4 shadow-sm  bg-slate-800 backdrop-blur-sm">
			<Link to="/">
				<FaBtc size={28} />
			</Link>
			{/* Menu */}
			{isAuth && (
				<nav className="ml-auto mr-10">
					<ul className="flex items-center gap-5 ">
						{headMass.map((item, index) => {
							return (
								<NavHeaderComponent
									key={index}
									to={item.to}
									title={item.title}
								/>
							)
						})}
					</ul>
				</nav>
			)}

			{/* Actions */}
			{isAuth ? (
				<button onClick={() => logoutHandler()} className="btn btn-red">
					<span>Log Out</span>
					<FaSignOutAlt size={20} />
				</button>
			) : (
				<Link
					to={'auth'}
					className="py-2 text-white/50 hover:text-white ml-auto"
				>
					Log In / Sign In
				</Link>
			)}
		</header>
	)
}
