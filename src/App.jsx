import { CotizadorProvider } from "./context/CotizadorProvider";
import AppSeguros from "./components/AppSeguros";

export default function App() {
  return (
    <CotizadorProvider>
      <AppSeguros />
    </CotizadorProvider>
  )
}
