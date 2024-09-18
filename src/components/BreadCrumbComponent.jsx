import { NavigateNextRounded } from '@mui/icons-material'
import { Box, Breadcrumbs, Link } from '@mui/material'
import React from 'react'
import { IconTitleMap } from '../Utils/Constants'
import "../resources/css/shared.css"

export default function BreadCrumbComponent({data}) {
    return (
        // <Box sx={{p:3}}>
        <Box>
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextRounded />}>
            {/* <Breadcrumbs maxItems={2} aria-label="breadcrumb" separator={<NavigateNextRounded />}> */}
            {/* <Breadcrumbs aria-label="breadcrumb" separator=">"> */}
            {/* <Breadcrumbs aria-label="breadcrumb"> */}
                {
                    data.map((data, index) => (
                        <div className="breadCrumbItem" key={index} >
                            <Link 
                                fontSize={12}
                                sx={{cursor: 'pointer', display: 'flex', alignItems: 'center', pr: 1, pl: 1}} 
                                underline={index === data.length-1 ? "none" : "hover"} 
                                color={index === data.length-1 ? "text.primary" : "inherit"} 
                                to={`/${data}`}
                            >
                                {data}{IconTitleMap[data]}
                            </Link>
                        </div>
                    ))
                }
                {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
                </Breadcrumbs>
        </Box>
    )
}
