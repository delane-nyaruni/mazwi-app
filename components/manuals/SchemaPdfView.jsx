import React, { useState} from 'react'
import './PdfView.css'
import { Document, Page, pdfjs} from 'react-pdf'

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const SchemaPdfView = ({ pdf}) => {
    const [numPages,setNumPages] = useState(null);
    const [pageNumber,setPageNumber] = useState(1) ;

    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages)
    }

    const nextPage=()=>{
        if(pageNumber < numPages){
            setPageNumber(pageNumber + 1);
        }
    }
    const prevPage=()=>{
        if(pageNumber > numPages){
            setPageNumber(pageNumber - 1);
        }   
    }

    return (
    <>
       <div className='wrap'>
        <div className='controls'>

        <button onClick={prevPage} disabled={pageNumber === 1}>
            prev
        </button>
        <button onClick={nextPage} disabled={pageNumber === numPages}>
            next
        </button>

        </div>

        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}
        onContextMenu={(e)=>e.preventDefault()}
        className='pdf-container' >
            <Page pageNumber={pageNumber} />
        </Document>
        </div> 
    </>
  )
}

export default SchemaPdfView