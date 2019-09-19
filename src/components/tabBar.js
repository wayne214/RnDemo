import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, View, ViewPropTypes} from 'react-native';
import { TabBar } from 'react-native-tab-view';

// import Badge from 'components/uikit/topBadge';
let {width, height} = Dimensions.get('window')

const tabBar = props => {
  const { routes, counts } = props.navigationState;
  const margin = width / routes.length / 3;
  if (!routes.length) return null;

  return (
    <TabBar
      {...props}
      // useNativeDriver
      style={[styles.container, props.style]}
      tabStyle={[styles.tabStyle, props.tabStyle]}
      labelStyle={[styles.labelStyle, props.labelStyle]}
      indicatorStyle={[
        styles.indicatorStyle,
        { width: margin, marginLeft: margin },
        props.indicatorStyle
      ]}
      // renderBadge={({ route }) => (
      //   <View
      //     style={[
      //       styles.badge.normal,
      //       props.badgeDisplayDot && styles.badge.dot
      //     ]}
      //   >
      //       {
      //         route.key === 'match' ? null : <Badge
      //             displayDot={props.badgeDisplayDot && props.shouldDisplayDot(route)}
      //           value={(counts && counts[route.key]) || 0}
      //           style={{ ...props.badgeStyle, ...props.badgeStyleByRoute(route) }}
      //           />
      //       }
      //
      //   </View>
      // )}
    />
  );
};

tabBar.defaultProps = {
  badgeDisplayDot: true,
  shouldDisplayDot: _ => {
    return true;
  },
  badgeStyleByRoute: _ => {
    return {};
  }
};

tabBar.propTypes = {
  style: ViewPropTypes.style,
  tabStyle: ViewPropTypes.style,
  labelStyle: PropTypes.object,
  indicatorStyle: ViewPropTypes.style,
  badgeDisplayDot: PropTypes.bool
};

const styles = {
  container: {
    backgroundColor: 'transparent',
    elevation: 0
  },
  tabStyle: {
    padding: 0,
    height: 48
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    // color: 'white',
    margin: 0
  },
  indicatorStyle: {
    backgroundColor: 'white',
    height: 2
    // marginBottom: 5
  },
  badge: {
    normal: {
      // marginTop: 5,
      marginRight: 10
    },
    dot: {
      marginTop: 10,
      marginRight: 15
    }
  }
};

export default tabBar;
