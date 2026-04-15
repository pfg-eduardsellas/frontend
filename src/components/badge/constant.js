export const BADGE_TYPES = {
    PAGE: 'URL',
    BUTTON: 'BUTTON',
    LINK: 'LINK',
    FORM: 'FORM'
};

export const BADGE_COLORS = {
    [BADGE_TYPES.PAGE]: { primary: '#0070e0', background: '#dbeafe', hover: '#cbd5e1' },
    [BADGE_TYPES.BUTTON]: { primary: '#00a859', background: '#d8fad1', hover: '#c8e6c9' },
    [BADGE_TYPES.LINK]: { primary: '#ed7d46', background: '#ffedd5', hover: '#fecaca' },
    [BADGE_TYPES.FORM]: { primary: '#9764e5', background: '#e3defb', hover: '#d8d2f0' },
};