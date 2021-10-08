export const queryStringify = (data: Record<string, unknown> | null): string => {
  if (!data) {
    return '';
  }

  const keys = Object.keys(data);
  if (!keys.length) {
    return '';
  }
  const result: string[] = [];
  keys.forEach(key => {
    const value = data[key];

    if (Array.isArray(value)) {
      result.push(`${key}=${value.join(',')}`);
    } else {
      result.push(`${key}=${value}`);
    }
  });

  return '?' + result.join('&');
};
