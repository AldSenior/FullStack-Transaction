import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { Auth } from '../pages/Auth'
import {
	Categories,
	categoriesAction,
	categoriesLoader,
} from '../pages/Categories'
import { ErrorPage } from '../pages/ErrorPage'
import { Home } from '../pages/Home'
import { Layout } from '../pages/Layout'
import {
	transactionAction,
	transactionLoader,
	Transactions,
} from '../pages/Transactions'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'transactions',
				loader: transactionLoader,
				action: transactionAction,
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: 'categories',
				action: categoriesAction,
				loader: categoriesLoader,
				element: (
					<ProtectedRoute>
						<Categories />
					</ProtectedRoute>
				),
			},
			{
				path: 'auth',
				element: <Auth />,
			},
		],
	},
])
