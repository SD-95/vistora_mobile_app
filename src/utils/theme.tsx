export const getTheme = (tab: 'Vistora' | 'Vistora Super Saver') => {
  if (tab === 'Vistora') {
    return {
      headerGradient: ['#e3c7cdff', '#d83654ff'] as const,
      bodyGradient: ['#FFFDF6', '#FFF9ED'] as const,
      primary: '#A6004F',
      accent: '#FF0066',
      banner: ['#861657', '#FFA69E'] as const,
      categoryIcon: ['#F43B86', '#A6004F'] as const,
      text_color: '#eee'
    };
  } else {
    return {
      headerGradient: ['#cde7dbff', '#41c5a2ff'] as const,
      bodyGradient: ['#F1FFF7', '#E7FAF0'] as const,
      primary: '#008060',
      accent: '#00B386',
      banner: ['#1f7558ff', '#5BE7A9'] as const,
      categoryIcon: ['#38C172', '#168738'] as const,
      text_color: '#000'
    };
  }
};