import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PatientSearch } from './patient-search.component';
import { usePatient } from '../../../hooks/usePatient';

// Mock the custom hook
vi.mock('../../hooks/usePateint', () => ({
  usePatient: vi.fn(),
}));

describe('PatientSearch', () => {
  const mockOnSelectPatient = vi.fn();

  const mockPatients = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-05-15',
      gender: 'male' as const,
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: '1985-11-30',
      gender: 'female' as const,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input and title', () => {
    // Arrange
    (usePatient as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<PatientSearch onSelectPatient={mockOnSelectPatient} />);

    // Assert
    expect(screen.getByText('Search for Patient')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter patient name...')
    ).toBeInTheDocument();
  });

  it('shows no results message when search term exists but no patients found', async () => {
    (usePatient as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<PatientSearch onSelectPatient={mockOnSelectPatient} />);

    const input = screen.getByPlaceholderText('Enter patient name...');
    fireEvent.change(input, { target: { value: 'xyz' } });

    await waitFor(() => {
      expect(
        screen.getByText('No patients found matching "xyz"')
      ).toBeInTheDocument();
    });
  });

  it('displays list of patients when data is returned', async () => {
    (usePatient as any).mockReturnValue({
      data: mockPatients,
      isLoading: false,
      error: null,
    });

    render(<PatientSearch onSelectPatient={mockOnSelectPatient} />);

    const input = screen.getByPlaceholderText('Enter patient name...');
    fireEvent.change(input, { target: { value: 'jo' } });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(
        screen.getByText('DOB: 1990-05-15 • Gender: male')
      ).toBeInTheDocument();
    });
  });

  it('calls onSelectPatient when clicking a patient', async () => {
    (usePatient as any).mockReturnValue({
      data: mockPatients,
      isLoading: false,
      error: null,
    });

    render(<PatientSearch onSelectPatient={mockOnSelectPatient} />);

    const input = screen.getByPlaceholderText('Enter patient name...');
    fireEvent.change(input, { target: { value: 'john' } });

    await waitFor(() => {
      const patientItem = screen.getByText('John Doe').closest('li');
      expect(patientItem).toBeInTheDocument();

      fireEvent.click(patientItem!);
      expect(mockOnSelectPatient).toHaveBeenCalledWith(mockPatients[0]);
    });
  });

  it('does not show results list when search term is empty', () => {
    (usePatient as any).mockReturnValue({
      data: mockPatients,
      isLoading: false,
      error: null,
    });

    render(<PatientSearch onSelectPatient={mockOnSelectPatient} />);

    // No search term → list should not appear
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('shows loading state (optional - if you want to add it)', () => {
    (usePatient as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<PatientSearch onSelectPatient={mockOnSelectPatient} />);

    fireEvent.change(screen.getByPlaceholderText('Enter patient name...'), {
      target: { value: 'test' },
    });
    expect(screen.getByPlaceholderText('Enter patient name...')).toBeInTheDocument();
  });
});