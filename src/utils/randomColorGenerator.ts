const randomColorGenerator = (): {
  color: string;
  colorLight: string;
  colorContrast: string;
} => {
  const colors = [
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
  ];

  const randomColor = colors[Math.floor(Math.random() * (colors.length - 1))];

  return {
    color: randomColor.concat('.').concat('main'),
    colorLight: randomColor.concat('.').concat('light'),
    colorContrast: randomColor.concat('.').concat('contrastText'),
  };
};

export default randomColorGenerator;
