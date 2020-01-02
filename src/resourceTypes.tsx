// in src/ResourceTypess.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  FileField,
  FileInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";
import { CardContent, Typography, Box, Toolbar } from '@material-ui/core';
import { sanitizeEmptyValues } from 'react-admin';
import arrayMutators from 'final-form-arrays'
import { Form, Field } from 'react-final-form';

import Questions from './components/Questions'
import GeneratedForm from './components/GeneratedForm'



const ResourceTypesFilter = (props: any) => {
  return (<Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>);
};

export const ResourceTypesList = (props: any) => (
  <List {...props} filters={<ResourceTypesFilter />}>
    <Datagrid>
      <TextField source="title" />
      <RichTextField source="body" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

export const ResourceTypesShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <RichTextField source="body" />
      <FileField source="file.src" title="file.title" />
    </SimpleShowLayout>
  </Show>
);

export const ResourceTypesCreate = (props: any) => (
  <Create {...props}>
    <VisitorForm {...props}/>
  </Create>
);

export const ResourceTypesEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <RichTextInput source="body" />
      <SelectInput
        source="rating"
        choices={[
          { id: 1, name: "Good" },
          { id: 2, name: "Okay" },
          { id: 3, name: "Bad" }
        ]}
      />
      <FileInput source="file" label="File" accept="application/pdf">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);

// the parent component (Edit or Create) injects these props to their child
//@ts-ignore
export const VisitorForm = ({ basePath, record, save, saving, version }) => {
    const submit = (values: any) => {
        // React-final-form removes empty values from the form state.
        // To allow users to *delete* values, this must be taken into account 
        save(sanitizeEmptyValues(record, values));
    };
    return (
        <Form
            initialValues={record}
            onSubmit={submit}
            mutators={{ ...arrayMutators }} // necessary for ArrayInput
            subscription={defaultSubscription} // don't redraw entire form each time one field changes
            key={version} // support for refresh button
            keepDirtyOnReinitialize
            render={formProps => (
              <Box display="flex">
                <Box>
                  <form onSubmit={submit}>
                    <h3>Editor</h3>
                    <label>Form Name</label>
                    <Field
                      name="name"
                      component="input"
                      type="text"
                      placeholder="Form Name"
                      style={{ width: '100%' }}
                    />
                    <Questions />
                  </form>
                </Box>
                <Box>
                  <h3>Schema</h3>
                  <pre>{JSON.stringify(formProps.values)}</pre>
                </Box>
                <Box>
                  <h3>Generated Form</h3>
                  <GeneratedForm schema={formProps.values} />
                </Box>
              </Box>
            )}
        />
    );
};
const defaultSubscription = {
    submitting: true,
    pristine: true,
    valid: true,
    invalid: true,
};