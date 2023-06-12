import Header from '../components/appComponents/Header'
import '../styles/global.css'
import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700']
})

export const metadata = {
	title: 'ShortIt: A Fully Featured URL Shortner',
	description:
		'A fully featured URL Shortner that can managed your shorted URL efficiently.'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<main className='grid grid-cols-1 grid-rows-[75px_1fr] min-h-screen max-h-full w-full bg-[#28282d]'>
					<Header />
					{children}
				</main>
			</body>
		</html>
	)
}
