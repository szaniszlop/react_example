import {Outlet} from 'react-router-dom'
import Header from './components/application/headerComponent.js'

function App() {
  console.log("inside App");
  return (
    <div className="App">
      <Header/>
      <div className="App-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
