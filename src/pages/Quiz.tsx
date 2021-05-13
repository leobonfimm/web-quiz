import {
  Button,
  Container,
  createStyles,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
} from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../services/api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      width: '100%',
      background: '#FBFCFD',
      borderRadius: '10px',
      padding: theme.spacing(4),
      maxWidth: '700px',
    },
    formAnswer: { width: '100%' },
    listAnswer: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      gap: 10,
    },
    buttonActions: {
      margin: theme.spacing(3, 0, 2),
      flex: 1,
    },
    success: {
      color: '#388E3C',
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

interface ReponseProps {
  response_code: number;
  results: Question[];
}

function Quiz(): JSX.Element {
  const classes = useStyles();
  const { goBack } = useHistory();

  const { qtdAsk } = useParams<{ qtdAsk: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [helperText, setHelperText] = useState('Choose one of the answers');
  const [qtdQuestionsAnswered, setQtdQuestionsAnswered] = useState(0);

  useEffect(() => {
    async function GetQuestions() {
      const numberQuestion = Number(qtdAsk);

      const response = await api.get<ReponseProps>(
        `api.php?amount=${numberQuestion}`,
      );

      const questionsFormatted = response.data.results.map(item => {
        const answers = [item.correct_answer, ...item.incorrect_answers];
        return {
          question: item.question,
          answers,
          correct_answer: item.correct_answer,
          incorrect_answers: item.incorrect_answers,
          type: item.type,
          isHit: false,
          isError: false,
          answerSelected: '',
        };
      });

      setQuestions(questionsFormatted);
    }

    GetQuestions();
  }, [qtdAsk]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem('@WebQuiz:QtdTotalQuestions', qtdAsk);
    const oneMoreQuestionAnswered = qtdQuestionsAnswered + 1;
    setQtdQuestionsAnswered(oneMoreQuestionAnswered);

    if (
      questions[indexQuestion].answerSelected !==
      questions[indexQuestion].correct_answer
    ) {
      setHelperText('Sorry, wrong answer!');
      questions[indexQuestion].isError = true;
      questions[indexQuestion].isHit = false;

      const stateQuestions = questions.map(item => {
        if (item.question === questions[indexQuestion].question) {
          return {
            ...item,
            isHit: false,
            isError: true,
          };
        }

        return item;
      });

      setQuestions(stateQuestions);

      return;
    }

    questions[indexQuestion].isHit = true;
    questions[indexQuestion].isError = false;

    const stateQuestions = questions.map(item => {
      if (item.question === questions[indexQuestion].question) {
        return {
          ...item,
          isHit: true,
          isError: false,
        };
      }

      return item;
    });

    setQuestions(stateQuestions);

    setHelperText('You got it!');
    const qtdHit = questions.reduce((sumTotal, item) => {
      return (sumTotal += item.isHit ? 1 : 0);
    }, 0);

    localStorage.setItem('@WebQuiz:QtdHit', String(qtdHit));
  }

  function handleNext() {
    const newIndexQuestion = indexQuestion + 1;

    setIndexQuestion(newIndexQuestion);

    if (questions[newIndexQuestion].isError) {
      setHelperText('Sorry, wrong answer!');
      return;
    }

    if (questions[newIndexQuestion].isHit) {
      setHelperText('You got it!');
      return;
    }

    setHelperText('');
  }

  function handlePrevious() {
    const newIndexQuestion = indexQuestion - 1;
    setIndexQuestion(newIndexQuestion);

    if (questions[newIndexQuestion].isError) {
      setHelperText('Sorry, wrong answer!');
      return;
    }

    if (questions[newIndexQuestion].isHit) {
      setHelperText('You got it!');
      return;
    }

    setHelperText('');
  }

  function handleRadioChange(event: ChangeEvent<HTMLInputElement>) {
    const stateQuestions = questions.map(item => {
      if (item.question === questions[indexQuestion].question) {
        return {
          ...item,
          answerSelected: event.target.value,
        };
      }

      return item;
    });

    setQuestions(stateQuestions);
    setHelperText('');
  }

  if (questions.length <= 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
        }}
      >
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {questions && (
        <Container fixed component="main" className={classes.main}>
          <form onSubmit={handleSubmit}>
            <FormControl
              component="fieldset"
              error={questions[indexQuestion].isError}
              className={classes.formAnswer}
            >
              <FormLabel component="legend">
                {questions[indexQuestion].question}
              </FormLabel>
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                value={questions[indexQuestion].answerSelected}
                onChange={handleRadioChange}
              >
                {questions[indexQuestion].answers.map(answer => (
                  <FormControlLabel
                    value={answer}
                    key={answer}
                    control={<Radio />}
                    label={answer}
                    disabled={
                      questions[indexQuestion].isError ||
                      questions[indexQuestion].isHit
                    }
                  />
                ))}
              </RadioGroup>
              <FormHelperText
                className={
                  questions[indexQuestion].isHit ? classes.success : ''
                }
              >
                {helperText}
              </FormHelperText>
              {!(
                questions[indexQuestion].isError ||
                questions[indexQuestion].isHit
              ) &&
                questions[indexQuestion].answerSelected && (
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Check Answer
                  </Button>
                )}
            </FormControl>
          </form>

          <div className={classes.buttonContainer}>
            <Button
              disabled={indexQuestion === 0}
              type="button"
              onClick={handlePrevious}
              className={classes.buttonActions}
              variant="contained"
              color="secondary"
            >
              Previous
            </Button>
            <Button
              disabled={indexQuestion + 1 === questions.length}
              type="button"
              onClick={handleNext}
              className={classes.buttonActions}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </div>

          <footer>
            {qtdQuestionsAnswered === Number(qtdAsk) && (
              <Button
                variant="contained"
                color="default"
                startIcon={<ArrowBackIos />}
                fullWidth
                onClick={goBack}
              >
                Back
              </Button>
            )}
          </footer>
        </Container>
      )}
    </div>
  );
}

export default Quiz;
