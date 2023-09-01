import { describe } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { CommitCard } from '../src/components/CommitCard';
import React from 'react';

const data = {
  sha: 'a40cbfac32a688b67c16910e5db596acb6345779',
  author: {
    avatar_url: 'https://avatars.githubusercontent.com/u/37187963?v=4',
    login: 'johndoe',
    email: 'john@example.com',
    name: 'John Doe',
  },
  date: new Date('2023-08-26T06:25:30Z'),
  message: 'feat: commit * feat: test * refactor: test',
  html_url: 'http://github.com',
};

describe('CommitCard', (): void => {
  it('should render avatar', (): void => {
    render(<CommitCard {...data} />);
    screen.getAllByAltText('small avatar');
  });

  it('should render only first 7 characters of sha', (): void => {
    render(<CommitCard {...data} />);
    screen.getByText(data.sha.slice(0, 7));
  });

  it('should render user card on avatar hover', (): void => {
    render(<CommitCard {...data} />);
    fireEvent.mouseOver(screen.getAllByAltText('small avatar')[0]);
    screen.getByRole('user-card');
  });

  it('should clip comments from message', () => {
    render(<CommitCard {...data} />);
    const clippedMessage = data.message.split('*')[0].trim();
    screen.getByText(clippedMessage);
  });

  it('should render author', () => {
    render(<CommitCard {...data} />);
    const author = data.author.name;
    screen.getAllByText(author);
  });
});
