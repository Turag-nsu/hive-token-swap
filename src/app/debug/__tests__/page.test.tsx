import React from 'react';
import { render, screen } from '@testing-library/react';
import DebugPage from '../page';

// Mock the useUser hook
jest.mock('@/hooks/useUser', () => ({
  useUser: () => ({
    username: 'testuser',
  }),
}));

// Mock the TestRunner component
jest.mock('@/components/debug/TestRunner', () => ({
  TestRunner: () => <div data-testid="test-runner">Test Runner Component</div>,
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

describe('DebugPage', () => {
  it('renders correctly', () => {
    render(<DebugPage />);
    
    // Check if the main title is rendered
    expect(screen.getByText('Debug Dashboard')).toBeInTheDocument();
    
    // Check if the TestRunner component is rendered
    expect(screen.getByTestId('test-runner')).toBeInTheDocument();
    
    // Check if the Profile Data Comparison section is present
    expect(screen.getByText('Profile Data Comparison')).toBeInTheDocument();
    
    // Check if the Run Profile Comparison button is present
    expect(screen.getByText('Run Profile Comparison')).toBeInTheDocument();
  });

  it('shows development tools section', () => {
    render(<DebugPage />);
    
    // Check if development tools section is present
    expect(screen.getByText('Development Tools')).toBeInTheDocument();
    
    // Check if links are present
    expect(screen.getByText('Hive Keychain Test')).toBeInTheDocument();
    expect(screen.getByText('Profile Page')).toBeInTheDocument();
    expect(screen.getByText('Social Feed')).toBeInTheDocument();
  });
});