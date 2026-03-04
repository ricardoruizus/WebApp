function Estadisticas({ datos }) {
  if (datos.length === 0) return null; 

  const min = Math.min(...datos);
  const max = Math.max(...datos);
  const rango = max - min;
  const suma = datos.reduce((acc, val) => acc + val, 0);
  const media = (suma / datos.length).toFixed(2);
  const datosOrdenados = [...datos].sort((a, b) => a - b);
  const mitad = Math.floor(datosOrdenados.length / 2);
  
  let mediana = datosOrdenados.length % 2 === 0 ? ((datosOrdenados[mitad - 1] + datosOrdenados[mitad]) / 2).toFixed(2) : datosOrdenados[mitad].toFixed(2);

  const frecuencias = {};
  let maxFrecuencia = 0;
  let moda = [];
  datos.forEach(num => {
    frecuencias[num] = (frecuencias[num] || 0) + 1;
    if (frecuencias[num] > maxFrecuencia) maxFrecuencia = frecuencias[num];
  });
  for (const num in frecuencias) {
    if (frecuencias[num] === maxFrecuencia) moda.push(num);
  }

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">2. Cálculos Estadísticos</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50 flex flex-col items-center">
          <span className="text-sm text-blue-400 font-semibold uppercase tracking-wider">Mínimo</span>
          <span className="text-2xl font-bold text-white mt-1">{min}</span>
        </div>
        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/50 flex flex-col items-center">
          <span className="text-sm text-blue-400 font-semibold uppercase tracking-wider">Máximo</span>
          <span className="text-2xl font-bold text-white mt-1">{max}</span>
        </div>
        <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-800/50 flex flex-col items-center">
          <span className="text-sm text-indigo-400 font-semibold uppercase tracking-wider">Rango</span>
          <span className="text-2xl font-bold text-white mt-1">{rango}</span>
        </div>
        <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-800/50 flex flex-col items-center">
          <span className="text-sm text-purple-400 font-semibold uppercase tracking-wider">Media</span>
          <span className="text-2xl font-bold text-white mt-1">{media}</span>
        </div>
        <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-800/50 flex flex-col items-center">
          <span className="text-sm text-purple-400 font-semibold uppercase tracking-wider">Mediana</span>
          <span className="text-2xl font-bold text-white mt-1">{mediana}</span>
        </div>
        <div className="bg-pink-900/30 p-4 rounded-lg border border-pink-800/50 flex flex-col items-center text-center">
          <span className="text-sm text-pink-400 font-semibold uppercase tracking-wider">Moda</span>
          <span className="text-xl font-bold text-white mt-1">{moda.join(', ')}</span>
          <span className="text-xs text-slate-400 mt-1">(frec. {maxFrecuencia})</span>
        </div>
      </div>
    </div>
  );
}

export default Estadisticas;