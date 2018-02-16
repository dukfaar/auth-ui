import React from 'react'

import { Link } from 'react-router-dom'

import { ListItem } from 'material-ui'

const NavigationLink = ({link}) => (<Link to={link.href}><ListItem button>{link.text}</ListItem></Link>)

export default NavigationLink
