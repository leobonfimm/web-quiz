import {
  Container,
  createStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Checkbox,
} from '@material-ui/core';
import { blue, green, red } from '@material-ui/core/colors';
import { Cancel, CheckCircle, Home } from '@material-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
    },
    report: {
      height: '80vh',
      width: '100%',
      maxWidth: '700px',
      background: '#FBFCFD',
      overflow: 'auto',
      paddingLeft: theme.spacing(1),
      borderRadius: '10px',
    },
    containerAnswers: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: theme.spacing(2),
    },
    linkGoBack: {
      textDecoration: 'none',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: theme.spacing(3),
      color: blue[500],
    },
  }),
);

interface Question {
  question: string;
  answers: string[];
  correct_answer: string;
  incorrect_answers: string[];
  type: boolean;
  answerSelected: string;
  isHit: boolean;
  isError: boolean;
}

function ReportQuestions(): JSX.Element {
  const classes = useStyles();
  const [questions, setQuestions] = useState<Question[]>(() => {
    const report = localStorage.getItem('@WebQuiz:Report');

    if (report) {
      return JSON.parse(report);
    }

    return [];
  });

  return (
    <Container className={classes.root}>
      <Link to="/" className={classes.linkGoBack}>
        <Home /> Go home
      </Link>
      <div className={classes.report}>
        {questions.map((item, index) => (
          <div>
            <h3>
              {index + 1} - {item.question}
            </h3>
            <List>
              {item.answers.map(answer => (
                <ListItem key={answer} style={{ listStyleType: 'revert' }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={answer === item.answerSelected}
                      tabIndex={-1}
                      disabled
                    />
                  </ListItemIcon>
                  <ListItemText id={answer} primary={answer} />
                  {answer === item.correct_answer ? (
                    <CheckCircle style={{ color: green[500] }} />
                  ) : (
                    <Cancel style={{ color: red[500] }} />
                  )}
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ReportQuestions;
