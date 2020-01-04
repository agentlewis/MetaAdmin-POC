import React, { FunctionComponent } from 'react'
import { Form, Field } from 'react-final-form'
import TextQuestion from './generated/TextQuestion'
import LongTextQuestion from './generated/LongTextQuestion'
import CheckboxQuestion from './generated/CheckboxQuestion'
import OptionGroupQuestion from './generated/OptionGroupQuestion'
import DropdownQuestion from './generated/DropdownQuestion'
import ChecklistQuestion from './generated/ChecklistQuestion'
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async (values: any) => {
  await sleep(300)
  window.alert(JSON.stringify(values))
}

const components: any = {
  text: TextQuestion,
  longText: LongTextQuestion,
  checkbox: CheckboxQuestion,
  optionGroup: OptionGroupQuestion,
  checklist: ChecklistQuestion,
  dropdown: DropdownQuestion
}

const GeneratedForm: FunctionComponent<{schema?: any, classes: any}> = ({ schema, classes }) => (
  <Box>
    <Typography variant="h1" component="h2">
      {name}
    </Typography>
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, values, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <div className={classes.questionWrapper}>
            {values.questions &&
              values.questions
                .filter((question: any) => question.key && question.type)
                .map((question: any, index: number) => {
                  const QuestionComponent = components[question.type]
                  return (
                    question.key && (
                      <QuestionComponent key={index} question={question} />
                    )
                  )
                })}
          </div>
          <div>
            <Button
              color="secondary"
              disabled={submitting || pristine}
              type="submit"
            >
              Submit
            </Button>
          </div>
          <pre>{JSON.stringify(values)}</pre>
        </form>
      )}
    </Form>
  </Box>
)

const styles: any = {
  questionWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  title: {
    display: 'block',
    textAlign: 'center'
  }
}

export default withStyles(styles)(GeneratedForm);