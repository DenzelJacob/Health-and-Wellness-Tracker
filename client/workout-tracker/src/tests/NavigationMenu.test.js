import {render, screen, fireEvent } from '@testing-library/react';
import NavigationRouter from '../App';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'


//Add documentation
test('Default homes screen', () => {
  render(
    <BrowserRouter>
      <NavigationRouter />
    </BrowserRouter>
  
) 
  const linkElement = screen.getByText(/Welcome to Fitness Tracker!/i);
  expect(linkElement).toBeInTheDocument();
});


test('Navigate to Create screen', () => {
 
  render(
    <BrowserRouter >
      <NavigationRouter />
    </BrowserRouter>
  
  ); 

  fireEvent.click(screen.getByText('Create'));

  const linkElement = screen.getByText(/Add exercise/i);
  expect(linkElement).toBeInTheDocument();
});


test('Navigate to History screen', () => {
 
  render(
    <BrowserRouter >
      <NavigationRouter />
    </BrowserRouter>
  
  ); 

  fireEvent.click(screen.getByText('History'));

  const linkElement = screen.getByText(/This is History page/i);
  expect(linkElement).toBeInTheDocument();
});


test('Navigate to Profile screen', () => {
 
  render(
    <BrowserRouter >
      <NavigationRouter />
    </BrowserRouter>
  
  ); 

  fireEvent.click(screen.getByText('Profile'));

  const linkElement = screen.getByText(/This is the profile page/i);
  expect(linkElement).toBeInTheDocument();
});


test('Navigate to noPageFound', () => {
  const badRoute = '/bad/route'
  render(
    <MemoryRouter  initialEntries={[badRoute]}>
      <NavigationRouter />
    </MemoryRouter>
  
  ); 

  
  const linkElement = screen.getByText(/404 not found/i);
  expect(linkElement).toBeInTheDocument();
});