
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CreateSale } from "./Components/CreateSale";
import { AllSales } from './Components/AllSales';
import { Button } from '@mui/material';
import { Nav } from './Components/Nav';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Nav/>
      </ThemeProvider>

    </>
  )
}

export default App
