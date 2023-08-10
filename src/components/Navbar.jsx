import { MDBNavbar, MDBContainer } from 'mdb-react-ui-kit'
import React from 'react'
import pokemonLogo from "../pokemon-logo.png"
import pokeBall from "../pokeball3.png"

const Navbar = () => {
  return (
    <div>
      <MDBNavbar light className='border-bottom'>
        <MDBContainer fluid className='d-flex justify-content-center justify-content-lg-start gap-3'>
          <img src={pokemonLogo} className="App-logo" alt="logo" />
          <img src={pokeBall} className="Ball-logo" alt="logo" />
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Navbar
