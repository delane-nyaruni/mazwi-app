import React from 'react'
import SchemaPdfView from './SchemaPdfView'
import PDF from './kumenberg system schema v1.0.0.pdf'
const UserManual = () => {
  return (
    <div className='container'><br />
        <h1>DFMS</h1> <br /><br />
        <p><code>User Guide</code> <hr className='visible-hr' />

        1. Introduction <br />
        2. System Setup <br />
      <SchemaPdfView pdf={PDF} />
        <br />
        2. Network Address <br />
        </p>

    </div>
  )
}

export default UserManual