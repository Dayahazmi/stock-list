// These styles apply to every route in the application
import './globals.css'
import ThemeProvider from './utils/ThemeProvider'

export const metadata = {
  title: 'Stock Inventory',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'dark:bg-medium'}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}