export const generateMonths = (): Array<{ value: string, label: string }> => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });
}

export const generateYears = (span: number = 10): Array<{ value: string, label: string }> => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: span + 1 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { value: year, label: year };
  });
}