import { useRef, useState } from 'react';
import {
  Button,
  Container,
  createStyles,
  makeStyles,
  Snackbar,
  TextField,
  Theme,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useFormik } from 'formik';

import { Link } from 'react-router-dom';
import questionsSvg from '../assets/questions.svg';
import Header from '../components/Header';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    main: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    boxForm: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FBFCFD',
      borderRadius: '10px',
    },
    logo: {
      margin: theme.spacing(1),
      width: theme.spacing(14),
      height: theme.spacing(14),
      objectFit: 'fill',
    },
    form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      width: '90%',
    },
    inputField: {
      width: '90%',
    },
    containerButtonActions: {
      width: '90%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    buttonActions: {
      margin: theme.spacing(3, 0, 2),
      flex: 1,
    },
  }),
);

function NumbeQuestions(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const [isDisableInput, setIsDisableInput] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleSubmitQuestions(number_question: number): void {
    if (number_question <= 0) {
      setIsError(true);
      return;
    }

    setIsDisableInput(true);
    setIsError(false);
  }

  function handleCancel() {
    setIsDisableInput(false);
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsError(false);
  };

  const formik = useFormik({
    initialValues: {
      number_question: '',
    },
    onSubmit: values => {
      const { number_question } = values;
      handleSubmitQuestions(Number(number_question));
    },
  });

  return (
    <div className={classes.root}>
      <Header />
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={isError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          O valor deve ser maior que zero
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs" className={classes.main}>
        <div className={classes.boxForm}>
          <img
            className={classes.logo}
            alt="Logo questions"
            src={questionsSvg}
          />

          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <TextField
              inputRef={inputRef}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="number_question"
              label="Número de questões"
              name="number_question"
              autoFocus
              className={classes.inputField}
              type="number"
              value={formik.values.number_question}
              onChange={formik.handleChange}
              disabled={isDisableInput}
            />

            {!isDisableInput ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Confirmar
              </Button>
            ) : (
              <div className={classes.containerButtonActions}>
                <Link
                  to={`/quiz/${inputRef.current?.value}`}
                  style={{
                    textDecoration: 'none',
                    color: '#FFF',
                    flex: 1,
                  }}
                >
                  <Button
                    type="button"
                    className={classes.buttonActions}
                    style={{
                      color: '#FFF',
                      background: '#00bfa5',
                      width: '100%',
                    }}
                  >
                    Start
                  </Button>
                </Link>

                <Button
                  type="button"
                  className={classes.buttonActions}
                  style={{ background: '#ef5350', color: '#fff' }}
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </form>
        </div>
      </Container>
    </div>
  );
}

export default NumbeQuestions;
