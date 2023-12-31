import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Global } from '../Helpers/Global';


export const CreateSale = () => {
    const [date, setDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [saved, setSaved] = useState('notSaved');
    const [formData, setFormData] = useState({
        typeSale: '',
        quantity: '',
        total: '',
        date: '',
        nameClient: ''
    });

    useEffect(() => {
        getDateNow();
    }, []);


    const getDateNow = () => {
        const fechaActual = new Date();
        const ano = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que agregamos 1.
        const dia = fechaActual.getDate();
        const dateFormated = mes + '/' + dia + '/' + ano
        setDate(dateFormated)
        setFormData({ ...formData, date: dateFormated });
    }

    const createSale = async () => {

        console.log(formData);
        const request = await fetch(Global.url+'sale/register', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await request.json();
        if (data.status == 'success') {
            console.log(data)
            setSaved('saved')
            window.location.reload();
        }
    }

    const handlePhoneNumberChange = (event) => {
        const inputValue = event.target.value;

        // Utiliza una expresión regular para validar la entrada de números de teléfono
        const regex = /^[0-9+]*$/;

        if (regex.test(inputValue) || inputValue === '') {
            setPhoneNumber(inputValue);
        }
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;

        // Realiza conversiones de tipo si es necesario
        const updatedValue = name === 'quantity' || name === 'numberClient' || name === 'total' ? parseFloat(value) : value;

        setFormData({
            ...formData,
            [name]: updatedValue,
        });
    };

    return (
        <>
            <h1>Registrar venta de {date}</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-basic-tipo-prenda"
                    label="Tipo de Prenda"
                    variant="outlined"
                    name="typeSale"
                    onChange={handleFieldChange}
                />

                <TextField
                    id="outlined-number-cantidad"
                    label="Cantidad"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ min: 1 }}
                    name="quantity"
                    onChange={handleFieldChange}
                />

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Total</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        inputProps={{
                            type: 'number',
                        }}
                        name="total"
                        onChange={handleFieldChange}
                    />
                </FormControl>

                <TextField
                    id="outlined-basic-nombre-cliente"
                    label="Nombre cliente"
                    variant="outlined"
                    name="nameClient"
                    onChange={handleFieldChange}
                />

                <TextField
                    id="outlined-basic-numero-cliente"
                    label="Numero cliente"
                    variant="outlined"
                    name="numberClient"
                    value={phoneNumber}
                    onChange={(e) => {
                        handlePhoneNumberChange(e);
                        handleFieldChange(e);
                    }}
                />

                <Button onClick={createSale}>Registrar venta</Button>
            </Box>
            {saved == 'saved' ?
                <h1>Registrado con exito</h1>
                : ''
            }
        </>
    );
};