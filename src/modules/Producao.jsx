import { useEffect, useState } from 'react';
import KPICard from '../components/KPICard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { gerarProducao } from '../data/mock';

function Gauge({ value }){
  // Gauge simples com conic-gradient (0-100)
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{display:'grid',placeItems:'center',height:220}}>
      <div style={{
        width:180, height:180, borderRadius:'50%',
        background:`conic-gradient(#22c55e 0 ${pct*1.8}deg, #1f2937 ${pct*1.8}deg 360deg)`,
        display:'grid', placeItems:'center', filter:'drop-shadow(0 6px 16px rgba(0,0,0,.3))'
      }}>
        <div style={{width:130,height:130,borderRadius:'50%',background:'#0b1222',border:'1px solid #243043',display:'grid',placeItems:'center'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:28,fontWeight:700}}>{pct}%</div>
            <div style={{fontSize:12,color:'#a9bdd8'}}>Eficiência</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Producao({filtros}){
  const [data, setData] = useState(()=>gerarProducao(filtros));
  useEffect(()=>{ setData(gerarProducao(filtros)); }, [filtros]);

  return (
    <div className="grid" style={{gridTemplateColumns:'repeat(12,1fr)'}}>
      <div className="card" style={{gridColumn:'1 / -1'}}>
        <h3>KPIs de Produção</h3>
        <div className="kpis">
          <KPICard label="Utilização das Máquinas" value={data.utilizacaoMaquinas} suffix="%" trend="+3,2% vs. semana" />
          <KPICard label="Tempo Médio por Lote" value={data.tempoMedioLote} suffix=" h" />
          <KPICard label="Eficiência da Equipe" value={data.eficienciaEquipe} suffix="%" tone="ok" />
          <KPICard label="Ordens em Curso" value="24" />
          <KPICard label="Paradas Não Planejadas" value="3" trend="Atenção" tone="alert" />
        </div>
      </div>

      <div className="card" style={{gridColumn:'1 / span 7', minHeight:340}}>
        <h3>Produtividade Semanal</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data.semana}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="produtividade" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{gridColumn:'8 / -1', minHeight:340}}>
        <h3>Velocímetro de Eficiência</h3>
        <Gauge value={Math.round(data.eficienciaEquipe)} />
        <div className="legend" style={{justifyContent:'center'}}>
          <span className="dot success"></span> Bom
          <span className="dot warning"></span> Atenção
          <span className="dot error"></span> Crítico
        </div>
      </div>

      <div className="card" style={{gridColumn:'1 / -1'}}>
        <h3>Heatmap de Turnos</h3>
        <div style={{overflowX:'auto'}}>
          <table className="table">
            <thead>
              <tr>
                <th>Linha</th>
                {data.turnos.map(t=><th key={t}>{t}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.heatmap.map(row=>(
                <tr key={row.linha}>
                  <td>{row.linha}</td>
                  {row.valores.map((v,idx)=>{
                    // cor baseada no valor
                    const pct = Math.min(100, Math.max(0, v));
                    const bg = `linear-gradient(0deg, rgba(59,130,246,${.15 + pct/200}) 0%, rgba(59,130,246,0.06) 100%)`;
                    return <td key={idx} style={{background:bg,borderRadius:8}}>{v}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
