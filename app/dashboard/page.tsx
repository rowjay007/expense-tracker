import Head from 'next/head'
import Link from 'next/link'
import { FiLogIn, FiUserPlus } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Expense App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to the Expense App
        </h1>

        <h3 className="mt-4 text-2xl">
          Experience a new way to track expenses
        </h3>

        <div className="mt-8 flex flex-wrap justify-center">
          <Link href="/login">
            <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4">
              <FiLog
          </a>
      </Link>
      <Link href="/register">
        <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <FiUserPlus className="mr-2" />
          Register
        </a>
      </Link>
    </div>
  </main>
</div>
)
}