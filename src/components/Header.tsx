import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
    <h1 className={classes.header}>
      Last report answered: {lastQuestionsHit}/{lastTotalQuestions}
    </h1>
  );
}

export default Header;
