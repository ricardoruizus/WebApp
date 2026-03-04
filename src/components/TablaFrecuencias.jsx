function TablaFrecuencias({ datos }) {
  if (datos.length === 0) return null;

  const n = datos.length;
  const min = Math.min(...datos);
  const max = Math.max(...datos);
  const rango = max - min;

  let k = Math.round(1 + 3.322 * Math.log10(n));
  if (k < 5) k = 5; 
  const amplitud = Math.ceil(rango / k);

  let limiteInferior = min;
  let frecuenciaAcumulada = 0;
  let frecuenciaRelativaAcumulada = 0;
  const filas = [];

  for (let i = 0; i < k; i++) {
    let limiteSuperior = limiteInferior + amplitud;
    const fi = datos.filter(d => 
      i === k - 1 ? (d >= limiteInferior && d <= limiteSuperior) : (d >= limiteInferior && d < limiteSuperior)
    ).length;
    const fr = fi / n;
    frecuenciaAcumulada += fi;
    frecuenciaRelativaAcumulada += fr;
    const xi = (limiteInferior + limiteSuperior) / 2;

    filas.push({
      clase: `[${limiteInferior} - ${limiteSuperior})`,
      xi: xi.toFixed(2), fi: fi, fr: fr.toFixed(4), Fi: frecuenciaAcumulada, Fr: frecuenciaRelativaAcumulada.toFixed(4)
    });
    limiteInferior = limiteSuperior;
  }

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">3. Tabla de Frecuencias</h2>
      
      <table className="min-w-full text-sm text-left text-slate-300 border border-slate-700 rounded-lg overflow-hidden shadow-inner">
        <thead className="text-xs text-slate-400 uppercase bg-slate-900 border-b border-slate-700">
          <tr>
            <th className="px-4 py-3 border-r border-slate-700">Clase (Intervalo)</th>
            <th className="px-4 py-3 border-r border-slate-700">Marca de Clase (xi)</th>
            <th className="px-4 py-3 border-r border-slate-700 bg-blue-900/50 text-blue-300">f. absoluta (fi)</th>
            <th className="px-4 py-3 border-r border-slate-700">f. relativa (fr)</th>
            <th className="px-4 py-3 border-r border-slate-700 bg-emerald-900/50 text-emerald-300">F. abs. acum. (Fi)</th>
            <th className="px-4 py-3">F. rel. acum. (Fr)</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, index) => (
            <tr key={index} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700 transition-colors">
              <td className="px-4 py-3 border-r border-slate-700 font-medium text-white">{fila.clase}</td>
              <td className="px-4 py-3 border-r border-slate-700">{fila.xi}</td>
              <td className="px-4 py-3 border-r border-slate-700 font-bold text-blue-400">{fila.fi}</td>
              <td className="px-4 py-3 border-r border-slate-700">{fila.fr}</td>
              <td className="px-4 py-3 border-r border-slate-700 font-bold text-emerald-400">{fila.Fi}</td>
              <td className="px-4 py-3">{fila.Fr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaFrecuencias;