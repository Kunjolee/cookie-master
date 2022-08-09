import { useEffect, useState } from 'react';
import type { AppContext, AppProps } from 'next/app';

import Cookies from 'js-cookie';

import { CssBaseline, Theme, ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme, customTheme } from '../themes';

interface Props extends AppProps{
  theme: string;
}

function MyApp({ Component, pageProps, theme = 'custom' }: Props) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  
  useEffect(() => {    
    const cookieTheme = Cookies.get('theme') || 'light';
  
    const selectedTheme: Theme = cookieTheme === 'light'
      ? lightTheme
      : ( cookieTheme === 'dark' )
        ? darkTheme
        : customTheme
  
    setCurrentTheme(selectedTheme)
  }, []);

  

  
  return (
    <ThemeProvider theme={ currentTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// Cuando ocurre un error 'something' did not match. Server, es porque el server esta generando un contenido diferente a lo que esta mostrando el cliente, es decir, el servidor y el cliente no coinciden con lo que estan generando. En next el servidor no leera lo que esta en el useEffect

// getInitialProps en _app: no es recomendado usarlo, se recomienda usar getStaticProps y getServerSideProps

// Al usar getInitialProps en app, significa que lo estamos llamando en todas las paginas de mi aplicacion

// Al usar getInitialProps desactivo todas las funcionalidades estaticas de mi aplicacion, entonces no podre usar getStaticProps, getStaticPaths en ninguna parte de mi app , etc. lo que hara que mi app se vuelva mucho mas lenta 

// esto genera un problema porque hace que cada una de mis paginas sean generadas del lado del servidor con ssr en vez de generarlas de forma estatica, lo que hara que mi pagina sea mas lenta

// MyApp.getInitialProps = async ( appContext: AppContext ) => {
//   const { theme } = appContext.ctx.req ? ( (appContext.ctx.req as any).cookies ) : { theme: 'light' };

//   const validThemes = ['light','dark', 'custom'];


//   return {
//     theme: validThemes.includes( theme ) ? theme : 'dark'
//   }
// }

export default MyApp
