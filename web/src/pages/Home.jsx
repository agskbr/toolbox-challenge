import { useEffect, useState } from 'react'
import { Container, Table, InputGroup, Form, ToastContainer, Toast } from 'react-bootstrap'
import { fetchFiles } from '../services'
import { LoadingSpinner } from '../components/LoadingSpinner'
import './Home.css'
import FilesTableContent from '../components/FilesTableContent'

export default function Page () {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState({ show: false, message: '' })

  const loadFiles = async (fileName) => {
    setLoading(true)
    try {
      const data = await fetchFiles(fileName)
      setFiles(data)
    } catch (err) {
      setToast({
        show: true,
        message: err?.message ?? 'Unexpected error occurred'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFiles()
  }, [])

  const onSearch = () => loadFiles(searchTerm)

  return (
    <div>
      <div className='custom-header-app d-flex justify-content-between align-items-center px-4'>
        <h1>React Test App</h1>
        <div className='search-container'>
          <InputGroup>
            <Form.Control
              type='text'
              placeholder='Search by file name...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              className='search-input'
            />
            <InputGroup.Text onClick={onSearch}>
              <i className='bi bi-search'>Search</i>
            </InputGroup.Text>
          </InputGroup>
        </div>
      </div>

      <Container fluid className='py-4 px-3 px-md-5'>
        {loading
          ? (<LoadingSpinner />)
          : (
            <div className='table-responsive shadow-sm custom-files-table'>
              <Table striped bordered className='mb-0'>
                <thead className='table-light sticky-top z-index-10'>
                  <tr>
                    <th className='md-th-files-table'>File Name</th>
                    <th className='sm-th-files-table'>Text</th>
                    <th className='sm-th-files-table'>Number</th>
                    <th className='lg-th-files-table'>Hex</th>
                  </tr>
                </thead>
                <tbody>
                  <FilesTableContent files={files} />
                </tbody>
              </Table>
            </div>
            )}
      </Container>

      <ToastContainer position='bottom-end' className='p-3'>
        <Toast
          onClose={() => setToast({ show: false, message: '' })}
          show={toast.show}
          delay={6000}
          autohide
        >
          <Toast.Header>
            <strong className='me-auto text-danger'>Oops!</strong>
          </Toast.Header>
          <Toast.Body className='text-danger'>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

    </div>
  )
}
