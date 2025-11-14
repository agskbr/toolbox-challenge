import PropTypes from 'prop-types'

export default function FilesTableContent ({ files }) {
  if (!files || files.length === 0) {
    return (
      <tr>
        <td colSpan='4' className='text-center py-3'>No files found</td>
      </tr>
    )
  }

  return files.flatMap((fileData) =>
    fileData.lines.map((line, lineIndex) => (
      <tr key={`${fileData.file}-${lineIndex}`}>
        <td>{fileData.file}</td>
        <td>{line.text ?? ''}</td>
        <td>{line.number ?? ''}</td>
        <td className='text-break'>{line.hex ?? ''}</td>
      </tr>
    ))
  )
}

FilesTableContent.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.string.isRequired,
      lines: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          number: PropTypes.number,
          hex: PropTypes.string
        })
      ).isRequired
    })
  ).isRequired
}
