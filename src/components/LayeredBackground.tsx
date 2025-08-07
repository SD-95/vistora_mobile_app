import React, { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const LayeredBackground = () => {
  const backgrounds = [
    PremiumBlurredCircles,
    PremiumGradientWaves,
    PremiumGlowMesh,
    PremiumLightRings,
    PremiumSoftShapes
  ];

  // ✅ Only compute the random layer ONCE
  const RandomLayer = useMemo(() => {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  }, []); // <-- This empty dependency array ensures it runs only once

  return (
    <LinearGradient colors={['#F9476C', '#FF6C5F']} style={StyleSheet.absoluteFill}>
      <RandomLayer />
    </LinearGradient>
  );
};

// Layer 1: Blurred Circles
const PremiumBlurredCircles = () => (
  <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
    <Circle cx={width * 0.2} cy={height * 0.3} r="140" fill="#FFD6E8" opacity={0.09} />
    <Circle cx={width * 0.8} cy={height * 0.2} r="110" fill="#FEC7B4" opacity={0.08} />
    <Circle cx={width * 0.6} cy={height * 0.7} r="180" fill="#C1F5FC" opacity={0.08} />
  </Svg>
);
// Layer 2: Gradient Waves
const PremiumGradientWaves = () => (
  <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`} style={StyleSheet.absoluteFill}>
    <Path
      d={`M0,${height * 0.2} Q${width * 0.5},${height * 0.4} ${width},${height * 0.2} L${width},0 L0,0 Z`}
      fill="#FFFFFF"
      opacity={0.08}
    />
    <Path
      d={`M0,${height * 0.6} Q${width * 0.5},${height * 0.8} ${width},${height * 0.6} L${width},0 L0,0 Z`}
      fill="#FFFFFF"
      opacity={0.08}
    />
  </Svg>
);
// Layer 3: Mesh Gradient
const PremiumGlowMesh = () => (
  <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
    <Circle cx={width * 0.5} cy={height * 0.4} r="280" fill="#FFADBC" opacity={0.09} />
    <Circle cx={width * 0.3} cy={height * 0.8} r="200" fill="#C3FBD8" opacity={0.09} />
    <Circle cx={width * 0.8} cy={height * 0.6} r="240" fill="#FFF1B0" opacity={0.08} />
  </Svg>
);
// Layer 4: Soft Light Rings
const PremiumLightRings = () => (
  <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
    {[...Array(5)].map((_, i) => (
      <Circle
        key={i}
        cx={width / 2}
        cy={height / 2}
        r={100 + i * 60}
        stroke="#FFFFFF"
        strokeWidth="1"
        fill="none"
        opacity={0.08}
      />
    ))}
  </Svg>
);
// Layer 5: Minimal Soft Shapes
const PremiumSoftShapes = () => (
  <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
    <Path
      d={`M0,${height * 0.6} Q${width * 0.25},${height * 0.5} ${width * 0.5},${height * 0.6} T${width},${height * 0.6} L${width},${height} L0,${height} Z`}
      fill="#FFFFFF"
      opacity={0.08}
    />
    <Circle cx={width * 0.7} cy={height * 0.1} r="100" fill="#FFFFFF" opacity={0.08} />
  </Svg>
);
export default LayeredBackground;
