import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-slate-900">
      <Head>
        <title>Where to?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href='/map'>
        <a className='flex justify-center items-center text-8xl font-extrabold text-indigo-200 py-10 px-20 border-2 rounded-3xl hover:bg-indigo-200 hover:text-slate-900 hover:border-indigo-200 duration-200 ease-in-out'>Map</a>
      </Link>
    </div>
  )
}

export default Home
