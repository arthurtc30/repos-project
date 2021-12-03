import Routes from "./routes";
import GlobalStyle from './styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
      <Routes />
    </>
  );
}

export default App;
