
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
import { Modal } from './Modal';
import { Global } from '../Helpers/Global';

const columns = [
    { id: 'date', label: 'Fecha', minWidth: 100 },
    { id: 'quantity', label: 'Cantidad', minWidth: 10 },
    {
        id: 'typeSale',
        label: 'Tipo de venta',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'total',
        label: 'Monto',
        minWidth: 50,
        align: 'right',
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

export const AllSales = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [salesData, setSalesData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [idEdit, setIdEdit] = useState('');


    const textTable = document.getElementsByClassName("MuiTablePagination-selectLabel")
    if (textTable) {

        textTable.textContent = 'Filas por página: ';
    }
    let totalSale = 0;
    useEffect(() => {
        getSales();
    }, [])

    const getSales = async () => {
        const request = await fetch(Global.url + 'sale/getSales', {
            method: 'GET',
        })
        const data = await request.json();
        console.log(data);
        if (data.status == 'success') {
            setSalesData(data.sale)
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
        const request = await fetch(Global.url + 'sale/deleteSale/' + row._id, {
            method: 'DELETE'
        })
        const data = request.json();
        console.log(data);

        window.location.reload();
    };
    return (
        <>
            <h1>Registro de ventas</h1>
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" colSpan={4}>
                                    Detalle Venta
                                </TableCell>
                                <TableCell align="center" colSpan={2}>
                                    Detalle cliente
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {salesData
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
                                            <TableCell>
                                                <Button
                                                    variant="contained" color="success"
                                                    onClick={() => handleEdit(row)}
                                                >
                                                    Editar
                                                </Button>
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
                    count={salesData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {open && <Modal idEdit={idEdit} open={open} setOpen={setOpen} />}
            {salesData.map(sale => {
                totalSale += sale.total;
            })
            }
            <h1>Dinero ventas: $ {totalSale}</h1>
            <h1>Dinero inversion: $ </h1>
        </>
    )
}
