declare module 'lucide-react-native' {
  import * as React from 'react';
  import { SvgProps } from 'react-native-svg';

  export interface IconProps extends SvgProps {
    size?: number;
    color?: string;
  }

  // Allow importing any icon by name
  export const ChevronLeft: React.FC<IconProps>;
  export const Heart: React.FC<IconProps>;
  export const Share2: React.FC<IconProps>;

  // Fallback for any other icon name
  const Icon: React.FC<IconProps>;
  export default Icon;
}
