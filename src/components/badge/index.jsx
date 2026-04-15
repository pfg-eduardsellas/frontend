import React from 'react';
import { BadgeWrapper, ColorDot, BadgeLabel } from './styles';
import { BADGE_COLORS, BADGE_TYPES } from './constant';

const Badge = ({ type = BADGE_TYPES.PAGE, text }) => {
  const { primary, background } = BADGE_COLORS[type] ?? {};

  return (
    <BadgeWrapper $background={background}>
      <ColorDot $color={primary} />
      <BadgeLabel>{text}</BadgeLabel>
    </BadgeWrapper>
  );
};

export default Badge;