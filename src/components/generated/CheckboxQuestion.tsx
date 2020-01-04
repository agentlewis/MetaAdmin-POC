import React from 'react'
import { Field } from 'react-final-form'
import { withStyles } from '@material-ui/core/styles';

type CheckboxQuestionProps = {
  question: {
    text: string,
    key: string
  }
}

const CheckboxQuestion: React.FunctionComponent<CheckboxQuestionProps> = ({ question }) => (
  <label className="row">
    <span>{question.text}</span>
    <Field name={question.key} component="input" type="checkbox" />
  </label>
)

const styles: any = {
  row: {
    display: 'flex',
    flexFlow: 'row nowrap',
    span: {
      width: '150px',
      marginRight: '15px'
    },
    input: {
      position: 'relative',
      top: '5px'
    }
  }
}

export default withStyles(styles)(CheckboxQuestion);

