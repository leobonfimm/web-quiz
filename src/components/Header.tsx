import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { ArrowForwardIos } from '@material-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 2,
    },
    linkReport: {
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: grey[500],
      background: '#FBFCFD',
      padding: theme.spacing(2),
      width: '100%',
      borderRadius: '10px',
      fontSize: '18px',
      maxWidth: '460px',
      textAlign: 'center',
    },
    iconArroRight: {
      margin: '0 0 0 auto',
    },
  }),
);

function Header(): JSX.Element {
  const classes = useStyles();

  const [lastQuestionsHit, setLastQuestionsHit] = useState(
    Number(localStorage.getItem('@WebQuiz:QtdHit')),
  );

  const [lastTotalQuestions, setLastTotalQuestions] = useState(
    Number(localStorage.getItem('@WebQuiz:QtdTotalQuestions')),
  );

  return (
    <>
      {lastTotalQuestions > 0 && (
        <Container maxWidth="xs" className={classes.header}>
          <h1>
            Report rate replied: {lastQuestionsHit}/{lastTotalQuestions}
          </h1>

          <Link to="/report-question" className={classes.linkReport}>
            Last report answered
            <ArrowForwardIos className={classes.iconArroRight} />
          </Link>
        </Container>
      )}
    </>
  );
}

export default Header;
