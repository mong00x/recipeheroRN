import React from "react";
import { View, StyleSheet, Animated } from "react-native";

import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Chart = ({
  Data,
  radius = 50,
  strokeWidth = 12,
  duration = 500,
  textColor,
}) => {
  // ??
  const circleRef = React.useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  const setColor = () =>
    Data >= 5 ? "#36C688" : Data >= 3 ? "#EABC51" : "#FF6D6D";

  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={setColor()}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={setColor()}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.8}
            strokeDasharray={circleCircumference}
            strokeDashoffset={(circleCircumference * (7 - Data)) / -7}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Chart;
