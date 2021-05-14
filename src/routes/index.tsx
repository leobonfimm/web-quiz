import { Switch, Route } from 'react-router-dom';
import NumbeQuestions from '../pages/NumbeQuestions';
import Quiz from '../pages/Quiz';
import ReportQuestions from '../pages/ReportQuestions';

function Routes(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/" component={NumbeQuestions} />
      <Route path="/quiz/:qtdAsk" component={Quiz} />
      <Route path="/report-question" component={ReportQuestions} />
    </Switch>
  );
}

export default Routes;
