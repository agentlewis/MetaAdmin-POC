import React from 'react'
import { Field } from 'react-final-form'
import { withStyles } from '@material-ui/core/styles';

type TextQuestionProps = {
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

const TextQuestion: React.FunctionComponent<TextQuestionProps> = ({ question }) => (
  <div className="row">
    <label>{question.text}</label>
    <Field
      name={question.key}
      component="input"
      type="text"
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
    width: '150px',
    marginRight: '15px',
    lineHeight: '32px'
  },
  input: {
    padding: '5px 8px'
  }
}

export default withStyles(styles)(TextQuestion);
