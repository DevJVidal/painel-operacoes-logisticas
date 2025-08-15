import { addDays, format } from 'date-fns';

// util cores
export const COLORS = {
  azul: '#3b82f6',
  cinza: '#64748b',
  laranja: '#f59e0b',
  verde: '#22c55e',
  vermelho: '#ef4444',
  roxo: '#6366f1'
};

export const categorias = ['Todos', 'Eletrônicos', 'Vestuário', 'Alimentos', 'Higiene', 'Móveis'];

function rand(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }
function randFloat(min,max,dec=1){ return parseFloat((Math.random()*(max-min)+min).toFixed(dec)); }

// ---------- ENTREGAS ----------
export function gerarEntregas({inicio, fim, categoria}){
  const dias = [];
  let cur = new Date(inicio);
  const end = new Date(fim);
  while(cur <= end){
    dias.push(format(cur,'dd/MM'));
    cur = addDays(cur,1);
  }

  const transportadoras = ['RápidoX','LogBrasil','TransGo','FlyPack','SedeY'];
  const porTransportadora = transportadoras.map(n => ({
    name: n,
    pedidos: rand(80, 280),
    entregues: rand(60, 240),
    atrasados: rand(0, 40)
  }));

  // limites aproximados do Brasil
  const brasilBounds = {
    latMin: -33.75, // sul (RS)
    latMax: 5.27,   // norte (RR)
    lonMin: -73.98, // oeste (AC)
    lonMax: -34.79  // leste (PB)
  };

  const statuses = ['Entregue','Pendente','Atrasado'];

  // gerar pontos espalhados em 75% do território
  const pontos = Array.from({length: 120}, (_,i)=>({
    id: i+1,
    cliente:`Cliente ${i+1}`,
    status: statuses[rand(0,2)],
    pos: [
      brasilBounds.latMin + (Math.random() * (brasilBounds.latMax - brasilBounds.latMin)) * 0.75,
      brasilBounds.lonMin + (Math.random() * (brasilBounds.lonMax - brasilBounds.lonMin)) * 0.75
    ],
    transportadora: transportadoras[rand(0,transportadoras.length-1)]
  }));

  const totalPedidos = porTransportadora.reduce((a,b)=>a+b.pedidos,0);
  const totalEntregues = pontos.filter(p=>p.status==='Entregue').length + rand(50,150);
  const pendentes = pontos.filter(p=>p.status==='Pendente').length + rand(10,80);
  const atrasados = pontos.filter(p=>p.status==='Atrasado').length + rand(5,40);
  const mediaPrazo = randFloat(2.5, 6.5, 1);

  return {
    dias,
    porTransportadora,
    mapa:pontos,
    kpis:{
      totalPedidos,
      entregues: totalEntregues,
      pendentes,
      mediaPrazoDias: mediaPrazo,
      atrasados
    }
  };
}

// ---------- ESTOQUE ----------
export function gerarEstoque({categoria}){
  const categoriasBase = ['Eletrônicos','Vestuário','Alimentos','Higiene','Móveis'];
  const produtos = Array.from({length: 25}, (_,i)=>{
    const cat = categoriasBase[rand(0,categoriasBase.length-1)];
    return {
      id:i+1,
      nome:`Produto ${i+1}`,
      categoria:cat,
      vendidos: rand(30, 900),
      estoque: rand(0, 500),
      status: null
    };
  }).map(p=>{
    p.status = p.estoque < 50 ? 'Baixo' : 'OK';
    return p;
  });

  const filtrados = categoria && categoria !== 'Todos'
    ? produtos.filter(p=>p.categoria===categoria)
    : produtos;

  const totalEstoque = filtrados.reduce((a,b)=>a+b.estoque,0);

  const topVendidos = [...filtrados].sort((a,b)=>b.vendidos-a.vendidos).slice(0,5);

  const porCategoria = categoriasBase.map(c=>({
    name:c,
    value: filtrados.filter(p=>p.categoria===c).reduce((a,b)=>a+b.estoque,0)
  }));

  const criticos = filtrados.filter(p=>p.status==='Baixo').length;

  return { produtos: filtrados, totalEstoque, topVendidos, porCategoria, criticos };
}

// ---------- PRODUÇÃO ----------
export function gerarProducao({inicio,fim}){
  // produtividade semanal (7 pontos)
  const semana = Array.from({length: 7}, (_,i)=>({
    name:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'][i],
    produtividade: rand(60, 120)
  }));

  const utilizacaoMaquinas = randFloat(55, 92, 1); // %
  const tempoMedioLote = randFloat(1.2, 3.8, 1);  // horas
  const eficienciaEquipe = randFloat(60, 98, 1);  // %

  // heatmap de turnos (3 turnos x 5 linhas)
  const turnos = ['Manhã','Tarde','Noite'];
  const linhas = ['A','B','C','D','E'];
  const heatmap = linhas.map(l=>({
    linha:l,
    valores: turnos.map(t=>rand(50, 120)) // produtividade índice
  }));

  return {
    semana,
    utilizacaoMaquinas,
    tempoMedioLote,
    eficienciaEquipe,
    heatmap,
    turnos, linhas
  };
}
