/**
 * Formata um valor numérico para o formato de moeda brasileira (Real)
 * @param value - Valor numérico a ser formatado
 * @returns String formatada no padrão brasileiro (R$ 1.234,56)
 */
export const formatCurrency = (value: number | string): string => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

/**
 * Formata um valor numérico apenas como número no formato brasileiro (sem símbolo de moeda)
 * @param value - Valor numérico a ser formatado
 * @returns String formatada no padrão brasileiro (1.234,56)
 */
export const formatNumber = (value: number | string): string => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return "0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};
