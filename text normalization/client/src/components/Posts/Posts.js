import React from 'react';
import {Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} 
from "@material-ui/core"
import {useSelector, useDispatch} from 'react-redux'
import {PlayArrow, DeleteOutline} from "@material-ui/icons"
import useStyles from './style';
import {expandCallAPI, getAllItems, sendMailExcel} from "./../../redux/main/actions"

const columns = [
  { id: 'input', label: 'INPUT', minWidth: 100 },
  { id: 'expected', label: 'EXPECTED', minWidth: 170 },
  { id: 'output', label: 'OUTPUT', minWidth: 200 },
  { id: 'result', label: 'RESULT', minWidth: 80 },
];


export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const dispatch = useDispatch()
  const items = useSelector(state => state.items)
  const total = items.length
  let pass = 0
  let fail = 0
  items.forEach((i) => {
    if (i.result === 'pass') pass += 1
    else if(i.result === 'fail') fail += 1
  })
  const text1 = `${pass}/${total} (${total !== 0 ? (pass*100/total).toFixed(1) : 0} %)` 
  const text2 = `${fail}/${total} (${total !== 0 ? (fail*100 /total).toFixed(1): 0} %)` 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCallSendEmail = () => {
    let pass = 0
    let fail = 0
    
    items.forEach((i) => {
      if (i.result === 'pass') pass += 1
      else if(i.result === 'fail') fail += 1
    })
    let text1 = `${pass}/${total} (${total !== 0 ? (pass*100/total).toFixed(1) : 0} %)` 
    let text2 = `${fail}/${total} (${total !== 0 ? (fail*100 /total).toFixed(1): 0} %)` 

    let data2excel = {
      items : items,
      pass : text1,
      fail : text2
    }
    sendMailExcel(data2excel)
  }

  const handleCallApi = async (e) => {
    e.preventDefault()
    let reqs = []
    items.forEach((item) => {if(item.result === '') reqs.push(item)})
    if(reqs.length) {
      await dispatch(expandCallAPI(reqs))
      handleCallSendEmail()
    }
  }

  const resetItems = (e) => {
    e.preventDefault()
    dispatch(getAllItems())
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Card  className={classes.card} >
        <Table className={classes.total} stickyHeader aria-label="sticky table">
          <TableBody>
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>PASS</TableCell>
              <TableCell align="right">{text1}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>FAIL</TableCell>
              <TableCell align="right">{text2}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div>
          <Button onClick = {resetItems} className={classes.button} variant="outlined" color="secondary" endIcon = {<DeleteOutline/>}>Clear</Button>
          <Button onClick = {handleCallApi} className={classes.button} variant="outlined" color="primary" endIcon = {<PlayArrow/>}>Run</Button>
        </div>
      </Card>
    </Paper>
  );
}
