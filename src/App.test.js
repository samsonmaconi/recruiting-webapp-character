import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header title', () => {
  render(<App />);
  const appHeaderTitleElement = screen.getByText(/React Coding Exercise/i);
  expect(appHeaderTitleElement).toBeInTheDocument();
});

test('renders character card', () => {
  render(<App />);
  const characterCardElement = screen.getByText(/CharacterCard/i);
  expect(characterCardElement).toBeInTheDocument();
});
