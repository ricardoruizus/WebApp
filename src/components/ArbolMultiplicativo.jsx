import { useState } from 'react';

function ArbolMultiplicativo() {
  const [probA, setProbA] = useState('0.5');
  const [probB, setProbB] = useState('0.5');

  const limpiarArbol = () => {
    setProbA('0.0');
    setProbB('0.0');
  };

  const pA = parseFloat(probA) || 0;
  const pNotA = 1 - pA;
  const pB = parseFloat(probB) || 0;
  const pNotB = 1 - pB;

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg mb-10">
      <h2 className="text-xl font-bold text-white mb-2 border-b border-slate-700 pb-2">7. Regla Multiplicativa y Árbol</h2>
      <p className="text-slate-400 text-sm mb-6">Calcula la probabilidad conjunta (formato decimal 0 a 1).</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">Probabilidad de Evento A:</label>
          <input type="number" step="0.1" min="0" max="1" 
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={probA} onChange={e => setProbA(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">Probabilidad de Evento B:</label>
          <input type="number" step="0.1" min="0" max="1" 
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={probB} onChange={e => setProbB(e.target.value)} />
        </div>
      </div>

      <div className="mb-6">
        <button onClick={limpiarArbol} className="bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer">
          Limpiar
        </button>
      </div>

      <div className="bg-slate-900 text-slate-300 p-6 rounded-xl overflow-x-auto font-mono text-sm shadow-inner border border-slate-700">
        <h3 className="text-center text-white mb-4 font-bold tracking-wide uppercase">Diagrama de Árbol</h3>
        
        <div className="flex justify-center">
          <ul className="leading-loose">
            <li>
              <strong className="text-blue-400">[ INICIO ]</strong>
              <ul className="pl-10 border-l border-slate-600 ml-4 mt-2">
                
                <li>
                  ├── <strong className="text-emerald-400">Evento A</strong> (P = {pA.toFixed(2)})
                  <ul className="pl-10 border-l border-slate-600 ml-4">
                    <li>
                      ├── Evento B (P = {pB.toFixed(2)}) ➔ <strong className="text-yellow-300 bg-slate-800 border border-slate-600 px-2 py-1 rounded">P(A y B) = {(pA * pB).toFixed(4)}</strong>
                    </li>
                    <li className="text-slate-400">
                      └── No Evento B (P = {pNotB.toFixed(2)}) ➔ P(A y B') = {(pA * pNotB).toFixed(4)}
                    </li>
                  </ul>
                </li>

                <li className="mt-4">
                  └── <strong className="text-rose-400">No Evento A</strong> (P = {pNotA.toFixed(2)})
                  <ul className="pl-10 border-l border-slate-600 ml-4">
                    <li className="text-slate-400">
                      ├── Evento B (P = {pB.toFixed(2)}) ➔ P(A' y B) = {(pNotA * pB).toFixed(4)}
                    </li>
                    <li className="text-slate-400">
                      └── No Evento B (P = {pNotB.toFixed(2)}) ➔ P(A' y B') = {(pNotA * pNotB).toFixed(4)}
                    </li>
                  </ul>
                </li>

              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ArbolMultiplicativo;