import { useState } from 'react';

function Probabilidad() {
  const [favorables, setFavorables] = useState('');
  const [totales, setTotales] = useState('');
  const [n, setN] = useState('');
  const [r, setR] = useState('');

  const calcularFactorial = (num) => {
    if (num < 0) return undefined;
    if (num === 0 || num === 1) return 1n;
    let resultado = 1n;
    for (let i = 2n; i <= BigInt(num); i++) {
      resultado *= i;
    }
    return resultado;
  };

  const limpiarProbabilidad = () => {
    setFavorables('');
    setTotales('');
  };

  const limpiarCombinatoria = () => {
    setN('');
    setR('');
  };

  const probDecimal = totales > 0 ? (favorables / totales) : 0;
  const probPorcentaje = (probDecimal * 100).toFixed(2);

  const nVal = parseInt(n);
  const rVal = parseInt(r);
  let permutaciones = "0";
  let combinaciones = "0";

  if (!isNaN(nVal) && !isNaN(rVal) && nVal >= rVal && rVal >= 0) {
    const nFact = calcularFactorial(nVal);
    const rFact = calcularFactorial(rVal);
    const nMinusRFact = calcularFactorial(nVal - rVal);
    permutaciones = (nFact / nMinusRFact).toString();
    combinaciones = (nFact / (rFact * nMinusRFact)).toString();
  }

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-2">6. Probabilidad y Combinatoria</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-teal-900/20 border border-teal-800/50 p-5 rounded-xl">
          <h3 className="font-bold text-teal-400 mb-1">Probabilidad Simple</h3>
          <p className="text-xs text-teal-600 mb-4">P(A) = Casos Favorables / Casos Totales</p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Casos Favorables:</label>
              <input type="number" value={favorables} onChange={(e) => setFavorables(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-600 text-white rounded p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder-slate-600" placeholder="Ej: 1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Casos Totales posibles:</label>
              <input type="number" value={totales} onChange={(e) => setTotales(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-600 text-white rounded p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none placeholder-slate-600" placeholder="Ej: 6" />
            </div>
          </div>
          
          {totales > 0 && favorables >= 0 && favorables <= totales && (
            <div className="mt-4 p-3 bg-slate-900 border border-teal-800/50 rounded shadow-inner text-teal-300">
              <p><strong className="text-slate-200">Probabilidad:</strong> {probDecimal.toFixed(4)}</p>
              <p><strong className="text-slate-200">Porcentaje:</strong> {probPorcentaje}%</p>
            </div>
          )}
          {favorables > totales && (
            <p className="text-rose-400 text-xs mt-2 font-medium">Los casos favorables no pueden ser mayores a los totales.</p>
          )}

          <div className="mt-4">
            <button onClick={limpiarProbabilidad} className="bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer">
              Limpiar Probabilidad
            </button>
          </div>
        </div>

        <div className="bg-orange-900/20 border border-orange-800/50 p-5 rounded-xl">
          <h3 className="font-bold text-orange-400 mb-1">Permutaciones y Combinaciones</h3>
          <p className="text-xs text-orange-600 mb-4">Ingresa la población (n) y la muestra (r)</p>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Población total (n):</label>
              <input type="number" value={n} onChange={(e) => setN(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-600 text-white rounded p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Muestra seleccionada (r):</label>
              <input type="number" value={r} onChange={(e) => setR(e.target.value)} 
                className="w-full bg-slate-900 border border-slate-600 text-white rounded p-2 focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            </div>
          </div>
          
          {!isNaN(nVal) && !isNaN(rVal) && nVal >= rVal && (
            <div className="mt-4 p-3 bg-slate-900 border border-orange-800/50 rounded shadow-inner text-orange-300 break-words">
              <p><strong className="text-slate-200">Permutaciones (nPr):</strong> {permutaciones}</p>
              <p><strong className="text-slate-200">Combinaciones (nCr):</strong> {combinaciones}</p>
            </div>
          )}
          {nVal < rVal && (
            <p className="text-rose-400 text-xs mt-2 font-medium">El valor de 'n' debe ser mayor o igual a 'r'.</p>
          )}

          <div className="mt-4">
            <button onClick={limpiarCombinatoria} className="bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer">
              Limpiar Combinatoria
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Probabilidad;