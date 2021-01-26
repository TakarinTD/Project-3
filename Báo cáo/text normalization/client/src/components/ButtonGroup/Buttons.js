import React, {useState} from 'react';
import {Button, TextField} from '@material-ui/core';
import {useDispatch} from "react-redux"
import {CloudUpload, PlusOne, PlaylistAdd} from "@material-ui/icons"
import useStyles from "./style"
import {openModal, createNewItem, addDataFromUrl} from "./../../redux/main/actions"
import uuidv4 from "uuid/dist/v4"
import * as XLSX from 'xlsx';

export default function IconLabelButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [dataInput, setDataInput] = useState({file_input : '', url_input : ''})
  let excel2datas = []
  const openSpringModal = () => {
    dispatch(openModal())
  }
  const handlePostDataFromExcel = () => {
    excel2datas.forEach((newItem) => dispatch(createNewItem(newItem)))
    excel2datas = []
    setDataInput({...dataInput, file_input : ''})
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
        handlePostDataFromExcel()
    };
    reader.readAsBinaryString(f) 
  }
  const uploadDataFromUrl = async () => {
    let datas = await addDataFromUrl({url : dataInput.url_input})
    console.log(datas)
    datas.forEach((data) => {
      dispatch(createNewItem({input : data.input, expected : data.expected, output : '', result : '', id : uuidv4()}))
    })
    setDataInput({...dataInput, url_input : ''})
  }
  return (
    <div className={classes.root}>
      <Button onClick = {openSpringModal} variant="contained" color="primary" className={classes.button} endIcon={<PlusOne/>}>Thêm Mới</Button>
      <div className={classes.addList}>
        <input accept=".xlsx, .xls, .csv" value = {dataInput.file_input} className={classes.input} id="contained-button-file" multiple type="file" onChange = {(e) => handleUpload(e)}/>
        <label htmlFor="contained-button-file">
            <Button variant="contained" color="secondary" component="span" startIcon = {<CloudUpload/>}>Upload </Button>
        </label>
        <PlaylistAdd onClick = {handlePostDataFromExcel} style = {{marginLeft : '30px', display : "none"}} className={classes.postaddicon} />
      </div>
      <div className={classes.addList}>
        <TextField value = {dataInput.url_input} onChange = {(e) => setDataInput({...dataInput, url_input : e.target.value})} id="standard-search" label="Type URL" type="search" />
        <CloudUpload onClick = {uploadDataFromUrl} className={classes.postaddicon} />
      </div>
    </div>
  );
}
