import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Background = styled(LinearGradient).attrs({
  colors: ['#5c258d', '#4389a2'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 }
})`
  flex: 1;
`;
