import * as React from "react";
import { PostList, PostShow, PostCreate, PostEdit } from "./posts";
import { ResourceTypesList, ResourceTypesShow, ResourceTypesCreate, ResourceTypesEdit } from "./resourceTypes";
import { Admin, Resource } from "react-admin";
import {
  FirebaseRealTimeSaga,
  FirebaseDataProvider,
  FirebaseAuthProvider,
  RAFirebaseOptions
} from "react-admin-firebase";

const config = require("./FIREBASE_CONFIG.js").firebaseConfig

// DL: check the options docs here: https://github.com/benwinding/react-admin-firebase/blob/ca95119b17b5ddad5ff0387a31873ba6f2df4f7c/README.md#options
const options: RAFirebaseOptions = {
  logging: true,
  rootRef: '',
  watch: ["posts", "resourceTypes"]
}
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);
const firebaseRealtime = FirebaseRealTimeSaga(dataProvider, options);

class App extends React.Component {
  render() {
    return (
      <Admin
        customSagas={[firebaseRealtime]}
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Resource
          name="posts"
          list={PostList}
          show={PostShow}
          create={PostCreate}
          edit={PostEdit}
        />
        <Resource
          name="resources"
          list={ResourceTypesList}
          show={ResourceTypesShow}
          create={ResourceTypesCreate}
          edit={ResourceTypesEdit}
        />
      </Admin>
    );
  }
}

export default App;
