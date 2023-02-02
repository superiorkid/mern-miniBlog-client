import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ChakraProvider>
          <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                  <App />
              </QueryClientProvider>
          </BrowserRouter>
      </ChakraProvider>
  </React.StrictMode>,
)
