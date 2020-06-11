import { createMuiTheme } from "@material-ui/core";
import { green, red,purple, grey,blueGrey, blue } from "@material-ui/core/colors";
import { dark } from "@material-ui/core/styles/createPalette";

export default createMuiTheme({
  //breakpoints: {
  //  values: {
  //      sm: 1000
  //  },
  //},

  
  palette: {
    primary: {
      light: '#C8E6C9',
      dark: '#388E3C',
      main: '#4CAF50'
    },
    text: {
      primary: '#212121',
      secondary: '#757575'
    },
    divider: '#BDBDBD',
  },
});