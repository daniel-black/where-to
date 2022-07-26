import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

type Props = {}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html>
        <Head />
        <body className='bg-zinc-900 min-h-full min-w-full'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document