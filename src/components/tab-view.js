import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import { TabView } from 'react-native-tab-view';
let {width, height} = Dimensions.get('window')

const TabViewBar = props => (
  <TabView
      {...props}
    initialLayout={initialLayout}
    style={styles.container}
    navigationState={props.navigationState}
    renderScene={props.renderScene}
    renderTabBar={props.renderHeader}
    onIndexChange={props.onIndexChange}
  />
);

const initialLayout = {
  height: 0,
  width: width
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default TabViewBar;
