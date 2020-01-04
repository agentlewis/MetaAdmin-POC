import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Github from '@material-ui/icons/GitHub';


const GithubLink = () => {
  return (
    <a href="https://github.com/final-form/builder-demo" target="_blank">
      <Github/>
    </a>
  )
}

const styles: any = {
  link: {
    position: 'absolute',
    top: '5px',
    right: '15px',
    fontSize: '35px',
    color: '#333',
    zIndex: 10
  }
}

export default withStyles(styles)(GithubLink);