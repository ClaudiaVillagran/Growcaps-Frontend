import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


import { Global } from '../Helpers/Global';

export const Modal = ({ idEdit, open, setOpen }) => {
    const [saleData, setSalesData] = React.useState({});

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getSale(idEdit);
    }, [idEdit]);

    const getSale = async (id) => {
        const request = await fetch(Global.url + 'sale/getSale/' + id, {
            method: 'GET'
        })

        const data = await request.json();
        if (data.status === 'success') {
            setSalesData(data.sale);
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Editar venta'}
                </DialogTitle>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="filled-basic" label="Tipo de venta"  value={saleData.typeSale || ''} variant="filled" />
                    <TextField id="filled-basic" label="Cantidad" value={saleData.quantity || ''} variant="filled" />
                    <TextField id="filled-basic" label="Total" value={saleData.total || ''} variant="filled" />
                    <TextField id="filled-basic" label="Nombre cliente" value={saleData.nameClient || ''} variant="filled" />
                    <TextField id="filled-basic" label="Numero cliente" value={saleData.numberClient || ''} variant="filled" />

                </Box>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleClose} autoFocus>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
