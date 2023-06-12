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
			<body className={inter.className}>{children}</body>
		</html>
	)
}
