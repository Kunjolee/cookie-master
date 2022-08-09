import NextLink from 'next/link';

import { AppBar, IconButton, Toolbar, Link, Typography } from '@mui/material';

import { MenuOutlined } from '@mui/icons-material';

const Navbar = () => {
  
  return (
    <AppBar position='sticky' elevation={ 0 }>
      <Toolbar>

        <IconButton
          size='large'
          edge='start'
        >
          <MenuOutlined />
        </IconButton>
        
        <NextLink href='/' passHref>
          <Link sx={{ textDecoration: 'none' }}>
            <Typography variant='h6' color='white'>CookieMaster</Typography>
          </Link>
        </NextLink>

        <div style={{ flex: 1 }}/>

        <NextLink href='/theme-changer' passHref>
          <Link sx={{ textDecoration: 'none' }}>
            <Typography variant='h6' color='white'>Change Theme</Typography>
          </Link>
        </NextLink>

      </Toolbar>
    </AppBar>
  )
}
export default Navbar