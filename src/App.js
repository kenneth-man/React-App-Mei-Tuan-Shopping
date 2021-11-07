import './App.css';
import ContextProvider from './Context';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import About from './Pages/About';
import Groceries from './Pages/Groceries.js';
import Products from './Pages/Products.js';
import Discover from './Pages/Discover.js';
import ShoppingCart from './Pages/ShoppingCart.js';
import Checkout from './Pages/Checkout.js';
import PageDetails from './Pages/PageDetails.js';
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <Navbar/>

          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/About' exact={true} component={About}/>
            <Route path='/Groceries' exact={true} component={Groceries}/>
            <Route path='/Products' exact={true} component={Products}/>
            <Route path='/Discover' exact={true} component={Discover}/>
            <Route path='/ShoppingCart' exact={true} component={ShoppingCart}/>
            <Route path='/Checkout' exact={true} component={Checkout}/>
            <Route path='/PageDetails/:PageItemName' exact={true} component={PageDetails}/>
          </Switch>

          <Footer/>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;