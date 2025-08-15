export default function KPICard({ label, value, suffix, trend, tone='default' }){
  const toneClass = tone==='alert' ? 'badge alert' : tone==='ok' ? 'badge ok' : 'badge';
  return (
    <div className="kpi">
      <div className="label">{label}</div>
      <div className="value">{value}{suffix ?? ''}</div>
      {trend != null && <div className="trend"><span className={toneClass}>{trend}</span></div>}
    </div>
  );
}
