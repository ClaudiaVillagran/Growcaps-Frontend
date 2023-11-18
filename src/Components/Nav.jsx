import { Button } from "@mui/material"
import { useState } from "react"
import { CreateSale } from "./CreateSale";
import { AllSales } from "./AllSales";
import { CreateInvestment } from "./CreateInvestment";
import { AllInvestment } from "./AllInvestment";

export const Nav = () => {
    const [viewSales, setViewSales] = useState(false);
    const [viewInvestment, setViewInvestment] = useState(false);
    
    const showSales = () =>{
        setViewSales(true);
        setViewInvestment(false);
    }
    const showInvestment = () =>{
        setViewInvestment(true);
        setViewSales(false);
    }

  return (
    <>
        <Button onClick={showSales}>Ventas</Button>
        <Button onClick={showInvestment}>Inversiones</Button>

        {viewSales && (
            <div>
                <CreateSale />
                <AllSales />
            </div>
        )}
        {viewInvestment && (
            <div>
               <CreateInvestment/>
               <AllInvestment/>
            </div>
        )}
    </>
  )
}
