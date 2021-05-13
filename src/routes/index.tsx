import { Switch, Route } from 'react-router-dom';
import NumbeQuestions from '../pages/NumbeQuestions';
import Quiz from '../pages/Quiz';

function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={NumbeQuestions} />
      <Route path="/quiz/:qtdAsk" component={Quiz} />
    </Switch>
  );
}

export default Routes;
