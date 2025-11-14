import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { fetchFiles } from '../services';
import Home from '../pages/Home';
import '@testing-library/jest-dom';

jest.mock('../services', () => ({
  fetchFiles: jest.fn(),
}));

describe('Home Component', () => {
  const mockFiles = [
    {
      file: 'test1.csv',
      lines: [
        { text: 'test1', number: 1, hex: '0x1' },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner while fetching data', async () => {
    fetchFiles.mockImplementation(() => new Promise(() => {}));
    
    render(<Home />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays files data after successful fetch', async () => {
    fetchFiles.mockResolvedValue(mockFiles);
    
    render(<Home />);
    
    // Wait for the data to be loaded and verify all expected elements are present
    await waitFor(() => {
      expect(screen.getByText('test1.csv')).toBeInTheDocument();
      expect(screen.getByText('test1')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('0x1')).toBeInTheDocument();
    });
  });

  it('handles search functionality', async () => {
    const searchTerm = 'test';
    fetchFiles.mockResolvedValue(mockFiles);
    
    render(<Home />);
    
    const searchInput = screen.getByPlaceholderText('Search by file name...');
    const searchButton = screen.getByText('Search');
    
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    
    fireEvent.click(searchButton);
    
    expect(fetchFiles).toHaveBeenCalledWith(searchTerm);
  });

  it('handles search on Enter key press', async () => {
    const searchTerm = 'test';
    fetchFiles.mockResolvedValue(mockFiles);
    
    render(<Home />);
    
    const searchInput = screen.getByPlaceholderText('Search by file name...');
    
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    
    expect(fetchFiles).toHaveBeenCalledWith(searchTerm);
  });
});
