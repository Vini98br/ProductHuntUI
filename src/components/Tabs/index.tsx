import React from 'react';
import { TabEnum } from '../../@types/tab';

import { Tabs as TabsWrapper, Tab } from './styles';

export interface TabsProps {
  tabs: {
    label: string;
    value: TabEnum;
  }[];
  active: TabEnum;
  handleTabClick?: (state: TabEnum) => void;
}

const Tabs: React.FC<TabsProps> = ({ handleTabClick = () => ({}), active, tabs }) => {
  return (
    <TabsWrapper>
      {tabs.map(tab => (
        <Tab
          key={tab.value}
          active={active === tab.value}
          onClick={() => handleTabClick(tab.value)}
          id={`${tab.value}-tab`}
        >
          {tab.label}
        </Tab>
      ))}
    </TabsWrapper>
  );
}

export default Tabs;