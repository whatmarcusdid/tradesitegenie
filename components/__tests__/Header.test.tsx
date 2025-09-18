
import { render, screen } from '@testing-library/react';
import Header from '../components/ui/Header';

describe('Header', () => {
  it('renders a heading', () => {
    render(<Header />);

    const heading = screen.getByRole('link', { name: /TradeSiteGenie/i });

    expect(heading).toBeInTheDocument();
  });
});
