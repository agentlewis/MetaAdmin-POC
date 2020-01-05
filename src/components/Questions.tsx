import React, { FunctionComponent } from 'react'
import { FieldArray } from 'react-final-form-arrays'
import { Add } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Question from './Question'
import SortableList from './SortableList'

const Questions: FunctionComponent<{questions: any}> = ({ questions }) => {
  return (
    <div className="container">
      <FieldArray name="questions">
        {({ fields }) => (
          <React.Fragment>
            <SortableList
              //@ts-ignore
              onSortEnd={({ oldIndex, newIndex }) =>
                fields.move(oldIndex, newIndex)
              }
            >
              {fields.map((name, index) => (
                // this is the item
                <Question key={name} index={index} name={name} />
              ))}
            </SortableList>
            <div className="buttons">
              <Button
                color="secondary"
                onClick={() => fields.push({ type: 'text' })}
              >
                <Add />Add Question
              </Button>
            </div>
          </React.Fragment>
        )}
      </FieldArray>
    </div>
  )
}

const styles: any = {
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: '20px 0',
  },
  buttons: {
    padding: '10px',
    textAlign: 'center'
  }
}

export default withStyles(styles)(Questions);
