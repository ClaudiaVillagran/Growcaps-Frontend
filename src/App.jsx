import { BasicButton } from "./Components/BasicButton"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
      </ThemeProvider>

    </>
  )
}

export default App
