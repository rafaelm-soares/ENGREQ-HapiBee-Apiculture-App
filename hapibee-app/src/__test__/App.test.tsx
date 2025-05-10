import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'src/App';
import { Provider } from 'react-redux';
import store from 'src/redux/storage/store';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/HAPIBEE/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Testing component <App />', () => {

  test('renders the landing page', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

});
