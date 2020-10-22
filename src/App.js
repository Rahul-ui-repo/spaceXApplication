import React from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import AsyncComponent from './AsyncComponent';


const history = createHistory();

const home = AsyncComponent(() =>
  import('./Pages/homepage/home').then(module => module.default)
)


export class App extends React.Component {
 
  componentDidMount() {
    history.push('/spacexhome');
  }

  render() {

    return (
      <div className="App" style={{ background: '#f2f2f2' }}>
        <Router history={history}>
          <div>
            <div>
              <Switch>
                <Route exactly component={home} path="/spacexhome" />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
