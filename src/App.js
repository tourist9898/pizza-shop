import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PizzaOrderForm from './components/PizzaOrderForm';
import PizzaOrdersDisplay from './components/PizzaOrderDisplay';
import MainDisplay from './components/MainDisplay';

function App() {
  const [showOrderForm, setShowOrderForm] = useState(true);

  const handleBackButtonClick = () => {
    setShowOrderForm(!showOrderForm);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h1 className="text-center">Pizza Shop</h1>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              {showOrderForm ? (
                <PizzaOrderForm />
              ) : (
                <PizzaOrdersDisplay />
              )}
              <button onClick={handleBackButtonClick} className="btn btn-primary mt-4">
                {showOrderForm ? 'View Orders' : 'Back to Order Form'}
              </button>
            </div>
            <div className="col-md-6">
              {showOrderForm ? null : <MainDisplay />}
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
