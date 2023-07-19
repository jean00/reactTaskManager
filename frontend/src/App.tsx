import React, { useState } from 'react';
import Header from './components/Header/Header';
import './App.css';
import TaskList from './components/TaskList/TaskList';
import TaskProvider from './store/TaskProvider';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <header>
        <Header />
      </header>
      <main style={{ display: 'flex', flexWrap: 'wrap' }}>
        <TaskList />
      </main>
    </TaskProvider>
  );
};

export default App;
