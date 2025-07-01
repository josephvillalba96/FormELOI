document.addEventListener('DOMContentLoaded', function() {
  const select = document.getElementById('advisorFilter');
  const tbody = document.querySelector('table tbody');

  function cargarDatos(advisorId) {
    if (!advisorId) {
      tbody.innerHTML = '';
      return;
    }
    let url = 'http://api.reinvestarapp.com/api/solicitudes?id=' + advisorId;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        tbody.innerHTML = '';
        data.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${row.issuedDate || ''}</td>
            <td>${row.borrowerName || ''}</td>
            <td>${row.legalStatus || ''}</td>
            <td>${row.propertyAddress || ''}</td>
            <td>${row.ficoScore || ''}</td>
            <td>${row.loanType || ''}</td>
            <td>${row.propertyType || ''}</td>
            <td>${row.closingDate || ''}</td>
            <td>${row.interestStructure || ''}</td>
            <td>${row.loanTerm || ''}</td>
            <td>${row.prepaymentPenalty || ''}</td>
            <td>${row.maxLTV || ''}</td>
            <td>${row.maxLTC || ''}</td>
            <td>${row.asIsValue || ''}</td>
            <td>${row.acquisitionPrice || ''}</td>
            <td>${row.landCost || ''}</td>
            <td>${row.constructionBudget || ''}</td>
            <td>${row.totalCost || ''}</td>
            <td>${row.afterCompletionValue || ''}</td>
            <td>${row.feePercent || ''}</td>
            <td>${row.originationFee || ''}</td>
            <td>${row.underwritingFee || ''}</td>
            <td>${row.processingFee || ''}</td>
            <td>${row.servicingFee || ''}</td>
            <td>${row.legalFee || ''}</td>
            <td>${row.appraisalFee || ''}</td>
            <td>${row.budgetReview || ''}</td>
            <td>${row.brokerFeePercent || ''}</td>
            <td>${row.brokerFee || ''}</td>
            <td>${row.transactionFee || ''}</td>
            <td>${row.totalLoanAmount || ''}</td>
            <td>${row.interestRate || ''}</td>
            <td>${row.requestedLeverage || ''}</td>
            <td>${row.monthlyInterest || ''}</td>
            <td>${row.constructionHoldback || ''}</td>
            <td>${row.initialFunding || ''}</td>
            <td>${row.day1Interest || ''}</td>
            <td>${row.ltaivPercent || ''}</td>
            <td>${row.ltaivAmount || ''}</td>
            <td>${row.ltcPercent || ''}</td>
            <td>${row.ltcAmount || ''}</td>
            <td>${row.larvPercent || ''}</td>
            <td>${row.larvAmount || ''}</td>
            <td>${row.rehabCategory || ''}</td>
            <td>${row.loanToAsValueLTV || ''}</td>
            <td>${row.minCreditScore || ''}</td>
            <td>${row.commitmentDeposit || ''}</td>
            <td>${row.cashToClose || ''}</td>
            <td>${row.constructionBudgetPercent || ''}</td>
            <td>${row.paymentReserves || ''}</td>
            <td>${row.budgetDelta || ''}</td>
            <td>${row.totalLiquidity || ''}</td>
            <td>${row.borrowerSignature || ''}</td>
            <td>${row.borrowerNameSignature || ''}</td>
            <td>${row.entityName || ''}</td>
            <td>${row.date || ''}</td>
            <td>${row.guarantorSignature || ''}</td>
            <td>${row.guarantorName || ''}</td>
            <td>${row.guarantorDate || ''}</td>
            <td>${row.advisorName || ''}</td>
            <td>${row.advisorEmail || ''}</td>
            <td>${row.advisorPhone || ''}</td>
            <td><button onclick="descargarPorId('${row._id}')" style="background-color: #ffc55a; border: 1px solid #000; padding: 4px 8px; font-size: 10px; cursor: pointer;">Descargar</button></td>
          `;
          tbody.appendChild(tr);
        });
      });
  }

  select.addEventListener('change', function() {
    cargarDatos(this.value);
  });

  // No cargar nada al inicio
});

function descargarPorId(solicitudId) {
  fetch(`http://api.reinvestarapp.com/api/solicitudes/descargar/${solicitudId}`)
    .then(response => {
      if (!response.ok) throw new Error('Error al descargar el archivo');
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `solicitud_${solicitudId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      alert('No se pudo descargar el documento.');
      console.error(error);
    });
}

function exportarExcel() {
  const url = `http://api.reinvestarapp.com/api/solicitudes/descargar-excel`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Error al generar el archivo Excel');
      return response.blob();
    })
    .then(blob => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `solicitudes_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    })
    .catch(error => {
      alert('Error al exportar los datos: ' + error.message);
      console.error(error);
    });
}

