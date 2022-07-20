import React, { FC } from 'react';
import './App.scss';
import NodeItemList from './components/NodeItemList';

const App: FC = () => (
  <div className='test-app'>
    <h1>Onze mooiste trailers</h1>
    <NodeItemList />
  </div>
);

export default App;
