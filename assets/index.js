// Tabelas de taxas (mantendo as originais)
const taxasMenores = {
  1: 10.5, 2: 11.16, 3: 11.63, 4: 12.19, 5: 12.75, 6: 13.22, 
  7: 13.97, 8: 14.44, 9: 14.72, 10: 15.25, 11: 16.03, 12: 16.58,
  13: 19.4, 14: 19.87, 15: 20.34, 16: 20.81, 17: 21.28, 18: 21.75
};

const taxasMaiores = {
  1: 10.25, 2: 10.91, 3: 11.38, 4: 11.94, 5: 12.5, 6: 12.97,
  7: 13.73, 8: 14.2, 9: 14.48, 10: 14.53, 11: 15.87, 12: 16.25,
  13: 17.07, 14: 17.56, 15: 18.04, 16: 18.52, 17: 19, 18: 19.49
};

function App() {
  const [valorEmprestimo, setValorEmprestimo] = React.useState('');
  const [parcelasSelecionadas, setParcelasSelecionadas] = React.useState('');
  const [simulacoes, setSimulacoes] = React.useState([]);

  const calcularSimulacoes = () => {
    const valor = parseFloat(valorEmprestimo);
    if (!valor || valor <= 0) {
      setSimulacoes([]);
      return;
    }

    // Escolher tabela de taxas baseada no valor
    const tabelaTaxas = valor < 5000 ? taxasMenores : taxasMaiores;
    const resultados = [];

    for (let parcelas = 1; parcelas <= 18; parcelas++) {
      const taxa = tabelaTaxas[parcelas];
      const percentualTaxa = taxa / 100;

      // LÓGICA CORRIGIDA conforme solicitado:

      // Valor a Receber = Valor do empréstimo - taxa aplicada
      const valorReceber = valor - (valor * percentualTaxa);

      // Parcela a Receber = Valor do empréstimo / parcelas
      const parcelaReceber = valor / parcelas;

      // Valor a Cobrar = Valor do empréstimo + taxa aplicada
      const valorCobrar = valor + (valor * percentualTaxa);

      // Parcela a Cobrar = (Valor do empréstimo + taxa) / parcelas
      const parcelaCobrar = valorCobrar / parcelas;

      resultados.push({
        parcelas,
        taxa,
        valorReceber,
        parcelaReceber,
        valorCobrar,
        parcelaCobrar
      });
    }

    setSimulacoes(resultados);
  };

  React.useEffect(() => {
    calcularSimulacoes();
  }, [valorEmprestimo]);

  const imprimirSimulacao = () => {
    if (!valorEmprestimo || !parcelasSelecionadas) {
      alert('Por favor, preencha o valor e selecione o número de parcelas.');
      return;
    }

    const simulacao = simulacoes.find(s => s.parcelas === parseInt(parcelasSelecionadas));
    if (!simulacao) return;

    const conteudoImpressao = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
          <img src="/assets/nova_era_solucoes_logo.jpg" alt="Nova Era Soluções" style="max-width: 150px; margin-bottom: 10px;">
          <h2 style="color: #333; margin: 0;">Nova Era Soluções</h2>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-top: 0;">Simulação de Empréstimo</h3>
          <p><strong>Valor:</strong> R$ ${parseFloat(valorEmprestimo).toFixed(2)}</p>
          <p><strong>Parcelas:</strong> ${parcelasSelecionadas}x</p>
        </div>

        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
          <h4 style="color: #2d5a2d; margin-top: 0;">Se você quer receber R$ ${parseFloat(valorEmprestimo).toFixed(2)}</h4>
          <p><strong>Você passa:</strong> R$ ${simulacao.valorCobrar.toFixed(2)}</p>
          <p><strong>Parcela a Pagar:</strong> ${parcelasSelecionadas}x R$ ${simulacao.parcelaCobrar.toFixed(2)}</p>
        </div>

        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px;">
          <h4 style="color: #856404; margin-top: 0;">Se você passa R$ ${parseFloat(valorEmprestimo).toFixed(2)}</h4>
          <p><strong>Você recebe:</strong> R$ ${simulacao.valorReceber.toFixed(2)}</p>
          <p><strong>Parcela a Pagar:</strong> ${parcelasSelecionadas}x R$ ${simulacao.parcelaReceber.toFixed(2)}</p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
          <p>Nova Era Soluções - Soluções em Crédito</p>
        </div>
      </div>
    `;

    const janelaImpressao = window.open('', '_blank');
    janelaImpressao.document.write(`
      <html>
        <head>
          <title>Simulação de Empréstimo - Nova Era Soluções</title>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .print-container { width: 100%; margin: 0; padding: 10px; box-sizing: border-box; }
              h2, h3, h4 { font-size: 1em; margin: 5px 0; }
              p { font-size: 0.8em; margin: 3px 0; }
              img { max-width: 100px; }
              .print-container div { margin-bottom: 8px; padding: 8px; }
              .print-container div:last-child { margin-bottom: 0; }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${conteudoImpressao}
          </div>
        </body>
      </html>
    `);
    janelaImpressao.document.close();
    janelaImpressao.print();
  };

  return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100' },
    React.createElement('div', { className: 'container mx-auto px-4 py-8' },
      // Header
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('img', { 
          src: '/assets/nova_era_solucoes_logo.jpg', 
          alt: 'Nova Era Soluções',
          className: 'mx-auto mb-4 h-20 w-auto'
        }),
        React.createElement('h1', { className: 'text-4xl font-bold text-gray-800 mb-2' }, 'Nova Era Soluções'),
        React.createElement('p', { className: 'text-xl text-gray-600' }, 'Melhores Taxas')
      ),

      // Card principal
      React.createElement('div', { className: 'max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden' },
        React.createElement('div', { className: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6' },
          React.createElement('h2', { className: 'text-2xl font-bold text-center' }, 'Simulador de Empréstimo')
        ),

        React.createElement('div', { className: 'p-6' },
          // Formulário
          React.createElement('div', { className: 'grid md:grid-cols-2 gap-6 mb-8' },
            React.createElement('div', null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Valor do Empréstimo (R$)'),
              React.createElement('input', {
                type: 'number',
                value: valorEmprestimo,
                onChange: (e) => setValorEmprestimo(e.target.value),
                placeholder: 'Digite o valor',
                className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              })
            ),
            React.createElement('div', null,
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Número de Parcelas'),
              React.createElement('select', {
                value: parcelasSelecionadas,
                onChange: (e) => setParcelasSelecionadas(e.target.value),
                className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              },
                React.createElement('option', { value: '' }, 'Selecione'),
                Array.from({length: 18}, (_, i) => i + 1).map(num =>
                  React.createElement('option', { key: num, value: num }, `${num}x`)
                )
              )
            )
          ),

          // Botão imprimir
          valorEmprestimo && parcelasSelecionadas && React.createElement('div', { className: 'text-center mb-6' },
            React.createElement('button', {
              onClick: imprimirSimulacao,
              className: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200'
            }, 'Imprimir Simulação')
          ),

          // Tabela de resultados
          simulacoes.length > 0 && React.createElement('div', { className: 'overflow-x-auto' },
            React.createElement('table', { className: 'w-full border-collapse border border-gray-300' },
              React.createElement('thead', null,
                React.createElement('tr', { className: 'bg-gray-50' },
                  React.createElement('th', { className: 'border border-gray-300 px-4 py-2 text-left' }, 'Parcelas'),
                  React.createElement('th', { className: 'border border-gray-300 px-4 py-2 text-left' }, 'Taxa (%)'),
                  React.createElement('th', { className: 'border border-gray-300 px-4 py-2 text-left' }, 'Valor a Cobrar (R$)'),
                  React.createElement('th', { className: 'border border-gray-300 px-4 py-2 text-left' }, 'Parcela a Cobrar (R$)'),
                  React.createElement('th', { className: 'border border-gray-300 px-4 py-2 text-left' }, 'Valor a Receber (R$)'),
                  React.createElement('th', { className: 'border border-gray-300 px-4 py-2 text-left' }, 'Parcela a Receber (R$)')
                )
              ),
              React.createElement('tbody', null,
                simulacoes.map(sim =>
                  React.createElement('tr', { key: sim.parcelas, className: 'hover:bg-gray-50' },
                    React.createElement('td', { className: 'border border-gray-300 px-4 py-2' }, `${sim.parcelas}x`),
                    React.createElement('td', { className: 'border border-gray-300 px-4 py-2' }, sim.taxa.toFixed(2)),
                    React.createElement('td', { className: 'border border-gray-300 px-4 py-2' }, sim.valorCobrar.toFixed(2)),
                    React.createElement('td', { className: 'border border-gray-300 px-4 py-2' }, sim.parcelaCobrar.toFixed(2)),
                    React.createElement('td', { className: 'border border-gray-300 px-4 py-2' }, sim.valorReceber.toFixed(2)),
                    React.createElement('td', { className: 'border border-gray-300 px-4 py-2' }, sim.parcelaReceber.toFixed(2))
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

// Renderizar a aplicação
ReactDOM.render(React.createElement(App), document.getElementById('root'));