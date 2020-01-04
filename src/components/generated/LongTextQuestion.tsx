import React from 'react'
import { Field } from 'react-final-form'
import { withStyles } from '@material-ui/core/styles';
import Textarea from '../Textarea'

type LongTextQuestionProps = {
 question: Question
}

//DL TODO refactor out primitive types
type Question = {
  placeholder?: string,
  text: string,
  key: string,
  answers: Answer[]
}

type Answer = {
  value: string,
  text: string
}

const LongTextQuestion: React.FunctionComponent<LongTextQuestionProps> = ({ question }) => (
  <div className="row">
    <label className="label">{question.text}</label>
    <Field 
      className="textarea"
      name={question.key}
      component={Textarea}
      placeholder={question.placeholder}
    />
  </div>
)

const styles: any = {
  row: {
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  label: {
    marginBottom: '15px'
  },
  textarea: {
    border: '1px solid #ccc',
    minHeight: '90px',
    padding: '8px'
  }
}

export default withStyles(styles)(LongTextQuestion);
