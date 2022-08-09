import { ChangeEvent, useState, useEffect } from 'react';

import { GetServerSideProps } from 'next'; 

import Cookies from 'js-cookie';
import axios from 'axios';

import { Button, Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

 
import { Layout } from '../components/layouts';

interface Props {
  theme: string;
}

const ThemeChangerPage = ({ theme }: Props) => {

  const [currentTheme, setCurrentTheme] = useState(theme);

  

  const handleChange = (event: ChangeEvent<HTMLInputElement> ) => {

    const selectedTheme = event.target.value;
    
    setCurrentTheme( selectedTheme );

    localStorage.setItem('themeStorage', selectedTheme);
    Cookies.set('theme', selectedTheme);
  }
  
  const handleClick = async () => {
    const { data } = await axios.get('api/hello');

    console.log({data});
  }

  useEffect(() => {
    console.log('LocalStorage: ', localStorage.getItem('themeStorage'));
    console.log('Cookies from client: ', Cookies.get('theme'));
  }, []);


  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <RadioGroup
              value={ currentTheme }
              onChange={ handleChange }
            >
              <FormControlLabel value='light' control={ <Radio /> } label='Light' />
              <FormControlLabel value='dark' control={ <Radio /> } label='Dark' />
              <FormControlLabel value='custom' control={ <Radio /> } label='Custom' />              
            </RadioGroup>
          </FormControl>

          <Button
            onClick={ handleClick }
          >
            Request
          </Button>
        </CardContent>
      </Card>
    </Layout>
  )
}


// Cuando una pagina esta utilizando el getServerSideProps, se convierte en una pagina que se generara del lado del servidor con SSR, despues de cada request del cliente, en vez de ser generado de forma estatica

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

  const { theme='light' } = req.cookies;  

  const validThemes = ['light','dark', 'custom'];

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'custom'
    }
  }
}

export default ThemeChangerPage;

    // Las cookies tienen menos capacidad de almacenamiento que el localstorage

    // Las cookies son enviadas al backend en request time, es decir cuando ya tengo una cookie declarada y el cliente hace un request, inmediatamente se la manda al backend

    // Esa es la principal diferencia con el localstorage, ya que, este mismo no puede ser enviado en request time al backend, a menos que lo hagamos de forma manual

    // Enviar muchas cookies al backend pueden afectar la experiencia del usuario (volviendo lenta la app)
    // Las cookies tienen menos capacidad de almacenamiento que el localstorage

    // Las cookies guardan informacion de las preferencias del usuario 

    // Uso de las cookies: Cuando el cliente haga una solicitud, regresar informacion especializada basada en lo que esa persona esta buscando, entonces no es necesario que el usuario inicie sesion para poder obtener la informacion que el usuario esta buscando, y con esa informacion puedo ofrecerle los productos que mas le puedan interesar al usuario