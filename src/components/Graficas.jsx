import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

function Graficas({ datos }) {
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
  const datosGrafica = [];

  for (let i = 0; i < k; i++) {
    let limiteSuperior = limiteInferior + amplitud;
    const fi = datos.filter(d => i === k - 1 ? (d >= limiteInferior && d <= limiteSuperior) : (d >= limiteInferior && d < limiteSuperior)).length;
    frecuenciaAcumulada += fi;
    const xi = (limiteInferior + limiteSuperior) / 2;
    datosGrafica.push({ clase: `[${limiteInferior} - ${limiteSuperior})`, limiteSuperior: limiteSuperior.toFixed(2), xi: xi.toFixed(2), Frecuencia: fi, Fi: frecuenciaAcumulada });
    limiteInferior = limiteSuperior;
  }

  const datosPareto = [...datosGrafica].sort((a, b) => b.Frecuencia - a.Frecuencia);
  let paretoAcumulado = 0;
  const datosParetoFinal = datosPareto.map(item => {
    paretoAcumulado += item.Frecuencia;
    return { ...item, PorcentajeAcumulado: parseFloat(((paretoAcumulado / n) * 100).toFixed(2)) };
  });

  // Estilo común para los Tooltips oscuros
  const tooltipStyle = { backgroundColor: '#1e293b', borderColor: '#475569', color: '#f8fafc' };

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-2">4. Gráficas Estadísticas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
          <h3 className="text-lg font-semibold text-white mb-1">Histograma</h3>
          <p className="text-xs text-slate-400 mb-4">Frecuencia absoluta (fi) en cada intervalo.</p>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <BarChart data={datosGrafica} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="clase" tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{fontSize: '12px', color: '#cbd5e1'}} />
                <Bar dataKey="Frecuencia" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Frecuencia (fi)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
          <h3 className="text-lg font-semibold text-white mb-1">Polígono de Frecuencias</h3>
          <p className="text-xs text-slate-400 mb-4">Puntos medios (marcas de clase, xi).</p>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={datosGrafica} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="xi" tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{fontSize: '12px', color: '#cbd5e1'}} />
                <Line type="monotone" dataKey="Frecuencia" stroke="#10b981" strokeWidth={3} name="Frecuencia (fi)" activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
          <h3 className="text-lg font-semibold text-white mb-1">Ojiva</h3>
          <p className="text-xs text-slate-400 mb-4">Frecuencia acumulada (Fi) vs Límite Superior.</p>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={datosGrafica} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="limiteSuperior" tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{fontSize: '12px', color: '#cbd5e1'}} />
                <Line type="monotone" dataKey="Fi" stroke="#f59e0b" strokeWidth={3} name="Frec. Acumulada (Fi)" activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-inner">
          <h3 className="text-lg font-semibold text-white mb-1">Diagrama de Pareto</h3>
          <p className="text-xs text-slate-400 mb-4">Frecuencias ordenadas y porcentaje acumulado.</p>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <ComposedChart data={datosParetoFinal} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="clase" tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis yAxisId="left" tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{fontSize: '12px', color: '#cbd5e1'}} />
                <Bar yAxisId="left" dataKey="Frecuencia" fill="#6366f1" radius={[4, 4, 0, 0]} name="Frecuencia" />
                <Line yAxisId="right" type="monotone" dataKey="PorcentajeAcumulado" stroke="#ec4899" strokeWidth={3} name="% Acumulado" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Graficas;