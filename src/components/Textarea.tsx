import React from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

type TextAreaProps = {
  input: any
}

const TextArea: React.FunctionComponent<TextAreaProps>  = ({ input, ...rest }) => (
  <TextareaAutosize
    {...input}
    {...rest} 
  />
)

export default TextArea;
