import React from 'react'
import { Field } from 'react-final-form'
import { withStyles } from '@material-ui/core/styles';
import Select from '../Select'

type DropDownQuestionProps = {
 question: Question
}

//DL TODO refactor out primitive types
type Question = {
  text: string,
  key: string,
  answers: Answer[]
}

type Answer = {
  value: string,
  text: string
}

const DropDownQuestion: React.FunctionComponent<DropDownQuestionProps> = ({ question }) => (
  <div className="row">
    <label>{question.text}</label>
    <Field
      name={question.key}
      component={Select}
      options={
        question.answers
          ? question.answers.map(answer => ({
              value: answer.value,
              label: answer.text
            }))
          : []
      }
      isSearchable={false}
    />
  </div>
)

const styles: any = {
  row: {
    display: 'flex',
    flexFlow: 'row nowrap',
    label: {
      width: '150px',
      marginRight: '15px'
    }
  },
  select: {
    flex: 1
  }
}

export default withStyles(styles)(DropDownQuestion);
