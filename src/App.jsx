import './App.css';
import Register from './components/Register';

function App() {
  return (
    <>
      <div className="App-Container">
        <div className="header">
          MERN Frontend
        </div>

        <div className="main-content">
          <Register />
          {/* <p>My age is</p> */}
        </div>

        <div className="footer">
          This is footer
        </div>
      </div>
    </>
  );
}

export default App;
