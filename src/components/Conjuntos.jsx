import { useState } from 'react';

function Conjuntos() {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [resultados, setResultados] = useState(null);

  const calcularConjuntos = () => {
    const arrA = inputA.split(',').map(item => item.trim()).filter(item => item !== '');
    const arrB = inputB.split(',').map(item => item.trim()).filter(item => item !== '');
    const setA = new Set(arrA);
    const setB = new Set(arrB);

    const union = new Set([...setA, ...setB]);
    const interseccion = new Set([...setA].filter(x => setB.has(x)));
    const diferenciaAB = new Set([...setA].filter(x => !setB.has(x)));
    const diferenciaBA = new Set([...setB].filter(x => !setA.has(x)));

    setResultados({
      union: [...union].join(', ') || '∅', interseccion: [...interseccion].join(', ') || '∅',
      diferenciaAB: [...diferenciaAB].join(', ') || '∅', diferenciaBA: [...diferenciaBA].join(', ') || '∅'
    });
  };

  const limpiarConjuntos = () => {
    setInputA('');
    setInputB('');
    setResultados(null);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-2 border-b border-slate-700 pb-2">5. Operaciones con Conjuntos</h2>
      <p className="text-slate-400 text-sm mb-6">Ingresa los elementos separados por comas (ej. 1, 2, 3 o a, b, c).</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">Conjunto A:</label>
          <input type="text" className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-600"
            value={inputA} onChange={(e) => setInputA(e.target.value)} placeholder="Ej: a, b, c, d" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1">Conjunto B:</label>
          <input type="text" className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-600"
            value={inputB} onChange={(e) => setInputB(e.target.value)} placeholder="Ej: c, d, e, f" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={calcularConjuntos} className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer">
          Calcular Operaciones
        </button>
        <button onClick={limpiarConjuntos} className="bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer">
          Limpiar
        </button>
      </div>

      {resultados && (
        <div className="mt-6 bg-indigo-900/30 border border-indigo-800/50 p-5 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 p-3 rounded shadow-inner border border-slate-700">
            <strong className="text-indigo-400 block text-sm mb-1">Unión (A ∪ B):</strong>
            <span className="font-mono text-white">{"{"} {resultados.union} {"}"}</span>
          </div>
          <div className="bg-slate-900 p-3 rounded shadow-inner border border-slate-700">
            <strong className="text-indigo-400 block text-sm mb-1">Intersección (A ∩ B):</strong>
            <span className="font-mono text-white">{"{"} {resultados.interseccion} {"}"}</span>
          </div>
          <div className="bg-slate-900 p-3 rounded shadow-inner border border-slate-700">
            <strong className="text-indigo-400 block text-sm mb-1">Diferencia (A - B):</strong>
            <span className="font-mono text-white">{"{"} {resultados.diferenciaAB} {"}"}</span>
          </div>
          <div className="bg-slate-900 p-3 rounded shadow-inner border border-slate-700">
            <strong className="text-indigo-400 block text-sm mb-1">Diferencia (B - A):</strong>
            <span className="font-mono text-white">{"{"} {resultados.diferenciaBA} {"}"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Conjuntos;