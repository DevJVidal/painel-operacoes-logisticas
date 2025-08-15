import { useMemo, useState } from 'react';
import './styles.css';
import Filters from './components/Filters';
import Entregas from './modules/Entregas';
import Estoque from './modules/Estoque';
import Producao from './modules/Producao';
import { Truck } from "lucide-react"; 


const TABS = ['Entregas','Estoque','Produção'];

export default function App(){
  const [active, setActive] = useState('Entregas');
  const [filtros, setFiltros] = useState({
    inicio: '2025-01-01',
    fim: '2025-12-31',
    categoria: 'Todos'
  });

  const view = useMemo(()=>{
    if(active==='Entregas') return <Entregas filtros={filtros} />;
    if(active==='Estoque') return <Estoque filtros={filtros} />;
    return <Producao filtros={filtros} />;
  }, [active, filtros]);

  return (
    <>
      <div className="header">
        <div className="brand">
          {/* Ícone de caminhão no lugar da bolinha azul */}
          <Truck size={35} color="#043688ff" style={{ marginRight: 8 }} />
          <h1>Painel de Operações Logísticas</h1>
        </div>
        <div className="nav">
          {TABS.map(t=>(
            <button key={t} className={`tab ${active===t?'active':''}`} onClick={()=>setActive(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="container">
        <Filters onChange={setFiltros} />
        <div style={{height:12}}/>
        {view}
      </div>
    </>
  );

  
}
