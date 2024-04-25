import{d as V,u as w,c as p,o as b,a as S,w as d,b as u,n as y,t as f,e as D,f as F,V as I,_ as B,r as h,g as k,h as q,i as T,j as $,k as n,l as v,m as M,p as O,q as N,s as P}from"./index-CYJe3N9y.js";import{u as Q}from"./orderBookStore-CIXtDlZx.js";const R={key:0},z=V({__name:"CustomDataTable",props:{headers:{},items:{},dataType:{},priceColor:{default:"#0ecb81"}},setup(r){const l=r,{width:s}=w(),o=p(()=>s.value>680),i=p(()=>o.value?l.headers:l.headers.filter(t=>t.value!=="quantity")),m=()=>Math.max(...l.items.map(t=>t.quantity)),_=t=>{const c=m(),e=t/c;return{bids:`linear-gradient(to left, #082d1f 0%, #082d1f ${e*100}%, transparent ${e*100}%, transparent 100%)`,asks:`linear-gradient(to right, #35090f 0%, #35090f ${e*100}%, transparent ${e*100}%, transparent 100%)`}[l.dataType]};return(t,c)=>(b(),S(I,{headers:i.value,items:t.items,"fixed-header":!0,class:"custom-table",density:"compact"},{item:d(({item:e})=>[u("tr",{class:"custom-table__row",style:y({background:_(e.quantity)})},[u("td",{style:y({color:t.priceColor})},f(e.price),5),o.value?(b(),D("td",R,f(e.quantity),1)):F("",!0),u("td",null,f(e.total),1)],4)]),_:1},8,["headers","items"]))}}),g=B(z,[["__scopeId","data-v-59e297d4"]]),x=r=>(N("data-v-9bef91c9"),r=r(),P(),r),A=x(()=>u("h2",null,"Bids",-1)),j=x(()=>u("h2",null,"Asks",-1)),E=V({__name:"OrderBookPage",setup(r){const l=$(),s=Q(),o=h("100"),i=h(l.params.symbol||k().symbol),m=p(()=>{const e=s.bids.slice(0,parseInt(o.value));return t(e)}),_=p(()=>{const e=s.asks.slice(0,parseInt(o.value));return t(e)});q(()=>{s.ws||(k().updateSymbol(i.value),s.fetchInitialOrderBook(i.value).then(()=>s.initializeWebSocket(i.value)))});const t=e=>e.map(a=>({price:parseFloat(a[0]).toFixed(2),quantity:parseFloat(a[1]).toFixed(5),total:(parseFloat(a[0])*parseFloat(a[1])).toFixed(2)})),c=[{title:"Price",value:"price"},{title:"Quantity",value:"quantity"},{title:"Total",value:"total",align:"end"}];return(e,a)=>(b(),S(T,{fluid:"",class:"order-book-page"},{default:d(()=>[n(M,null,{default:d(()=>[n(v,{cols:"6"},{default:d(()=>[A,n(g,{headers:c,items:m.value,"data-type":"bids","price-color":"#0ecb81",class:"order-book-page__table"},null,8,["items"])]),_:1}),n(v,{cols:"6"},{default:d(()=>[j,n(g,{headers:c,items:_.value,"data-type":"asks","price-color":"#F6465D",class:"order-book-page__table"},null,8,["items"])]),_:1})]),_:1}),n(O,{modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=C=>o.value=C),items:["100","500","1000"],label:"Limit"},null,8,["modelValue"])]),_:1}))}}),U=B(E,[["__scopeId","data-v-9bef91c9"]]);export{U as default};