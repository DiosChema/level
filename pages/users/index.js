import { Typography } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {useState} from 'react'
const axios = require('axios').default;
import { useRouter } from 'next/router'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function User()
{

  const [emailText, setEmailText] = useState('')
  const [passwordText, setPasswordText] = useState('')
  const handleParam = setValue => e => setValue(e.target.value)
  const router = useRouter()

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Error al ingresar usuario / contraseña</h2>
    </div>
  );

  const getUser = (e) =>  {
    axios.post('http://localhost:3000/api/user/loginUser', {
      user: emailText,
      password: passwordText
    })
    .then(response => {
      if(response.data.usuario)
      {
        router.push({
          pathname: '/sales',
          query: { user: response.data.usuario.email },
        })
      }
      else
      {
        handleOpen()
      }
    });
  }

  return (
    <div>
      <Container maxWidth="sm">

        <Box m={0.5} pt={3} class="container" width="100%">

          <Typography pt={2} paragraph variant="h5">Ingresa tus datos</Typography>

          <Box pt={2}>
            <Input 
              fullWidth 
              type="email"
              autocomplete="email"
              class="input is-medium" 
              maxlength="72" 
              name="email" 
              id="email" 
              value = {emailText} 
              onChange={handleParam(setEmailText)}
              pattern="^(([^<>()[\]\\.,;:\s@&quot;]+(\.[^<>()[\]\\.,;:\s@&quot;]+)*)|(&quot;.+&quot;))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$" 
              placeholder="Email address" 
              required=""
            >
            </Input>
          </Box>

          <Box pt={2}>
            <Input 
              fullWidth type="password"
              maxlength="24"
              name="password"
              value = {passwordText} 
              onChange={handleParam(setPasswordText)}
              placeholder="Password"
              required=""
            >
            </Input>
          </Box>

          <Box pt={2}>
            <Button onClick={getUser} variant="contained" color="primary">
              Sign in
            </Button>
          </Box>
        </Box>


      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  )
}
