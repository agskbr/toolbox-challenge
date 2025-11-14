import { useEffect, useState } from 'react'
import { Container, Table, InputGroup, Form } from 'react-bootstrap'
import { fetchFiles } from '../services'
import { LoadingSpinner } from '../components/LoadingSpinner'
import './Home.css'
import FilesTableContent from '../components/FilesTableContent'

export default function Page () {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchFiles().then((data) => setFiles(data))
      .finally(() => setLoading(false))
  }, [])

  const onSearch = () => {
    setLoading(true)
    fetchFiles(searchTerm).then((data) => setFiles(data))
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <div className='custom-header-app d-flex justify-content-between align-items-center px-4'>
        <span>React Test App</span>
        <div className='search-container'>
          <InputGroup>
            <Form.Control
              type='text'
              placeholder='Search by file name...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          ? <LoadingSpinner />
          : (
            <div
              className='table-responsive shadow-sm custom-files-table'
            >
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
    </div>
  )
}
