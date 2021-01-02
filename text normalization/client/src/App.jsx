import React, { useState, useEffect } from 'react';
import { Container, AppBar, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import IconLabelButtons from "./components/ButtonGroup/Buttons"
import Posts from './components/Posts/Posts';

import SpringModal from "./components/Modal/Modal"
import {getAllItems} from './redux/main/actions';
import useStyles from './style';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllItems());
  }, [currentId, dispatch]);
 
  return (
    <Container maxWidth="lg">
       <SpringModal/>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <IconLabelButtons/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
