import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
//@ts-ignore
import { OnChange } from 'react-final-form-listeners'

type FieldCangesProps = {
  field: string,
  becomes?: any,
  set: string,
  to?: any
}

const WhenFieldChanges: React.FunctionComponent<FieldCangesProps>  = ({ field, becomes, set, to }) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } }
    ) => (
      <OnChange name={field}>
        { (value: any) => {
          if (value === becomes) {
            onChange(to)
          }
        }}
      </OnChange>
    )}
  </Field>
)

export default WhenFieldChanges
