import { Typography } from '@mui/material'
import React from 'react'
import "../resources/css/shared.css"

export default function PageNotFound() {
  return (
    <div className="FullPageError">
        <Typography paragraph variant='h5'>
            The Resource You are Looking for is not available.
        </Typography>
    </div>        
  )
}
