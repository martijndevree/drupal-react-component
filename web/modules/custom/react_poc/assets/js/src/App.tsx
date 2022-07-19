import React from 'react';
import './App.scss';
import NodeItemList from './components/NodeItemList';

function App() {
  return (
    <div className='test-app'>
      <h1>Onze mooiste trailers</h1>
      <NodeItemList />
    </div>
  );
}

export default App;
