(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(9928)}])},9928:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return X}});var n=r(5893),s=r(7294),i=r(7357),l=r(7533),a=r(8462),o=r(891),d=r(8885),c=r(9334),u=r(7922),h=r(7850),x=r(4178),p=r(6638),m=r(5306),b=r(181),g=r(3508),j=r(2961),f=r(5948),Z=r(3946),v=r(594),C=r(7976);let y=(e,t)=>e.length<=t?e:e.substring(0,t)+"...",P=e=>{let{tabs:t,setSelectedTab:r,handleCloseTab:s,chrome:i}=e;return(0,n.jsx)(f.bK,{droppableId:"droppableTabs",children:e=>(0,n.jsxs)(a.Z,{component:"div",disablePadding:!0,ref:e.innerRef,...e.droppableProps,children:[t.map((e,t)=>(0,n.jsx)(f._l,{draggableId:String(e.id),index:t,children:t=>(0,n.jsxs)(o.ZP,{button:!0,ref:t.innerRef,...t.draggableProps,...t.dragHandleProps,onClick:()=>r(e),secondaryAction:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(Z.Z,{edge:"end","aria-label":"view tab",onClick:()=>i.tabs.update(e.id,{active:!0}),size:"small",children:(0,n.jsx)(j.Z,{fontSize:"small"})}),(0,n.jsx)(Z.Z,{edge:"end","aria-label":"close tab",onClick:()=>s(e.id),size:"small",children:(0,n.jsx)(v.Z,{fontSize:"small"})})]}),children:[(0,n.jsx)(d.Z,{children:(0,n.jsx)("img",{src:e.favIconUrl||"default-icon.png",alt:"".concat(e.title," icon"),style:{width:16,height:16}})}),(0,n.jsx)(c.Z,{primary:y(e.title,20)})]})},e.id)),e.placeholder]})})};var _=r(7313),T=r(6540);let k=e=>{let{clusters:t,openClusters:r,handleToggleCluster:i,handleDeleteCluster:l,newClusterName:d,setNewClusterName:u,addNewCluster:h}=e;return(0,n.jsxs)(a.Z,{component:"div",disablePadding:!0,children:[t.map(e=>(0,n.jsx)(s.Fragment,{children:(0,n.jsxs)(o.ZP,{button:!0,onClick:()=>i(e.id),children:[(0,n.jsx)(c.Z,{primary:e.name}),(0,n.jsx)(f.bK,{droppableId:"cluster-".concat(e.id),children:(t,r)=>(0,n.jsxs)("div",{ref:t.innerRef,...t.droppableProps,style:{backgroundColor:r.isDraggingOver?"lightblue":"grey"},children:[e.tabs.map((e,t)=>(0,n.jsx)(f._l,{draggableId:e.id,index:t,children:t=>(0,n.jsx)(o.ZP,{ref:t.innerRef,...t.draggableProps,...t.dragHandleProps,children:e.content})},e.id)),t.placeholder]})}),(0,n.jsx)(Z.Z,{edge:"end","aria-label":"delete",onClick:t=>{t.stopPropagation(),l(e.id)},children:(0,n.jsx)(DeleteIcon,{})})]})},e.id)),(0,n.jsxs)(o.ZP,{children:[(0,n.jsx)(_.Z,{size:"small",value:d,onChange:e=>u(e.target.value),placeholder:"New cluster name",variant:"outlined"}),(0,n.jsx)(Z.Z,{onClick:h,children:(0,n.jsx)(T.Z,{})})]})]})};var S=r(657),w=r(7645),E=r(6514),N=r(1425),I=r(9417);let L=e=>{let{open:t,onClose:r,tab:s}=e;return(0,n.jsxs)(S.Z,{open:t,onClose:r,children:[(0,n.jsx)(w.Z,{children:s.title}),(0,n.jsx)(E.Z,{children:(0,n.jsx)("p",{children:"Would you like to close this tab?"})}),(0,n.jsxs)(N.Z,{children:[(0,n.jsx)(I.Z,{onClick:r,children:"Cancel"}),(0,n.jsx)(I.Z,{onClick:()=>{r()},children:"Close Tab"})]})]})},M=(e,t,r)=>{let n=Array.from(e),[s]=n.splice(t,1);return n.splice(r,0,s),n};function O(){let[e,t]=(0,s.useState)([]),[r,y]=(0,s.useState)({}),[_,T]=(0,s.useState)([]),[S,w]=(0,s.useState)({}),[E,N]=(0,s.useState)(null),I=()=>{N(null)},[O,R]=(0,s.useState)([{id:"cluster-1",name:"First Cluster",tabs:[]}]),[z,A]=(0,s.useState)(""),[D,F]=(0,s.useState)(null),U=!!D,W=e=>{F(e.currentTarget)},X=()=>{F(null)},H=r=>{if("activity"===r)chrome.runtime.sendMessage({type:"sortTabsByActivity"},e=>{e.sortedTabs?t(e.sortedTabs):console.error("Failed to sort tabs by activity")});else if("alphabetical"===r){let r=[...e].sort((e,t)=>e.title.localeCompare(t.title));t(r)}X()};(0,s.useEffect)(()=>{let e=(e,r,n)=>{"sortedTabs"===e.type&&t(e.sortedTabs)};return chrome.runtime.onMessage.addListener(e),()=>{chrome.runtime.onMessage.removeListener(e)}},[]);let B=()=>{if(""!==z.trim()){let e={id:"cluster-".concat(O.length+1),name:z,tabs:[]};R([...O,e]),A("")}};(0,s.useEffect)(()=>{let e=localStorage.getItem("clusters");e&&R(JSON.parse(e))},[]),(0,s.useEffect)(()=>{try{localStorage.setItem("clusters",JSON.stringify(O))}catch(e){console.error("Failed to save to localStorage:",e)}},[O]);let G=e=>{chrome.tabs.remove(e),t(t=>t.filter(t=>t.id!==e))},J=e=>{y(t=>({...t,[e]:!t[e]}))};(0,s.useEffect)(()=>{chrome.tabs.query({currentWindow:!0},e=>{t(e)})},[]);let q=e=>{w(t=>({...t,[e]:!t[e]}))},K=e=>{w(t=>{let r={...t};return delete r[e],r}),R(O.filter(t=>t.id!==e))};(0,s.useEffect)(()=>{let e=(e,r,n)=>{"openTabs"===e.type&&t(e.tabs)};return chrome.runtime.onMessage.addListener(e),chrome.tabs.query({currentWindow:!0},e=>{t(e)}),()=>chrome.runtime.onMessage.removeListener(e)},[]),(0,s.useEffect)(()=>{let e=(e,r,n)=>{"openTabs"===e.type&&t(e.tabs)};return chrome.runtime.onMessage.addListener(e),()=>{chrome.runtime.onMessage.removeListener(e)}},[]),(0,s.useEffect)(()=>{let e=(e,r,n)=>{"complete"===r.status&&(n.title||n.url||n.favIconUrl)&&t(t=>t.map(t=>t.id===e?{...t,title:n.title,url:n.url,favIconUrl:n.favIconUrl}:t))},r=e=>{t(t=>t.filter(t=>t.id!==e))};return chrome.tabs.onUpdated.addListener(e),chrome.tabs.onRemoved.addListener(r),()=>{chrome.runtime.onMessage.removeListener(handleMessage),chrome.tabs.onUpdated.removeListener(e),chrome.tabs.onRemoved.removeListener(r)}},[]);let V=()=>{let r=e.reduce((e,t)=>{let r=t.url;return e[r]||(e[r]=[]),e[r].push(t),e},{}),n=[];Object.values(r).forEach(e=>{n.push(...e.slice(1).map(e=>e.id))}),n.forEach(e=>{chrome.tabs.remove(e)}),t(e=>e.filter(e=>!n.includes(e.id)))};(0,s.useEffect)(()=>{T((e=>{let t=e.reduce((e,t)=>(e[t.url]=e[t.url]||[],e[t.url].push(t),e),{}),r=Object.values(t).filter(e=>e.length>1);return r})(e))},[e]);let Q=r=>{let{source:n,destination:s}=r;if(s){if("droppableTabs"===n.droppableId&&"droppableTabs"===s.droppableId){let r=M(e,n.index,s.index);t(r),chrome.tabs.move(r[s.index].id,{index:s.index})}else if("droppableTabs"===n.droppableId&&s.droppableId.startsWith("cluster")){let r=e[n.index],i=[...e];i.splice(n.index,1),t(i);let l=s.droppableId,a=[...O],o=a.findIndex(e=>e.id===l);a[o].tabs.push(r),R(a)}}};return console.log(_),(0,n.jsx)(i.Z,{sx:{display:"flex",height:"100%"},children:(0,n.jsx)(l.ZP,{variant:"permanent",anchor:"left",sx:{width:"100%",height:"100%",flexShrink:0,"& .MuiDrawer-paper":{width:"100%",height:"100%",boxSizing:"border-box",marginRight:0,marginLeft:0}},open:!0,children:(0,n.jsx)(f.Z5,{onDragEnd:Q,children:(0,n.jsxs)(a.Z,{children:[(0,n.jsxs)(o.ZP,{button:!0,onClick:()=>J("home"),children:[(0,n.jsx)(d.Z,{children:(0,n.jsx)(p.Z,{})}),(0,n.jsx)(c.Z,{primary:"Active Tabs"}),r.home?(0,n.jsx)(b.Z,{}):(0,n.jsx)(g.Z,{})]}),(0,n.jsxs)(u.Z,{in:r.home,timeout:"auto",unmountOnExit:!0,children:[(0,n.jsxs)(d.Z,{children:[(0,n.jsx)(Z.Z,{"aria-label":"more",id:"long-button","aria-controls":U?"long-menu":void 0,"aria-expanded":U?"true":void 0,"aria-haspopup":"true",onClick:W,children:(0,n.jsx)(C.Z,{})}),(0,n.jsxs)(h.Z,{id:"long-menu",MenuListProps:{"aria-labelledby":"long-button"},anchorEl:D,open:U,onClose:X,children:[(0,n.jsx)(x.Z,{onClick:()=>H("activity"),children:"Sort by Most Active"}),(0,n.jsx)(x.Z,{onClick:()=>H("alphabetical"),children:"Sort Alphabetically"})]})]}),(0,n.jsx)(L,{open:!!E,tab:E||{},onClose:I}),(0,n.jsx)(P,{tabs:e,selectedTab:E,setSelectedTab:N,handleCloseTab:G})]}),(0,n.jsxs)(o.ZP,{button:!0,onClick:()=>J("explore"),children:[(0,n.jsx)(d.Z,{children:(0,n.jsx)(m.Z,{})}),(0,n.jsx)(c.Z,{primary:"Cluster Tab"}),r.explore?(0,n.jsx)(b.Z,{}):(0,n.jsx)(g.Z,{})]}),(0,n.jsx)(u.Z,{in:r.explore,timeout:"auto",unmountOnExit:!0,children:(0,n.jsx)(a.Z,{component:"div",disablePadding:!0,children:(0,n.jsx)(k,{clusters:O,openClusters:S,handleToggleCluster:q,handleDeleteCluster:K,newClusterName:z,setNewClusterName:A,addNewCluster:B})})}),(0,n.jsxs)(o.ZP,{button:!0,onClick:()=>J("findDuplicates"),children:[(0,n.jsx)(d.Z,{children:(0,n.jsx)(j.Z,{})}),(0,n.jsx)(c.Z,{primary:"Find Duplicates"}),r.findDuplicates?(0,n.jsx)(b.Z,{}):(0,n.jsx)(g.Z,{})]}),(0,n.jsx)(u.Z,{in:r.findDuplicates,timeout:"auto",unmountOnExit:!0,children:Array.isArray(_)&&_.length>0&&_.map((e,t)=>(0,n.jsxs)(i.Z,{sx:{border:"1px solid grey",borderRadius:"16px",position:"relative",backgroundColor:"grey",padding:"15px",margin:"16px"},children:[(0,n.jsx)(Z.Z,{onClick:V,sx:{position:"absolute",top:0,right:0,transform:"translate(50%, -50%)",color:"grey",backgroundColor:"white",padding:"4px","&:hover":{backgroundColor:"#e0e0e0"},fontSize:"1rem"},children:(0,n.jsx)(v.Z,{fontSize:"inherit"})}),(0,n.jsx)(a.Z,{component:"div",disablePadding:!0,children:e.map((e,t)=>(0,n.jsxs)(o.ZP,{children:[(0,n.jsx)(d.Z,{children:(0,n.jsx)("img",{src:e.favIconUrl||"default-icon.png",alt:"".concat(e.title," icon"),style:{width:16,height:16}})}),(0,n.jsx)(c.Z,{primary:e.title})]},t))})]},t))})]})})})})}let R=()=>{let[e,t]=(0,s.useState)(!1),r=()=>{t(!e)};return{isOpen:e,toggleSidebar:r}};var z=r(326);let A=e=>{let{children:t}=e,{isOpen:r,toggleSidebar:s}=R();return(0,n.jsxs)(i.Z,{sx:{display:"flex"},children:[(0,n.jsx)(Z.Z,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:s,sx:{marginRight:"20px",...r&&{display:"none"}},children:(0,n.jsx)(z.Z,{})}),(0,n.jsx)(O,{isOpen:r,toggleSidebar:s}),(0,n.jsx)(i.Z,{component:"main",sx:{flexGrow:1},children:t})]})};function D(e){let{navigateToPage:t}=e;return(0,n.jsx)(A,{})}var F=r(6467),U=r.n(F);function W(e){let{navigateToPage:t}=e;return(0,n.jsx)("div",{className:U().container,children:(0,n.jsxs)("main",{className:U().main,children:[(0,n.jsx)("h1",{className:U().title,children:"NEXT-CHROME-STARTER"}),(0,n.jsx)("p",{className:U().description,children:"This is an example of a Browser Extension built with NEXT.JS. Please refer to the GitHub repo for running instructions and documentation"}),(0,n.jsx)("h1",{className:U().code,children:"New Page ./components/New/index.js"}),(0,n.jsx)("p",{children:"[ - This is New page content - ]"}),(0,n.jsx)("p",{onClick:()=>t("index"),children:"< Go Back"})]})})}function X(){let[e,t]=(0,s.useState)("index"),r=e=>{t(e)};return(0,n.jsxs)(n.Fragment,{children:["index"===e&&(0,n.jsx)(D,{navigateToPage:r}),"new"===e&&(0,n.jsx)(W,{navigateToPage:r})]})}},6467:function(e){e.exports={container:"Pages_container__SbWhT",main:"Pages_main__5_Vsf",title:"Pages_title__5_zk8",description:"Pages_description__Vsj9E",code:"Pages_code__vzNOX"}}},function(e){e.O(0,[630,445,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);