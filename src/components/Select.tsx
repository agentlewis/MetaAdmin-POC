import React from 'react'
import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type SelectProps = {
  input: any,
  options: any[],
  name: string,
  style: any
}

const Select: React.FunctionComponent<SelectProps>  = ({ input, ...rest }) => (
  <MuiSelect
    style={rest.style}
    labelId={rest.name}
    id={rest.name}
    value={rest.options.find((option: any) => option.value === input.value)}
    onChange={(option: any) => input.onChange(option.value)}
  >
    {rest.options.map((option) => {
      <MenuItem value={option}>{option}</MenuItem>
    })}
  </MuiSelect>
)

export default Select;