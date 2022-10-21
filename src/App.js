import logo from './logo.svg';
import './App.css';
import { Calender } from './components/calender/calender';
import { useEffect } from 'react';

function App() {

  // useEffect(() => {
  //   console.log("parent component")
  // }, []);
  return (
    <div className="App">
      <header className="App-header">

        <Calender />
      </header>
    </div>
  );
}

export default App;
