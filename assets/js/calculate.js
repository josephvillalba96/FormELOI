// document.addEventListener("change", function () {
//     const landCost = parseFloat(document.getElementById('acquisition_cost').value) || 0;
//     const constructionBudget = parseFloat(document.getElementById('financed_contruction_budget').value) || 0;
//     const feePercent = parseFloat(document.getElementById('loan_closing_costs').value) || 0;
//     const brokerFeePercent = parseFloat(document.getElementById('other_fee').value) || 0;
//     const requestedLeverage = parseFloat(document.getElementById('request_leverage').value) || 0;
//     const interestRate = parseFloat(document.getElementById('annual_interest_rate').value) || 0;
//     const initialFunding = parseFloat(document.getElementById('initial_funding').value) || 0;
//     const ltaivPercent = parseFloat(document.getElementById('loan_to_asIs_value_percent').value) || 0;
//     const ltcAmount = parseFloat(document.getElementById('loan_to_cost_amount').value) || 0;
//     const larvAmount = parseFloat(document.getElementById('loan_to_arv_amount').value) || 0;
//     const afterCompletionValue = parseFloat(document.getElementById('estimated_after_completion_value').value) || 0;
//     const budgetReview = parseFloat(document.getElementById('budget_review_validation').value) || 0;
//     const processingFee = parseFloat(document.getElementById('processing_fee').value) || 0;
//     const servicingFee = parseFloat(document.getElementById('servicing_fee').value) || 0;
//     const legalFee = parseFloat(document.getElementById('legal_fee').value) || 0;
//     const underwritingFee = parseFloat(document.getElementById('underwriting_fee').value) || 0;
  
//     // 1. Calcular Total Cost
//     const totalCost = landCost + constructionBudget;
//     document.getElementById("total_cost").value = totalCost.toFixed(2);
  
//     // 2. Calcular Total Loan Amount
//     const totalLoanAmount = totalCost * (requestedLeverage / 100);
//     document.getElementById("total_loan_amount").value = totalLoanAmount.toFixed(2);
  
//     // 3. Loan Closing Costs
//     const originalFee = totalLoanAmount * feePercent;
//     document.getElementById("origination_fee").value = originalFee.toFixed(2);
  
//     // 4. Broker Fee
//     const brokerFee = totalLoanAmount * brokerFeePercent;
//     document.getElementById("broker_fee").value = brokerFee.toFixed(2);
  
//     // 5. Monthly Interest
//     const monthlyInterest = totalLoanAmount * (interestRate / 100 / 12);
//     document.getElementById("monthly_interest_payment").value = monthlyInterest.toFixed(2);
  
//     // 6. Holdback y día 1
//     const constructionHoldback = totalLoanAmount - initialFunding;
//     document.getElementById("contruction_holdback").value = constructionHoldback.toFixed(2);
  
//     const day1Interest = initialFunding * (interestRate / 100 / 12);
//     document.getElementById("monthly_interest_1_payment").value = day1Interest.toFixed(2);
  
//     // 7. Loan Metrics
//     const ltaivAmount = landCost * (ltaivPercent / 100);
//     document.getElementById("loan_to_asIs_value_amount").value = ltaivAmount.toFixed(2);
  
//     const ltcPercent = totalCost ? (ltcAmount / totalCost) * 100 : 0;
//     document.getElementById("loan_to_cost_percent").value = ltcPercent.toFixed(2);
  
//     const larvPercent = afterCompletionValue ? (larvAmount / afterCompletionValue) * 100 : 0;
//     document.getElementById("loan_to_arv_percent").value = larvPercent.toFixed(2);
  
//     // 8. Liquidity Requirements
//     const cashToClose = (totalCost - totalLoanAmount) + originalFee + underwritingFee + processingFee + servicingFee + legalFee + budgetReview + brokerFee;
//     document.getElementById("cash_to_close").value = cashToClose.toFixed(2);
  
//     const constructionBudgetPercent = constructionBudget * 0.10;
//     document.getElementById("ten_percent_of_construction_budget").value = constructionBudgetPercent.toFixed(2);
  
//     const paymentReserves = monthlyInterest * 6;
//     document.getElementById("six_months_payment_reserves").value = paymentReserves.toFixed(2);
  
//     const budgetDelta = constructionBudget - totalLoanAmount;
//     document.getElementById("constructio_budget_delta").value = budgetDelta.toFixed(2);
  
//     const totalLiquidity = cashToClose + constructionBudgetPercent + paymentReserves + budgetDelta;
//     document.getElementById("total_liquidity").value = totalLiquidity.toFixed(2);
//   });



  // 1. Total Cost y Loan Amount
document.getElementById('acquisition_cost').addEventListener('input', calcularCostosTotales);
document.getElementById('financed_contruction_budget').addEventListener('input', calcularCostosTotales);
document.getElementById('request_leverage').addEventListener('input', calcularCostosTotales);

function calcularCostosTotales() {
  const landCost = parseFloat(document.getElementById('acquisition_cost').value) || 0;
  const constructionBudget = parseFloat(document.getElementById('financed_contruction_budget').value) || 0;
  const maxltc = parseFloat(document.getElementById('max_ltc').value) || 0;

  const totalCost = landCost + constructionBudget;
  document.getElementById("total_cost").value = totalCost.toFixed(2);

  const totalLoanAmount = totalCost * (maxltc / 100);
  document.getElementById("total_loan_amount").value = totalLoanAmount.toFixed(2);

  calcularLoanMetrics();
  calcularInteresesYHoldback();
  calcularLiquidity();
  calcularFees();
}

  // 2. Fees (se recalculan también cuando cambia totalLoanAmount, indirectamente)
