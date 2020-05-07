import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#254e58',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    appColor1: {
      main: '#88bcbd'
    }
  },
  sidebarWidth: {
    main: {
      marginLeft: '17em',
      
    
    }
  },
  sidebarWidthMobile: {
    main: {
      marginLeft: 0
    }

  }
});

export default theme;
