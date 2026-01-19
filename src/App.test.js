import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Resonate app heading', () => {
  render(<App />);
  // Use getByRole to specifically target the h1 heading
  const headingElement = screen.getByRole('heading', { level: 1 });
  expect(headingElement).toHaveTextContent(/Clubhouse/i);
});