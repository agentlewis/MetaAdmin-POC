import React, {FunctionComponent} from 'react'
import ChevRight from '@material-ui/icons/KeyboardArrowRight';
import ChevDown from '@material-ui/icons/KeyboardArrowDown';

type ToggleProps = {
  open: boolean,
  onClick: any
}

const Toggle: FunctionComponent<ToggleProps> = ({open, onClick}) => (
  open ? <ChevDown onClick={onClick} /> : <ChevRight onClick={onClick} />
)

export default Toggle