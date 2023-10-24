"use strict";var R=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var z=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var G=(a,t)=>{for(var c in t)R(a,c,{get:t[c],enumerable:!0})},I=(a,t,c,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of z(t))!F.call(a,i)&&i!==c&&R(a,i,{get:()=>t[i],enumerable:!(s=E(t,i))||s.enumerable});return a};var L=a=>I(R({},"__esModule",{value:!0}),a);var U={};G(U,{BarVisualizer:()=>x});module.exports=L(U);var l=require("react"),b=require("react/jsx-runtime"),S="#16a34a",V="#D1D5DB",W="#f3f4f6",k=({stream:a,size:t=25,circle:c=!0,addTransparency:s,bgColor:i,barColor:d,barBgColor:m,padding:w,borderRadius:D})=>{let y=(0,l.useRef)(null),[A,H]=(0,l.useState)("");return(0,l.useEffect)(()=>{if(a&&y.current){let C=new AudioContext,M=C.createMediaStreamSource(a),f=C.createAnalyser(),p=y.current,e=p.getContext("2d");if(!e)return;M.connect(f),f.fftSize=2048;let P=f.frequencyBinCount,h=new Uint8Array(P),v=()=>{let u=p.width,o=p.height;H(`${32/100*u}px`),requestAnimationFrame(v),f.getByteFrequencyData(h);let B=h.reduce((T,q)=>T+q,0)/h.length;e.clearRect(0,0,u,o);let n=o/3,r=Math.round(28/100*u),g=Math.round(8/100*u);e.fillStyle=m||V,e.fillRect(0,o/2,r,n),e.fillRect(r+g,o/2-n/2,r,n+n/2),e.fillRect((r+g)*2,o/2-n,r,n*2),B>7&&(e.fillStyle=d||S,e.fillRect(0,o/2,r,n)),B>30&&(e.fillStyle=d||S,e.fillRect(r+g,o/2-n/2,r,n+n/2)),B>70&&(e.fillStyle=d||S,e.fillRect((r+g)*2,o/2-n,r,n*2))};v()}},[a,m,d]),(0,b.jsx)("div",{style:{backgroundColor:i||W,borderRadius:c?"9999px":D||0,padding:w||A,opacity:s?.75:1,width:"fit-content"},children:(0,b.jsx)("canvas",{ref:y,width:t,height:t})})},x=k;0&&(module.exports={BarVisualizer});