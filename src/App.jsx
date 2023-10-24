import { BasicButton } from "./Components/BasicButton"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CreateSale } from "./Components/CreateSale";
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

        <article>
          <BasicButton text="registrar venta" classButton='basicButton' />
        </article>
        <CreateSale/>
      </ThemeProvider>

    </>
  )
}

export default App
