import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { Input } from '@mui/base';
import { Box, InputAdornment, OutlinedInput, TextField } from '@mui/material';


export const CreateSale = () => {
    const [typeCap, setTypeCap] = React.useState('');
    const [caps, setCaps] = useState([])
    const [date, setDate] = useState('')

    useEffect(() => {
        getCaps()
        getDateNow()
    }, [])


    const handleChange = (event) => {
        setTypeCap(event.target.value);
    };

    const getDateNow = () => {
        const fechaActual = new Date();
        const ano = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que agregamos 1.
        const dia = fechaActual.getDate();
        const dateFormated = dia + '/' + mes + '/' + ano
        setDate(dateFormated)
    }

    const getCaps = async () => {
        const request = await fetch('http://localhost:3001/api/cap/getCaps', {
            method: 'GET',
        })

        const data = await request.json();
        console.log(data)
        if (data.status == 'success') {
            setCaps(data.caps)
            console.log("caps", caps)
        }

    }

    return (
        <>
            <h1>Registrar venta de {date}</h1>
            <form>
                <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <InputLabel id="demo-select-small-label">Tipo de gorra</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={typeCap}
                        label="Tipo de gorra"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value='otro'>Otro</MenuItem>
                        {caps.map(cap => {
                            return (
                                <>
                                    <MenuItem value={cap.brand} key={cap._id}>{cap.brand}</MenuItem>
                                </>
                            )
                        })}
                    </Select>
                </FormControl>

                {caps.map(cap => {
                    return (
                        <>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}  key={cap._id}>
                                <div>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Amount"
                                            value={cap.price}
                                        />
                                    </FormControl>
                                </div>
                            
                            </Box>
                        </>
                    )
                })}

            </form>
        </>

    )
}
