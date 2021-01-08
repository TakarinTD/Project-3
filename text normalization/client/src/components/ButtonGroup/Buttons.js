import React, {useState} from 'react';
import {Button, TextField} from '@material-ui/core';
import {useDispatch} from "react-redux"
import {CloudUpload, PlusOne, PlaylistAdd} from "@material-ui/icons"
import useStyles from "./style"
import {openModal, createNewItem} from "./../../redux/main/actions"
import uuidv4 from "uuid/dist/v4"
import * as XLSX from 'xlsx';

export default function IconLabelButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [datainput, setdatainput] = useState('')
  let excel2datas = []
  const openSpringModal = () => {
    dispatch(openModal())
  }
  const handleUpload = (e) => {
    e.preventDefault();

    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        excel2datas = []
        var data = e.target.result;
        let readedData = XLSX.read(data, {type: 'binary'});
        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];

        /* Convert array to json*/
        let dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
        dataParse.splice(0, 1)
        excel2datas = dataParse.map(data => ({input : data[0], expected : data[1], output : '', result : '', id : uuidv4()}))
    };
    reader.readAsBinaryString(f)
  }
  const handlePostDataFromExcel = () => {
    excel2datas.forEach((newItem) => dispatch(createNewItem(newItem)))
    excel2datas = []
    setdatainput('')
  }
  return (
    <div className={classes.root}>
      <Button onClick = {openSpringModal} variant="contained" color="primary" className={classes.button} endIcon={<PlusOne/>}>Thêm Mới</Button>
      <div className={classes.addList}>
        <input accept=".xlsx, .xls, .csv" value = {datainput} className={classes.input} id="contained-button-file" multiple type="file" onChange = {(e) => handleUpload(e)}/>
        <label htmlFor="contained-button-file">
            <Button variant="contained" color="secondary" component="span" startIcon = {<CloudUpload/>}>Upload </Button>
        </label>
        <PlaylistAdd onClick = {handlePostDataFromExcel} style = {{marginLeft : '30px'}} className={classes.postaddicon} />
      </div>
      <div className={classes.addList}>
        <TextField id="standard-search" label="Type URL" type="search" />
        <CloudUpload className={classes.postaddicon} />
      </div>
    </div>
  );
}
