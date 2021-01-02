
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root : {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
    },
    addList:{
        outline: 'none',
        border : 'none',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
    },
    postaddicon : {
        cursor : 'pointer',
        color : '#821597',
        fontSize :'30px',
        transition : '0.3s',
        '&:hover': {
            color: '#e9491ab5',
        }
    },
    input : {display : 'none'},
    button: {
        margin: theme.spacing(1),
      },
}));
