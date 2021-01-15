import './App.css';
import friends1 from './friends1.jpg';

function App() {
  return (
    <div className="App" style={{backgroundImage:`linear-gradient(to left, rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)), url(${friends1})`}}>
      <h1><span className="App-one">one</span>layover</h1>
      <h2>coming soon!<i className="fas fa-plane"></i></h2>
    </div>
  );
}

export default App;
