import { describe } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Dropdown } from '../src/components/Dropdown';
import React from 'react';

const data = {
  options: ['main', 'develop'],
  value: 'main',
  onSelect() {},
};

describe('CommitCard', (): void => {
  it('should render', (): void => {
    render(<Dropdown {...data} />);
  });

  it('should show correct value', (): void => {
    render(<Dropdown {...data} />);
    screen.getByText('main');
  });

  it('should render options on click', (): void => {
    render(<Dropdown {...data} />);
    fireEvent.click(screen.getByRole('button'));
    screen.getByText('develop');
  });

  it('should close dropdown on select option', (): void => {
    render(<Dropdown {...data} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('develop'));
    expect(() => screen.getByText('develop')).toThrow();
  });
});
