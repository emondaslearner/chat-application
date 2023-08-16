export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// react select theme
export const selectThemeColors = theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#7367f01a', // for option hover bg-color
      primary: '#0984e3', // for selected option bg-color
      neutral10: '#0984e3', // for tags bg-color
      neutral20: '#0984e3', // for input border-color
      neutral30: '#0984e3' // for input hover border-color
    }
  })