import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

/**
 * SlideDownPanel
 *
 * Wraps any child component and slides it down from the top of the screen.
 *
 * Props:
 *  - isOpen        {boolean}   Controls whether the panel is visible
 *  - onClose       {function}  Called when the backdrop is pressed
 *  - headerOffset  {number}    Y position to start the panel from (e.g. header height). Default: 60
 *  - maxHeight     {number}    Max height the panel can grow to. Default: 400
 *  - duration      {number}    Animation duration in ms. Default: 380
 *  - children      {ReactNode} The content to render inside the panel
 */
export default function SlideDownPanel({
  isOpen,
  onClose,
  headerOffset = 60,
  maxHeight = 400,
  duration = 380,
  children,
}) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 1 : 0,
        duration,
        // Matches cubic-bezier(0.16, 1, 0.3, 1) — fast open, soft landing
        useNativeDriver: false, // height animation can't use native driver
      }),
      Animated.timing(backdropAnim, {
        toValue: isOpen ? 1 : 0,
        duration: duration * 0.25,
        useNativeDriver: true,
      }),
    ]).start();
  }, [backdropAnim, duration, isOpen, slideAnim]);

  const animatedHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, maxHeight],
  });

  return (
    <>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          pointerEvents={isOpen ? "auto" : "none"}
          style={[
            styles.backdrop,
            { top: headerOffset, opacity: backdropAnim },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* Sliding panel */}
      <Animated.View
        style={[
          styles.panel,
          {
            top: headerOffset,
            height: animatedHeight,
            // Clip overflowing content while animating
            overflow: "hidden",
          },
        ]}
      >
        {/* Inner view so children lay out at full size inside the clipping container */}
        <View style={{ maxHeight }}>{children}</View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 90,
  },
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "transparent",
    zIndex: 100,
  },
});