document.getElementById('loan_closing_costs').addEventListener('input', calcularFees);
document.getElementById('other_fee').addEventListener('input', calcularFees);

function calcularFees() {
  const totalLoanAmount = parseFloat(document.getElementById('total_loan_amount').value) || 0;
  const feePercent = parseFloat(document.getElementById('loan_closing_costs').value) || 0;
  const brokerFeePercent = parseFloat(document.getElementById('other_fee').value) || 0;

  const originalFee = totalLoanAmount * feePercent;
  document.getElementById("origination_fee").value = originalFee.toFixed(2);

  const brokerFee = totalLoanAmount * brokerFeePercent;
  document.getElementById("broker_fee").value = brokerFee.toFixed(2);
  calcularLiquidity();
}

  // 3. Intereses y Holdback
document.getElementById('annual_interest_rate').addEventListener('input', calcularInteresesYHoldback);
document.getElementById('initial_funding').addEventListener('input', calcularInteresesYHoldback);

function calcularInteresesYHoldback() {
  const totalLoanAmount = parseFloat(document.getElementById('total_loan_amount').value) || 0;
  const interestRate = parseFloat(document.getElementById('annual_interest_rate').value) || 0;
  const initialFunding = parseFloat(document.getElementById('initial_funding').value) || 0;

  const monthlyInterest = totalLoanAmount * (interestRate / 100 / 12);
  document.getElementById("monthly_interest_payment").value = monthlyInterest.toFixed(2);

  const constructionHoldback = totalLoanAmount - initialFunding;
  document.getElementById("contruction_holdback").value = constructionHoldback.toFixed(2);

  const day1Interest = initialFunding * (interestRate / 100 / 12);
  document.getElementById("monthly_interest_1_payment").value = day1Interest.toFixed(2);

  calcularLiquidity();
}

  // 4. Loan Metrics
document.getElementById('loan_to_asIs_value_percent').addEventListener('input', calcularLoanMetrics);
document.getElementById('loan_to_cost_amount').addEventListener('input', calcularLoanMetrics);
document.getElementById('loan_to_arv_amount').addEventListener('input', calcularLoanMetrics);
document.getElementById('estimated_after_completion_value').addEventListener('input', calcularLoanMetrics);

function calcularLoanMetrics() {
  const landCost = parseFloat(document.getElementById('acquisition_cost').value) || 0;
  const totalCost = parseFloat(document.getElementById('total_cost').value) || 0;
  const afterCompletionValue = parseFloat(document.getElementById('estimated_after_completion_value').value) || 0;

  const ltaivPercent = parseFloat(document.getElementById('loan_to_asIs_value_percent').value) || 0;
  const ltcAmount = parseFloat(document.getElementById('loan_to_cost_amount').value) || 0;
  const larvAmount = parseFloat(document.getElementById('loan_to_arv_amount').value) || 0;

  const ltaivAmount = landCost * (ltaivPercent / 100);
  document.getElementById("loan_to_asIs_value_amount").value = ltaivAmount.toFixed(2);

  const ltcPercent = totalCost ? (ltcAmount / totalCost) * 100 : 0;
  document.getElementById("loan_to_cost_percent").value = ltcPercent.toFixed(2);

  const larvPercent = afterCompletionValue ? (larvAmount / afterCompletionValue) * 100 : 0;
  document.getElementById("loan_to_arv_percent").value = larvPercent.toFixed(2);
}

  // 5. Liquidity Requirements
[
  'budget_review_validation',
  'processing_fee',
  'servicing_fee',
  'legal_fee',
  'underwriting_fee',
  'financed_contruction_budget'
].forEach(id => {
  document.getElementById(id).addEventListener('input', calcularLiquidity);
});

function calcularLiquidity() {
  const totalCost = parseFloat(document.getElementById('total_cost').value) || 0;
  const totalLoanAmount = parseFloat(document.getElementById('total_loan_amount').value) || 0;
  const originalFee = parseFloat(document.getElementById('origination_fee').value) || 0;
  const underwritingFee = parseFloat(document.getElementById('underwriting_fee').value) || 0;
  const processingFee = parseFloat(document.getElementById('processing_fee').value) || 0;
  const servicingFee = parseFloat(document.getElementById('servicing_fee').value) || 0;
  const legalFee = parseFloat(document.getElementById('legal_fee').value) || 0;
  const budgetReview = parseFloat(document.getElementById('budget_review_validation').value) || 0;
  const brokerFee = parseFloat(document.getElementById('broker_fee').value) || 0;
  const constructionBudget = parseFloat(document.getElementById('financed_contruction_budget').value) || 0;
  const monthlyInterest = parseFloat(document.getElementById('monthly_interest_payment').value) || 0;

  const cashToClose = (totalCost - totalLoanAmount) + originalFee + underwritingFee + processingFee + servicingFee + legalFee + budgetReview + brokerFee;
  document.getElementById("cash_to_close").value = cashToClose.toFixed(2);

  const constructionBudgetPercent = constructionBudget * 0.10;
  document.getElementById("ten_percent_of_construction_budget").value = constructionBudgetPercent.toFixed(2);

  const paymentReserves = monthlyInterest * 6;
  document.getElementById("six_months_payment_reserves").value = paymentReserves.toFixed(2);

  const budgetDelta = constructionBudget - totalLoanAmount;
  document.getElementById("constructio_budget_delta").value = budgetDelta.toFixed(2);

  const totalLiquidity = cashToClose + constructionBudgetPercent + paymentReserves + budgetDelta;
  document.getElementById("total_liquidity").value = totalLiquidity.toFixed(2);
}

