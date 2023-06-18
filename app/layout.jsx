import '@styles/globals.css';
import Nav from '@components/Nav';
import AlertProvider from '@components/AlertProvider';

export const metadata = {
  title: 'Pokecatch',
  description: 'Pokemon Website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='h-screen bg-gray-100'>
        <AlertProvider>
          <main className="h-full max-w-screen-2xl mx-auto sm:px-16">
            <section className="py-6">
              <Nav/>
            </section>
            <section className='py-6'>
              { children }
            </section>
          </main>
        </AlertProvider>
      </body>
    </html>
  )
}
