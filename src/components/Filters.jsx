import { useState } from 'react';
import { format } from 'date-fns';
import { categorias } from '../data/mock';

export default function Filters({ onChange }){
  const [inicio, setInicio] = useState(format(new Date(), 'yyyy-01-01'));
  const [fim, setFim] = useState(format(new Date(), 'yyyy-12-31'));
  const [categoria, setCategoria] = useState('Todos');

  function emit(){
    onChange({ inicio, fim, categoria });
  }

  return (
    <div className="card" style={{display:'flex',gap:12,alignItems:'center',justifyContent:'space-between'}}>
      <div className="filters">
        <div>
          <div style={{fontSize:12,color:'#9fb2cc',marginBottom:6}}>Início</div>
          <input className="input" type="date" value={inicio} onChange={e=>setInicio(e.target.value)} />
        </div>
        <div>
          <div style={{fontSize:12,color:'#9fb2cc',marginBottom:6}}>Fim</div>
          <input className="input" type="date" value={fim} onChange={e=>setFim(e.target.value)} />
        </div>
        <div>
          <div style={{fontSize:12,color:'#9fb2cc',marginBottom:6}}>Categoria</div>
          <select className="select" value={categoria} onChange={e=>setCategoria(e.target.value)}>
            {categorias.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <button className="tab" onClick={emit} style={{borderColor:'#2f59a8'}}>Aplicar filtros</button>
    </div>
  );

}
