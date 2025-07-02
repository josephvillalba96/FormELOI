function captureFormData() {
  const formData = {
    // Borrower Information
    borrowerName: document.getElementById('borrower_information').value,
    legalStatus: document.getElementById("legal_status").value,
    issuedDate: document.getElementById('issued_date').value,
    propertyAddress: document.getElementById('subject_property_address').value,
    ficoScore: parseInt(document.getElementById('fico').value),

    // Loan Details
    loanType: document.getElementById("loan_type").value,
    propertyType: document.getElementById("property_type").value,
    closingDate: document.getElementById('estimated_closing_date').value,
    interestStructure: document.getElementById("interest_rate_structure").value,
    loanTerm: parseInt(document.getElementById('loan_term').value),
    prepaymentPenalty: document.getElementById("prepayment_penalty").value,
    maxLTV: parseFloat(document.getElementById('max_ltv').value),
    maxLTC: parseFloat(document.getElementById('max_ltc').value),

    // Purchase, Refinance, Cash-Out
    asIsValue: parseFloat(document.getElementById('asIsValue').value) || null,
    acquisitionPrice: parseFloat(document.getElementById('original_acquisition_price').value) || null,

    // Fix & Flip, Ground Up Construction
    landCost: parseFloat(document.getElementById('acquisition_cost').value),
    constructionBudget: parseFloat(document.getElementById('financed_contruction_budget').value),
    totalCost: parseFloat(document.getElementById('total_cost').value),
    afterCompletionValue: parseFloat(document.getElementById('estimated_after_completion_value').value),

    // Loan Closing Costs
    feePercent: parseFloat(document.getElementById('loan_closing_costs').value),
    originationFee: parseFloat(document.getElementById('origination_fee').value),
    underwritingFee: parseFloat(document.getElementById('underwriting_fee').value),
    processingFee: parseFloat(document.getElementById('processing_fee').value),
    servicingFee: parseFloat(document.getElementById('servicing_fee').value),
    legalFee: parseFloat(document.getElementById('legal_fee').value),
    appraisalFee: document.getElementById("appraisal_fee").value,
    budgetReview: parseFloat(document.getElementById('budget_review_validation').value),

    // Other Expenses
    brokerFeePercent: parseFloat(document.getElementById('other_fee').value),
    brokerFee: parseFloat(document.getElementById('broker_fee').value),
    transactionFee: parseFloat(document.getElementById('transaction_fee').value),

    // Loan Summary
    totalLoanAmount: parseFloat(document.getElementById('total_loan_amount').value),
    interestRate: parseFloat(document.getElementById('annual_interest_rate').value),
    requestedLeverage: parseFloat(document.getElementById('request_leverage').value),
    monthlyInterest: parseFloat(document.getElementById('monthly_interest_payment').value),
    constructionHoldback: parseFloat(document.getElementById('contruction_holdback').value),
    initialFunding: parseFloat(document.getElementById('initial_funding').value),
    day1Interest: parseFloat(document.getElementById('monthly_interest_1_payment').value),

    // Loan Metrics
    ltaivPercent: parseFloat(document.getElementById('loan_to_asIs_value_percent').value),
    ltaivAmount: parseFloat(document.getElementById('loan_to_asIs_value_amount').value),
    ltcPercent: parseFloat(document.getElementById('loan_to_cost_percent').value),
    ltcAmount: parseFloat(document.getElementById('loan_to_cost_amount').value),
    larvPercent: parseFloat(document.getElementById('loan_to_arv_percent').value),
    larvAmount: parseFloat(document.getElementById('loan_to_arv_amount').value),
    rehabCategory: document.getElementById('rehab_category').value,
    loanToAsValueLTV: document.getElementById('loan_to_asIs_value').value,

    // Conditions
    minCreditScore: parseInt(document.getElementById('minimum_credit_score').value),
    commitmentDeposit: parseFloat(document.getElementById('commitment_deposit').value),

    // Liquidity Requirements
    cashToClose: parseInt(document.getElementById('cash_to_close').value),
    constructionBudgetPercent: parseFloat(document.getElementById('ten_percent_of_construction_budget').value),
    paymentReserves: parseFloat(document.getElementById('six_months_payment_reserves').value),
    budgetDelta: parseFloat(document.getElementById('constructio_budget_delta').value),
    totalLiquidity: parseFloat(document.getElementById('total_liquidity').value),

    // Signatures
    borrowerSignature: "Signed", // Esto sería capturado de un campo de firma real
    borrowerNameSignature: "", // Esto sería capturado de un campo de texto
    entityName: "", // Esto sería capturado de un campo de texto
    date: new Date().toISOString().split("T")[0], // Fecha actual
    guarantorSignature: "Signed", // Esto sería capturado de un campo de firma real
    guarantorName: "", // Esto sería capturado de un campo de texto
    guarantorDate: new Date().toISOString().split("T")[0], // Fecha actual

    // Advisor
    advisorId: document.getElementById('advisorId').value,
    advisorFullName: document.getElementById('advisorFullName').value,
    advisorEmail: document.getElementById('advisor_email').value,
    advisorPhone: document.getElementById('advisor_phone').value
  };

  // Mostrar los datos en la consola
  console.log("Form Data:", formData);

  // Mostrar los datos en un alert (para propósitos de demostración)
  alert("Datos capturados. Revisa la consola para ver el objeto completo.");

  // Aquí podrías enviar los datos a un servidor
  fetch('https://api.reinvestarapp.com/api/solicitudes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      alert('Solicitud enviada correctamente.');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error al enviar la solicitud.');
    });

  return formData;
}

// Función para enviar datos al servidor (ejemplo)
function sendDataToServer(data) {
  fetch("https://tu-servidor.com/api/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
