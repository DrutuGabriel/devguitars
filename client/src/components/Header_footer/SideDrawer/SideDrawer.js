import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const SideDrawer = (props) => {
  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={() => props.onClose(false)}
    >
      <List component="nav" style={{ width: '150px' }}>
        {props.showLinksPage().map((item, i) => (
          <ListItem 
            button key={i} 
            style={{ justifyContent: 'center' }}
            onClick={() => props.onClose(false)}
          >
            {item}
          </ListItem>
        ))}
        <Divider />
        {props.showLinksUser().map((item, i) => (
          <ListItem 
            button 
            key={i} 
            style={{ justifyContent: 'center' }}
            onClick={() => props.onClose(false)}
          >
            {item}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
