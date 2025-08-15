import { useEffect, useMemo, useState } from 'react';
import KPICard from '../components/KPICard';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, CartesianGrid
} from 'recharts';
import { gerarEntregas, COLORS } from '../data/mock';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: marker,
  iconRetinaUrl: marker2x,
  shadowUrl: shadow
});

export default function Entregas({ filtros }) {
  const [data, setData] = useState(() => gerarEntregas(filtros));
  useEffect(() => { setData(gerarEntregas(filtros)); }, [filtros]);

  const barData = useMemo(() =>
    data.porTransportadora.map(t => ({
      name: t.name,
      Entregues: t.entregues,
      Pedidos: t.pedidos,
      Atrasados: t.atrasados
    })), [data]);

  const statusColor = (s) => {
    if (s === 'Entregue') return COLORS.verde;
    if (s === 'Pendente') return COLORS.azul;
    return COLORS.vermelho;
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(12,1fr)' }}>
      {/* KPIs */}
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3>KPIs de Entregas</h3>
        <div className="kpis">
          <KPICard label="Total de Pedidos" value={data.kpis.totalPedidos} />
          <KPICard label="Entregues" value={data.kpis.entregues} trend="+12% vs. ont." tone="ok" />
          <KPICard label="Pendentes" value={data.kpis.pendentes} trend="-5% vs. ont." />
          <KPICard label="Média do Prazo" value={data.kpis.mediaPrazoDias} suffix=" dias" />
          <KPICard label="Atrasados" value={data.kpis.atrasados} trend="Atenção" tone="alert" />
        </div>
      </div>

      {/* Gráfico de Barras */}
      <div className="card" style={{ gridColumn: '1 / span 6', minHeight: 360 }}>
        <h3>Entregas por Transportadora</h3>
        <div className="legend" style={{ marginBottom: 8 }}>
          <span className="dot" style={{ background: COLORS.azul }}></span> Pedidos
          <span className="dot" style={{ background: COLORS.verde }}></span> Entregues
          <span className="dot" style={{ background: COLORS.vermelho }}></span> Atrasados
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", color: "#fff" }} />
            <Legend wrapperStyle={{ color: "#fff" }} />

            {/* Pedidos → Azul */}
            <Bar dataKey="Pedidos" fill={COLORS.azul} />

            {/* Entregues → Verde */}
            <Bar dataKey="Entregues" fill={COLORS.verde} />

            {/* Atrasados → Vermelho */}
            <Bar dataKey="Atrasados" fill={COLORS.vermelho} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mapa */}
      <div className="card" style={{ gridColumn: '7 / -1', minHeight: 360 }}>
        <h3>Mapa de Entregas (Status)</h3>
        <div className="legend" style={{ marginBottom: 8 }}>
          <span className="dot" style={{ background: COLORS.verde }}></span> Entregue
          <span className="dot" style={{ background: COLORS.azul }}></span> Pendente
          <span className="dot" style={{ background: COLORS.vermelho }}></span> Atrasado
        </div>
        <div style={{ height: 280, borderRadius: 12, overflow: 'hidden' }}>
          <MapContainer center={[-14.235, -51.925]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.mapa.map(p => (
              <Marker
                key={p.id}
                position={p.pos}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `<div style="width:12px;height:12px;border-radius:50%;background:${statusColor(p.status)};border:1px solid #0b1222;box-shadow:0 0 0 2px rgba(0,0,0,.25)"></div>`
                })}
              >
                <Popup>
                  <b>{p.cliente}</b><br />
                  {p.transportadora}<br />
                  Status: {p.status}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
