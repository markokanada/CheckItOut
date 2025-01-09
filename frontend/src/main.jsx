import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, createSystem, defineConfig } from "@chakra-ui/react";
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
})

const system = createSystem(config);

createRoot(document.getElementById('root')).render(
  <ChakraProvider value={system}>
    <Router>
      <Header />
      <App />
    </Router>
  </ChakraProvider>
)
