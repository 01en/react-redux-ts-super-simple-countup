import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Action, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'

interface StateProps {
  count: number;
}

interface DispatchProps {
  countUp: () => void
}

type Props = StateProps & DispatchProps;

class App extends React.Component<Props> {
  render() {
    return (
      <div className="App" >
        <p
          onClick={this.props.countUp}
        >{this.props.count}</p>
      </div >
    );
  }
}

// ①: ActionType作成
export enum ActionType {
  COUNT_UP = 'COUNT_UP'
}

// ②:ActionCreator
export const countUp = (): Action<ActionType> => {
  return {
    type: ActionType.COUNT_UP
  };
}

// ③:Redux Storeの構造と初期値定義
export interface RootState {
  count: number;
}
const INITIAL_STATE: RootState = {
  count: 0
};

// ④:Reducer作成
const reducer = (state: RootState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionType.COUNT_UP:
      return {
        count: state.count + 1
      };
    default:
      return state;
  }
}

const composeEnhancers = composeWithDevTools({

});

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger)  // add logger!
  )
);

// ⑥: React Component + Redux Storeの結合
const mapStateToProps = (state: RootState): StateProps => {
  return {
    count: state.count
  };
}
const mapDispatchToProps = {
  countUp
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
