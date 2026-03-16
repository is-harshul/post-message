import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router.tsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import './index.css'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#09090b',
        color: '#e4e4e7',
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  </React.StrictMode>,
)
