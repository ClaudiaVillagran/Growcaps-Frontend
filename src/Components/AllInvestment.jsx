
import Button from '@mui/material/Button';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { Global } from '../Helpers/Global';
import { Modal } from './Modal';


const columns = [
    { id: 'date', label: 'Fecha', minWidth: 100 },
    { id: 'amountProduct', label: 'Monto invertido', minWidth: 10 },
    {
        id: 'amountSend',
        label: 'Costo de envió',
        minWidth: 100,
    },
    {
        id: 'nameClient',
        label: 'Nombre cliente',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'numberClient',
        label: 'Número cliente',
        minWidth: 100,
        align: 'right',
    }

];

export const AllInvestment = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [investmentData, setInvestmentData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [idEdit, setIdEdit] = useState('');

        
        let totalInvestment = 0;

    const textTable = document.getElementById(":r3:")
    if (textTable) {

        textTable.textContent = 'Filas por página: ';
    }
    useEffect(() => {
        getInvestment();
    }, [])

    const getInvestment = async () => {
        const request = await fetch(Global.url + 'investment/getInvestments', {
            method: 'GET',
        })
        const data = await request.json();
        if (data.status == 'success') {
            setInvestmentData(data.investment)
        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleEdit = (row) => {
        setOpen(true);
        setIdEdit(row._id);
    };
    const handleDelete = async (row) => {
        console.log(row)
        const request = await fetch(Global.url + 'investment/deleteInvestment/' + row._id, {
            method: 'DELETE'
        })
        const data = request.json();

        window.location.reload();
    };

    return (
        <>
            <h1>Registro de inversiones</h1>
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={3}>
                                    Detalle inversion
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Detalle cliente
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Acciones
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ top: 57, minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>

                                ))}
                                <TableCell align='center' >
                                    Editar
                                </TableCell>
                                <TableCell align='center'>
                                    Eliminar
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {investmentData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => {
                                                if (column.id === 'date') {
                                                    // Formatear la fecha
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {formatDate(row.date)}
                                                        </TableCell>
                                                    );
                                                } else {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                            <TableCell align='center'>
                                                <Button
                                                    variant="contained" color="success"
                                                    onClick={() => handleEdit(row)}
                                                >
                                                    Editar
                                                </Button>

                                            </TableCell>
                                            <TableCell align='center'>

                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDelete(row)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={investmentData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {open && <Modal idEdit={idEdit} open={open} setOpen={setOpen} />}
            {investmentData.map(investment => {
                totalInvestment += (investment.amountProduct + investment.amountSend);
            })
            }
            <h1>Total inversiones: $ {totalInvestment}</h1>
            
        </>
    )
}
