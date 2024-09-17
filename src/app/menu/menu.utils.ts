export function menuSectionClassNames(
  getString: (...code: string[]) => string
): string[] {
  return [
    getString('dashboard', 'lowerCaseTitle'),
    getString('personalFinance', 'lowerCaseTitle'),
    getString('investmentPortfolio', 'lowerCaseTitle'),
    getString('stockExchange', 'lowerCaseTitle'),
    getString('obligations', 'lowerCaseTitle'),
    getString('reportings', 'lowerCaseTitle'),
    getString('settings', 'lowerCaseTitle'),
  ];
}

export function menuSubsectionClassNames(
  getString: (...code: string[]) => string
): string[] {
  return [
    getString('personalFinance', 'subsectionNames', 'budgeting'),
    getString('personalFinance', 'subsectionNames', 'expenses'),
    getString('personalFinance', 'subsectionNames', 'incomings'),
    getString('personalFinance', 'subsectionNames', 'savings'),
  ];
}
