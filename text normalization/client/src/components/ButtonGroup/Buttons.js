import React from 'react';
import {Button, TextField} from '@material-ui/core';
import {useDispatch} from "react-redux"
import {CloudUpload, PlusOne, PlaylistAdd} from "@material-ui/icons"
import useStyles from "./style"
import {openModal} from "./../../redux/main/actions"

export default function IconLabelButtons() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openSpringModal = () => {
    dispatch(openModal())
  }
  return (
    <div className={classes.root}>
      <Button onClick = {openSpringModal} variant="contained" color="primary" className={classes.button} endIcon={<PlusOne/>}>Thêm Mới</Button>
      <div className={classes.addList}>
        <input className={classes.input} id="contained-button-file" multiple type="file"/>
        <label htmlFor="contained-button-file">
            <Button variant="contained" color="secondary" component="span" startIcon = {<CloudUpload/>}>Upload </Button>
        </label>
        <PlaylistAdd style = {{marginLeft : '30px'}} className={classes.postaddicon} />
      </div>
      <div className={classes.addList}>
        <TextField id="standard-search" label="Type URL" type="search" />
        <CloudUpload className={classes.postaddicon} />
      </div>
    </div>
  );
}
