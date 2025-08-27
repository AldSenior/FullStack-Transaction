import { NavLink } from 'react-router-dom'

interface NavLiComProps {
	to: string
	title: string
}

export const NavHeaderComponent = ({ to, title }: NavLiComProps) => {
	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					isActive ? 'text-white' : 'text-white/50'
				}
			>
				{title}
			</NavLink>
		</li>
	)
}
