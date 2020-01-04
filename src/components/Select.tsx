import React from 'react'
import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//DL Defining props here breaks when passing the component to DropdownQuestion - use any instead.
type SelectProps = {
  input: any,
  options: any[],
  name: string,
  style: any
}

const Select: React.FunctionComponent<any>  = ({ input, options, name, style }) => (
  <MuiSelect
    style={style}
    labelId={name}
    id={name}
    value={options.find((option: any) => option.value === input.value)}
    onChange={(option: any) => input.onChange(option.value)}
  >
    {options.map((option: any) => {
      <MenuItem value={option}>{option}</MenuItem>
    })}
  </MuiSelect>
)

export default Select;