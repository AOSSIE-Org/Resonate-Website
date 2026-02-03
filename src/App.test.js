import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Resonate logo with alt text', () => {
  render(<App />);
  const logo = screen.getByAltText(/resonate logo/i);
  expect(logo).toBeInTheDocument();
});
