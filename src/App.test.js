import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux';

test('renders app header title', () => {
  render(
  <Provider store={store}>
    <App />
  </Provider>);
  const appHeaderTitleElement = screen.getByText(/React Coding Exercise/i);
  expect(appHeaderTitleElement).toBeInTheDocument();
});

test('renders character card', () => {
  render(
  <Provider store={store}>
    <App />
  </Provider>);
  
  const attributesCardHeader = screen.getByText(/Attributes/i);
  expect(attributesCardHeader).toBeInTheDocument();
  
  const classesCardHeader = screen.getByText(/Classes/i);
  expect(classesCardHeader).toBeInTheDocument();
});

// Todo: more detailed tests
