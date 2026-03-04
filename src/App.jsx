import { useState } from 'react';
import './App.css';
import DataInput from './components/DataInput';
import Estadisticas from './components/Estadisticas';
import TablaFrecuencias from './components/TablaFrecuencias';
import Graficas from './components/Graficas';
import Conjuntos from './components/Conjuntos';
import Probabilidad from './components/Probabilidad';
import ArbolMultiplicativo from './components/ArbolMultiplicativo';

function App() {
  const [datos, setDatos] = useState([]);

  return (
    // Fondo de pantalla ultra oscuro (slate-900)
    <div className="min-h-screen bg-slate-900 py-10 px-4 font-sans text-slate-200">
      
      {/* Contenedor central con el color exacto del árbol (slate-800) y bordes oscuros */}
      <main className="max-w-5xl mx-auto bg-slate-800 shadow-2xl shadow-black/50 rounded-2xl p-8 border border-slate-700">
        
        {/* Título con un degradado más brillante para que destaque en la oscuridad */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2 text-center pb-2">
          Probabilidad y Estadística
        </h1>
        <p className="text-center text-slate-400 mb-8 font-medium">
          Dashboard interactivo
        </p>
        
        <div className="space-y-8">
          <DataInput datos={datos} setDatos={setDatos} />
          <Estadisticas datos={datos} />
          <TablaFrecuencias datos={datos} />
          <Graficas datos={datos} />
          <Conjuntos />
          <Probabilidad />
          <ArbolMultiplicativo />
        </div>
        
      </main>
    </div>
  );
}

export default App;