import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to="/admin">
          <Button>prestataire</Button>   
        </Link>
         <Link to="/client">
           <Button>client</Button>
         </Link>
    </div>
  )
}

export default Home
