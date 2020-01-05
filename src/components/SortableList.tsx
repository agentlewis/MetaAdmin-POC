import React, { FunctionComponent, ReactNode } from 'react';
import {
  SortableContainer
} from 'react-sortable-hoc';
import { List } from '@material-ui/core';

// This wraps the react element with the react sortable HOC.
const SortableContainerWrapper = SortableContainer(({ children }: { children: ReactNode }) => {
  return <List>{children}</List>;
})

// Define the expected props
type SrotableListProps = {
  onSortEnd: Function,
  children: ReactNode
}

// Define the functional component 
const SortableList: FunctionComponent<SrotableListProps> = ({onSortEnd, children}) => {
  const onSortEndWrap = (info: any) => {
    console.info('sort end', info)
    onSortEnd(info)
  }
  return (
    <SortableContainerWrapper onSortEnd={onSortEndWrap} useDragHandle lockAxis="y" >
      {children}
    </SortableContainerWrapper>
  );
}

export default SortableList;