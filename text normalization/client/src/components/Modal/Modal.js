import React, {forwardRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux"
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import useStyles from "./style"
import { TextField, Button, Typography, Paper, Modal, Backdrop } from '@material-ui/core';
import {closeModal, createNewItem} from "./../../redux/main/actions"
import uuidv4 from "uuid/dist/v4"
const Fade = forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal() {
  const classes = useStyles();
  const [postData, setPostData] = useState({input : '', expected : '', output : '', result : '', id : ''})
  const stt = useSelector(state => state.stt)
  const dispatch = useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault()
    postData.id = uuidv4()
    dispatch(createNewItem(postData))
    dispatch(closeModal())
    setPostData({input : '', expected : '', output : '', result : '', id : ''})
  }
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={stt ? true : false}
        onClose={() => dispatch(closeModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}>
        <Fade in={stt ? true : false}>
          <Paper className={classes.paper}>
              <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                  <Typography variant="h6">Thêm mới</Typography>
                  <TextField name="message" variant="outlined" label="Văn bản cần chỉnh sửa" onChange={(e) => setPostData({ ...postData, input: e.target.value })} fullWidth multiline rows={4}/>
                  <TextField name="message" variant="outlined" label="Kết quả mong muốn" onChange={(e) => setPostData({ ...postData, expected: e.target.value })} fullWidth multiline rows={4}/>
                  <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
              </form>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
