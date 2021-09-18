import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import Header from '../components/header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fallback: pageProps.fallback,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <Header />
      <Component {...pageProps} />
    </SWRConfig>
  )
}
export default MyApp
