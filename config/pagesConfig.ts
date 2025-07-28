export const pagesConfig = {
  '/': {
    headerType: 'primary',
    showFooter: true,
  },
  '/login': {
    headerType: 'none',
    showFooter: false,
  },
  '/users': {
    headerType: 'primary',
    showFooter: true,
  },
  '/users/register-child': {
    headerType: 'primary', 
    showFooter: false,
  },
  '/users/edit/[id]': {
    headerType: 'primary', 
    showFooter: false,
  },
  '/result': {
    headerType: 'secondary',
    showFooter: true,
  },
  '/forbidden': {
    headerType: 'none',
    showFooter: false,
  },
  '/not-found': {
    headerType: 'none',
    showFooter: false,
  },
  '/success': {
    headerType: 'none',
    showFooter: false,
  },
};
