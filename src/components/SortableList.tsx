import React, { Component, ReactNode } from 'react';
import {
  SortableContainer
} from 'react-sortable-hoc';
import { List } from '@material-ui/core';

const SortableContainerWrapper = SortableContainer(({ children }: { children: ReactNode }) => {
  return <List>{children}</List>;
})

type SrotableListProps = {
  onSortEnd: Function,
  children: ReactNode
}

class SortableList extends Component<SrotableListProps, {}> {
  private onSortEnd = (info: any) => {
    console.info('sort end', info)
    this.props.onSortEnd(info)
  }

  render() {
    return (
      <SortableContainerWrapper onSortEnd={this.onSortEnd} useDragHandle>
        {this.props.children}
      </SortableContainerWrapper>
    );
  }
}

export default SortableList;