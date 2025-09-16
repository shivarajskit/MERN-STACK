import Counter from './components/Counter';
import Greeting from './components/Greeting';

function App() {

  return (
    <>
      <Greeting isLoggedIn={true} />
      <div className="card">
        <Counter />
      </div>
    </>
  )
}

export default App;
