import { useEffect, useState } from 'react';
import KPICard from '../components/KPICard';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { gerarEstoque } from '../data/mock';

export default function Estoque({ filtros }) {
  const [data, setData] = useState(() =>
    gerarEstoque({ categoria: filtros.categoria })
  );

  useEffect(() => {
    setData(gerarEstoque({ categoria: filtros.categoria }));
  }, [filtros]);

  // 🎨 Paleta de cores por categoria
  const COLORS_PIE = [
    '#3b82f6', // Eletrônicos - Azul
    '#22c55e', // Vestuário - Verde
    '#f59e0b', // Alimentos - Amarelo
    '#a855f7', // Higiene - Roxo
    '#ef4444', // Móveis - Vermelho
  ];

  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(12,1fr)' }}>
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3>KPIs de Estoque</h3>
        <div className="kpis">
          <KPICard label="Estoque Total" value={data.totalEstoque} />
          <KPICard label="Itens Críticos" value={data.criticos} trend="Atenção" tone="alert" />
          <KPICard label="Categorias" value={data.porCategoria.filter(c => c.value > 0).length} />
          <KPICard label="Top 1 Vendido" value={data.topVendidos[0]?.vendidos ?? 0} />
          <KPICard label="Cobertura Estimada" value="21" suffix=" dias" />
        </div>
      </div>

      <div className="card" style={{ gridColumn: '1 / span 5', minHeight: 320 }}>
        <h3>Top 5 Mais Vendidos</h3>
        <ol style={{ margin: 0, paddingLeft: 18, lineHeight: '1.9' }}>
          {data.topVendidos.map((p, i) => (
            <li key={p.id} style={{ color: '#dbe7ff' }}>
              <span style={{ color: '#93b2ff' }}>#{i + 1}</span> {p.nome} —{' '}
              <span style={{ color: '#9fb2cc' }}>{p.vendidos} un.</span>
            </li>
          ))}
        </ol>
        <div style={{ marginTop: 12 }} className="badge alert">
          Lembrete: reabastecer itens com status "Baixo".
        </div>
      </div>

      <div className="card" style={{ gridColumn: '6 / -1', minHeight: 320 }}>
        <h3>Estoque por Categoria</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.porCategoria}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.porCategoria.map((_, i) => (
                <Cell key={i} fill={COLORS_PIE[i % COLORS_PIE.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3>Tabela de Estoque</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Vendidos</th>
                <th>Estoque</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.produtos.map(p => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.categoria}</td>
                  <td>{p.vendidos}</td>
                  <td>{p.estoque}</td>
                  <td>
                    <span className={`status ${p.status === 'OK' ? 'ok' : 'low'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
