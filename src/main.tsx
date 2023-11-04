import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router.tsx'
import { ChakraProvider } from '@chakra-ui/react'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </React.StrictMode>,
)
