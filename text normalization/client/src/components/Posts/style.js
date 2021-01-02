import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems : "center",
    width: '100%',
  },
  total: {
    width: '40%',
  },
  button : {
    width : '20%',
    fontSize : '20px',
    marginRight : "5%",
    height : "50px",
    margin: theme.spacing(1)
  },
  container: {
    maxHeight: 440,
  },
}));
