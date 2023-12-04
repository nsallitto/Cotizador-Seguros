import { createContext, useState } from "react"
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => { //TODA LA DATA SE PASA A useCotizador

    const [datos, setDatos] = useState({
        marca: "",
        year: "",
        plan: ""
    });
    const [error, setError] = useState("");
    const [resultado, setResultado] = useState(0);
    const [cargando, setCargando] = useState(false);

    const handleChangeDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        //Una Base
        let resultado = 2000
        //Diferencia años
        const diferencia = obtenerDiferenciaYear(datos.year);
        //Resta del 3% por año de diferencia
        resultado -= ((diferencia * 3) * resultado) / 100;
        //Incremento segun marca
            //Europeo: 30%
            //Americano: 15%
            //Asiatico: 5%
        resultado *= calcularMarca(datos.marca);
        //Incremento segun Plan
            //Basico: 20%
            //Completo: 50%
        resultado *= calcularPlan(datos.plan);
        //Ponemos el monto en USD
        resultado = formatearDinero(resultado);

        setCargando(true);

        setTimeout(() => {
            setResultado(resultado);
            setCargando(false);
        }, 3000)
        
    }

    return(
        <CotizadorContext.Provider
            value={{
                handleChangeDatos,
                datos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando,
            }}
        >
            {children}
        </CotizadorContext.Provider>
    ) 
}

export {
    CotizadorProvider
}
export default CotizadorContext