import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    margin: '30px auto',
    flexDirection: 'row',
    justifyContent: 'center',
    width : "96%",
    alignItems: 'center',
    height : '75px'
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
  },
  image: {
    marginLeft: '15px',
  },
}));
