import { useState } from 'react';

function DataInput({ datos, setDatos }) {
  const [inputTexto, setInputTexto] = useState('');

  const generarAleatorios = () => {
    const aleatorios = [];
    for (let i = 0; i < 20; i++) {
      aleatorios.push(Math.floor(Math.random() * 100) + 1);
    }
    setInputTexto(aleatorios.join(', '));
  };

  const procesarDatos = () => {
    const arregloNumeros = inputTexto
      .split(',')
      .map(numero => parseFloat(numero.trim()))
      .filter(numero => !isNaN(numero));

    if (arregloNumeros.length < 20) {
      alert("Por favor, ingresa al menos 20 datos como pide la rúbrica.");
      return;
    }
    setDatos(arregloNumeros);
  };

  const limpiarDatos = () => {
    setInputTexto('');
    setDatos([]);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-2 border-b border-slate-700 pb-2">1. Entrada de Datos</h2>
      <p className="text-slate-400 mb-4 text-sm">Ingresa al menos 20 datos separados por comas o genéralos automáticamente.</p>
      
      <textarea 
        className="w-full bg-slate-900 border border-slate-600 text-slate-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-600"
        rows="4" 
        value={inputTexto}
        onChange={(e) => setInputTexto(e.target.value)}
        placeholder="Ejemplo: 12, 45, 67, 23..."
      />
      
      <div className="flex flex-wrap gap-3">
        <button onClick={generarAleatorios} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer">
          Generar 20 Aleatorios
        </button>
        <button onClick={procesarDatos} className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer">
          Guardar Datos
        </button>
        <button onClick={limpiarDatos} className="bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer">
          Limpiar
        </button>
      </div>

      {datos.length > 0 && (
        <div className="mt-4 p-3 bg-emerald-900/30 border border-emerald-800/50 text-emerald-400 rounded-lg flex items-center shadow-inner">
          <span className="mr-2">✅</span>
          ¡Listo! Tienes <strong className="mx-1 text-emerald-300">{datos.length}</strong> datos guardados.
        </div>
      )}
    </div>
  );
}

export default DataInput;