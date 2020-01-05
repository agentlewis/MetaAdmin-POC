import React, {ReactNode} from 'react'
import { Field } from 'react-final-form'
import { withStyles } from '@material-ui/core/styles';
import { SortableElement } from 'react-sortable-hoc'
import SortHandle from './SortHandle'
import Select from './Select'
import WhenFieldChanges from './WhenFieldChanges'
import Textarea from './Textarea'
import Answers from './Answers'
import Toggle from './Toggle'

const types = [
  {
    value: 'text',
    label: 'Text'
  },
  {
    value: 'longText',
    label: 'Long Text'
  },
  {
    value: 'checkbox',
    label: 'Checkbox'
  },
  {
    value: 'optionGroup',
    label: 'Option Group'
  },
  {
    value: 'checklist',
    label: 'Checklist'
  },
  {
    value: 'dropdown',
    label: 'Drop Down'
  }
]

const hasOptions = (type: any) => ~['optionGroup', 'checklist', 'dropdown'].indexOf(type)
const isText = (type: any) => ~['text', 'longText'].indexOf(type)

const IfType = (name: any, predicate: any, children: ReactNode) => (
  <Field name={`${name}.type`} subscription={{ value: true }}>
    {({ input: { value } }) => (predicate(value) ? children : null)}
  </Field>
)

const SortableItem = (open: boolean, name: string, toggleOpen: Function) => {
  return SortableElement((value: any) => (
  <div className="container">
    <div className="handle">
      <SortHandle />
    </div>
    <div className="toggleWrapper">
      <Toggle 
        open={open}
        onClick={toggleOpen}
      />
    </div>
    <div className="row">
      <Field
        name={`${name}.key`}
        component="input"
        type="text"
        placeholder="Field Name"
      />
      <Field
        name={`${name}.type`}
        //DL Select may need to be wrapped in order to match the styles.
        component={Select}
        options={types}
        isSearchable={false}
      />
      <WhenFieldChanges
        field={`${name}.type`}
        becomes="text"
        set={`${name}.answers`}
        to={undefined}
      />
    </div>
    <div className="row">
      <Field
        name={`${name}.text`}
        component={Textarea}
        placeholder="Question"
      />
    </div>
    {open && (
      <React.Fragment>
        <IfType name={name} predicate={hasOptions}>
          <Answers name={name} />
        </IfType>
        <IfType name={name} predicate={isText}>
          <div className="row">
            <Field
              name={`${name}.placeholder`}
              component={Textarea}
              placeholder="Placeholder"
            />
          </div>
        </IfType>
      </React.Fragment>
    )}
  </div>
))}

type QuestionProps = {
  name: string
}

class Question extends React.Component<QuestionProps> {
  state = {
    open: true
  }

  toggleOpen = (event: any) => {
    this.setState(() => ({ open: !this.state.open }))
  }

  render() {
    const ComposedSortableItem = SortableItem(this.state.open, this.props.name, this.toggleOpen)
    return (
      <ComposedSortableItem />
    )
  }
}

const styles: any = {
  container: {
    position: 'relative',
    border: '1px solid #ddd',
    borderNadius: '3px',
    padding: '10px 10px 10px 40px',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
  },
  row: {
    display: 'flex',
    flexFlow: 'row nowrap',
    'input, textarea': {
      fontFamily: 'monospace',
      flex: 1,
      padding: '6px 9px',
      fontSize: '1em',
      border: '1px solid #ccc',
      borderRadius: '3px',
      '& [disabled]': {
        background: '#eee',
      }
    },
    '& > input': {
      margin: 0
    },
    '& > textarea': {
      minHeight: '38px',
      lineHeight: '24px',
      marginLeft: 0,
      marginRight: '3px'
    }
  },
  handle: {
    position: 'absolute',
    left: '3px',
    top: '50%',
    fontSize: '20px',
    marginTop: '-10px',
    color: '#666'
  },
  toggleWrapper: {
    position: 'absolute',
    top: '-15px',
    left: '5px',
    width: '20px',
    marginRight: '5px',
    marginTop: '20px'
  },
  buttons: {
    padding: '10px',
    textAlign: 'center'
  }
}

export default withStyles(styles)(Question);