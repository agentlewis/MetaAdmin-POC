import React, {FunctionComponent} from 'react'
import { FieldArray } from 'react-final-form-arrays'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Answer from './Answer'
import SortableList from './SortableList'

type AnswersProps = {
  name: string
}

const Answers: FunctionComponent<AnswersProps> = ({ name }) => (
  <div className="container">
    <FieldArray name={`${name}.answers`}>
      {({ fields }) => (
        <React.Fragment>
          <SortableList
            onSortEnd={( oldIndex: number, newIndex: number ) =>
              fields.move(oldIndex, newIndex)
            }
          >
            {fields.map((name, index) => (
              <Answer
                key={name}
                index={index}
                name={name}
                remove={() => fields.remove(index)}
              />
            ))}
          </SortableList>
          <div className="buttonsWrapper">
            <IconButton color='secondary' onClick={() => fields.push({})}>
              <Add /> Add Answer
            </IconButton>
          </div>
        </React.Fragment>
      )}
    </FieldArray>
  </div>
)

const styles: any = {
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: '10px 0',
    paddingLeft: '20px'
  },
  buttonsWrapper: {
    padding: '10px',
    textAlign: 'center'
  }
}

export default withStyles(styles)(Answers);