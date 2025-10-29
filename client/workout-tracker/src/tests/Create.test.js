import {render, screen, fireEvent } from '@testing-library/react';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'


//Add documentation
test('start a workout', () => {
    render(
      
    
  ) 
    const linkElement = screen.getByText(/ /i);
    expect(linkElement).toBeInTheDocument();
  });
  