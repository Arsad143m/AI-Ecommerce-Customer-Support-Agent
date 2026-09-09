import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  LayoutDashboard, MessageCircle, Package, Search, RotateCcw, BrainCircuit, Settings,
  Menu, X, Send, Sparkles, ArrowRight, CheckCircle2, Clock3, ShoppingBag, ShieldCheck,
  Zap, Bot, UserRound, Truck, Star, ChevronRight
} from 'lucide-react'
import './styles.css'

type Page = 'home'|'dashboard'|'chat'|'products'|'orders'|'returns'|'memory'|'about'
type Message = { role:'user'|'ai', text:string, cards?:boolean }

const products = [
  {name:'NovaBook Pro 14', category:'Laptop', price:'₹48,999', rating:'4.8', image:'/assets/product-laptop.svg'},
  {name:'Pulse Buds Max', category:'Audio', price:'₹6,499', rating:'4.6', image:'/assets/product-buds.svg'},
  {name:'AeroFit Smartwatch', category:'Wearables', price:'₹8,999', rating:'4.7', image:'/assets/product-watch.svg'},
  {name:'Vision 4K Monitor', category:'Accessories', price:'₹22,499', rating:'4.5', image:'/assets/product-monitor.svg'}
]

function App(){
  const [page,setPage] = useState<Page>('home')
  const [mobile,setMobile] = useState(false)
  const [query,setQuery] = useState('')
  const [messages,setMessages] = useState<Message[]>([
    {role:'ai', text:'Hi Arsh! I’m ShopMind, your AI shopping assistant. I can help with products, orders, returns, and recommendations.'}
  ])

  const navigate=(p:Page)=>{setPage(p);setMobile(false)}
  const send=(text=query)=>{
    if(!text.trim()) return
    const lower=text.toLowerCase()
    let response='I can help with that. Please share a little more information so I can assist you accurately.'
    let cards=false
    if(lower.includes('order')||lower.includes('track')) response='Your order #EC-2048 is currently out for delivery. The estimated delivery is today between 4:00 PM and 7:00 PM.'
    else if(lower.includes('return')||lower.includes('refund')) response='You can request a return within 7 days of delivery. Your eligible order #EC-2048 can be returned, and the refund will be initiated after pickup inspection.'
    else if(lower.includes('laptop')||lower.includes('recommend')) { response='Based on your interest in productivity devices, I recommend the NovaBook Pro 14. It has 16GB RAM, a fast SSD, and a 14-inch display.'; cards=true }
    else if(lower.includes('policy')) response='Our standard return policy allows eligible products to be returned within 7 days. Refunds usually reach the original payment method in 3–5 business days.'
    setMessages(m=>[...m,{role:'user',text},{role:'ai',text:response,cards}]); setQuery('')
  }

  return <div className="app">
    <header className="topbar">
      <div className="brand" onClick={()=>navigate('home')}><div className="brandmark"><Sparkles size={18}/></div><span>Shop<span>Mind</span></span></div>
      <button className="mobile-toggle" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button>
      <nav className={mobile?'nav open':'nav'}>
        <button onClick={()=>navigate('home')}>Home</button><button onClick={()=>navigate('dashboard')}>Dashboard</button><button onClick={()=>navigate('chat')}>AI Assistant</button><button onClick={()=>navigate('about')}>About</button>
      </nav>
      <button className="top-cta" onClick={()=>navigate('chat')}><MessageCircle size={16}/> Try assistant</button>
    </header>

    {page==='home' && <Home navigate={navigate}/>}
    {page!=='home' && <div className="workspace">
      <aside className="sidebar">
        <div className="side-label">WORKSPACE</div>
        <SideButton icon={<LayoutDashboard/>} text="Overview" active={page==='dashboard'} onClick={()=>navigate('dashboard')}/>
        <SideButton icon={<MessageCircle/>} text="AI Chat Assistant" active={page==='chat'} onClick={()=>navigate('chat')}/>
        <SideButton icon={<Package/>} text="Orders" active={page==='orders'} onClick={()=>navigate('orders')}/>
        <SideButton icon={<Search/>} text="Products" active={page==='products'} onClick={()=>navigate('products')}/>
        <SideButton icon={<RotateCcw/>} text="Returns & Refunds" active={page==='returns'} onClick={()=>navigate('returns')}/>
        <SideButton icon={<BrainCircuit/>} text="Customer Memory" active={page==='memory'} onClick={()=>navigate('memory')}/>
        <div className="side-bottom"><SideButton icon={<Settings/>} text="Settings" onClick={()=>navigate('about')}/></div>
      </aside>
      <main className="main-content">
        {page==='dashboard' && <Dashboard navigate={navigate}/>}
        {page==='chat' && <Chat messages={messages} query={query} setQuery={setQuery} send={send}/>}
        {page==='products' && <Products/>}
        {page==='orders' && <Orders navigate={navigate}/>}
        {page==='returns' && <Returns/>}
        {page==='memory' && <Memory/>}
        {page==='about' && <About/>}
      </main>
    </div>}
  </div>
}

function SideButton({icon,text,active,onClick}:{icon:React.ReactNode,text:string,active?:boolean,onClick:()=>void}){return <button className={active?'side-btn active':'side-btn'} onClick={onClick}>{icon}<span>{text}</span></button>}

function Home({navigate}:{navigate:(p:Page)=>void}){
 return <><section className="hero">
   <div className="hero-copy"><div className="eyebrow"><span className="pulse"></span> AI-POWERED CUSTOMER EXPERIENCE</div>
   <h1>Support that feels<br/><em>intelligent.</em></h1>
   <p>ShopMind helps e-commerce teams resolve questions, track orders, manage returns, and recommend products through one thoughtful AI agent.</p>
   <div className="hero-actions"><button className="primary" onClick={()=>navigate('chat')}>Try AI Assistant <ArrowRight size={17}/></button><button className="secondary" onClick={()=>navigate('dashboard')}>Explore dashboard</button></div>
   <div className="hero-proof"><div><strong>24/7</strong><span>Always available</span></div><div><strong>92%</strong><span>Queries resolved</span></div><div><strong>3.2x</strong><span>Faster support</span></div></div></div>
   <div className="hero-art"><div className="orb orb-one"></div><div className="orb orb-two"></div><div className="agent-card"><div className="agent-head"><div className="avatar"><Bot/></div><div><b>ShopMind AI</b><small>Online • Ready to help</small></div><span className="status-dot"></span></div><div className="mini-message">Hi! What can I help you find today?</div><div className="mini-product"><img src="/assets/product-laptop.svg"/><div><b>NovaBook Pro 14</b><small>Recommended for you</small><strong>₹48,999</strong></div><ChevronRight/></div><div className="mini-input">Ask anything... <Send size={15}/></div></div><div className="float-chip chip-top"><Zap size={15}/> Tool calling active</div><div className="float-chip chip-bottom"><BrainCircuit size={15}/> Memory enabled</div></div>
 </section><section className="section"><div className="section-heading"><div><div className="eyebrow">ONE AGENT, MANY TASKS</div><h2>Every customer question,<br/>handled with context.</h2></div><p>From first search to final delivery, ShopMind connects the right tools and remembers what matters.</p></div><div className="feature-grid"><Feature icon={<Search/>} title="Product discovery" text="Search catalogs and surface relevant recommendations in seconds."/><Feature icon={<Truck/>} title="Order intelligence" text="Give accurate status updates using real-time order tools."/><Feature icon={<RotateCcw/>} title="Returns made easy" text="Guide customers through returns and refund workflows."/><Feature icon={<BrainCircuit/>} title="Personalized memory" text="Remember preferences and create more helpful conversations." /></div></section><section className="dark-section"><div className="section-heading"><div><div className="eyebrow light">HOW IT WORKS</div><h2>Reason. Act. Remember.</h2></div><p>Built around the core capabilities of modern AI agents.</p></div><div className="flow"><Flow n="01" title="Understand" text="Natural language intent detection"/><ArrowRight/><Flow n="02" title="Use tools" text="Products, orders and returns APIs"/><ArrowRight/><Flow n="03" title="Respond" text="Clear, contextual answers"/><ArrowRight/><Flow n="04" title="Remember" text="Preferences and conversation history"/></div></section><footer><div className="brand"><div className="brandmark"><Sparkles size={18}/></div><span>Shop<span>Mind</span></span></div><p>AI E-Commerce Customer Support Agent • College Project</p></footer></>
}
function Feature({icon,title,text}:{icon:React.ReactNode,title:string,text:string}){return <div className="feature"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p><ArrowRight size={17}/></div>}
function Flow({n,title,text}:{n:string,title:string,text:string}){return <div className="flow-item"><span>{n}</span><h3>{title}</h3><p>{text}</p></div>}

function Dashboard({navigate}:{navigate:(p:Page)=>void}){return <><PageHeader eyebrow="OVERVIEW" title="Good evening, Arsh." sub="Here’s what your AI support workspace looks like today."/><div className="stats"><Stat icon={<MessageCircle/>} label="Total conversations" value="1,284" change="+18.2%"/><Stat icon={<CheckCircle2/>} label="Resolved queries" value="1,182" change="+12.4%"/><Stat icon={<Clock3/>} label="Pending orders" value="48" change="-8.1%"/><Stat icon={<RotateCcw/>} label="Return requests" value="24" change="+4.6%"/></div><div className="dashboard-grid"><div className="panel large"><div className="panel-head"><div><h3>Recent conversations</h3><p>Live AI support activity</p></div><button className="text-btn" onClick={()=>navigate('chat')}>Open assistant <ArrowRight size={15}/></button></div>{['Order tracking request','Laptop recommendation','Return eligibility check','Refund status question'].map((x,i)=><div className="conversation" key={x}><div className="conv-avatar"><Bot size={16}/></div><div><b>{x}</b><small>Customer conversation • {i+1} min ago</small></div><span className="resolved"><CheckCircle2 size={14}/> Resolved</span></div>)}</div><div className="panel"><div className="panel-head"><div><h3>Agent health</h3><p>Performance overview</p></div><ShieldCheck/></div><div className="health"><strong>98.6%</strong><span>Successful tool calls</span><div className="progress"><i></i></div></div><div className="health-row"><span>Customer satisfaction</span><b>4.8 / 5</b></div><div className="health-row"><span>Avg. response time</span><b>1.2 sec</b></div></div></div></>}
function Stat({icon,label,value,change}:{icon:React.ReactNode,label:string,value:string,change:string}){return <div className="stat"><div className="stat-icon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{change} this month</small></div>}
function PageHeader({eyebrow,title,sub}:{eyebrow:string,title:string,sub:string}){return <div className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{sub}</p></div><div className="header-badge"><span className="status-dot"></span> Agent online</div></div>}

function Chat({messages,query,setQuery,send}:{messages:Message[],query:string,setQuery:(x:string)=>void,send:(x?:string)=>void}){return <><PageHeader eyebrow="AI ASSISTANT" title="How can I help?" sub="Ask about products, orders, returns, or anything about your shopping journey."/><div className="chat-layout"><div className="chat-panel"><div className="chat-top"><div><b><span className="status-dot"></span> ShopMind AI</b><small>Tool Calling + Memory enabled</small></div><button className="icon-btn" onClick={()=>location.reload()}>↻</button></div><div className="messages">{messages.map((m,i)=><div className={m.role==='ai'?'msg ai':'msg user'} key={i}><div className="msg-avatar">{m.role==='ai'?<Bot size={15}/>:<UserRound size={15}/>}</div><div><p>{m.text}</p>{m.cards&&<div className="recommend"><img src="/assets/product-laptop.svg"/><div><b>NovaBook Pro 14</b><small>16GB RAM • 512GB SSD</small><strong>₹48,999</strong></div></div>}<small className="time">Just now</small></div></div>)}</div><div className="suggestions">{['Where is my order?','Recommend a laptop','Can I return my order?','What is the refund policy?'].map(s=><button onClick={()=>{setQuery(s);send(s)}} key={s}>{s}</button>)}</div><div className="chat-input"><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask ShopMind anything..."/><button onClick={()=>send()}><Send size={17}/></button></div></div><div className="tool-panel"><div className="eyebrow">AGENT CAPABILITIES</div><h3>Built to take action.</h3><p>ShopMind does more than answer. It connects to tools and uses memory to complete support tasks.</p>{[['Tool Calling','Product search, order lookup, returns'],['Memory','Preferences and previous purchases'],['Grounded answers','Consistent policy-based responses']].map(([a,b])=><div className="capability" key={a}><div className="feature-icon"><Sparkles size={17}/></div><div><b>{a}</b><small>{b}</small></div></div>)}</div></div></>}
function Products(){return <><PageHeader eyebrow="PRODUCTS" title="Find the right product." sub="Search a demo catalog powered by AI recommendations."/><div className="searchbar"><Search/><input placeholder="Search products, categories, or features..."/><button>Search</button></div><div className="product-grid">{products.map(p=><div className="product-card" key={p.name}><div className="product-image"><img src={p.image}/></div><div className="product-info"><small>{p.category}</small><h3>{p.name}</h3><div><span><Star size={14} fill="currentColor"/> {p.rating}</span><strong>{p.price}</strong></div></div></div>)}</div></>}
function Orders({navigate}:{navigate:(p:Page)=>void}){return <><PageHeader eyebrow="ORDERS" title="Order intelligence." sub="Track orders and provide clear delivery updates."/><div className="panel order-panel"><div className="order-main"><div className="order-product"><img src="/assets/product-laptop.svg"/><div><small>Order #EC-2048</small><h2>NovaBook Pro 14</h2><p>Placed on 04 Sep 2026 • ₹48,999</p></div></div><span className="order-status"><Truck size={15}/> Out for delivery</span></div><div className="timeline">{['Order placed','Packed','Shipped','Out for delivery','Delivered'].map((x,i)=><div className={i<4?'timeline-item done':'timeline-item'} key={x}><span>{i<4?<CheckCircle2/>:<Clock3/>}</span><b>{x}</b><small>{i<4?'Completed':'Expected today'}</small></div>)}</div><div className="order-footer"><span><b>Estimated delivery</b>Today, 4:00 PM – 7:00 PM</span><button className="primary" onClick={()=>navigate('chat')}>Contact support <MessageCircle size={16}/></button></div></div></>}
function Returns(){return <><PageHeader eyebrow="RETURNS & REFUNDS" title="Make returns simple." sub="Guide customers through a transparent return and refund experience."/><div className="two-col"><div className="panel"><h3>Start a return</h3><p className="muted">Choose an order and tell us why you need to return it.</p><label>Order</label><select><option>#EC-2048 • NovaBook Pro 14</option></select><label>Reason for return</label><select><option>Product is damaged</option><option>Wrong item received</option><option>Changed my mind</option></select><label>Additional details</label><textarea placeholder="Tell us more..."></textarea><button className="primary full">Submit return request <ArrowRight size={16}/></button></div><div className="panel"><div className="panel-head"><div><h3>Refund status</h3><p>Latest customer request</p></div><RotateCcw/></div><div className="refund-card"><span className="status-dot"></span><div><b>Refund initiated</b><p>Order #EC-1921 • ₹2,499</p></div><strong>3–5 days</strong></div><div className="policy"><ShieldCheck/><div><b>Return policy</b><p>Eligible products can be returned within 7 days of delivery. Refunds are sent to the original payment method after inspection.</p></div></div></div></div></>}
function Memory(){return <><PageHeader eyebrow="CUSTOMER MEMORY" title="Context that carries forward." sub="A transparent view of the information ShopMind remembers to personalize support."/><div className="memory-grid"><div className="panel"><div className="panel-head"><div><h3>Customer preferences</h3><p>Saved with consent</p></div><BrainCircuit/></div>{['Prefers laptops under ₹50,000','Interested in productivity devices','Prefers email updates','Last purchase: Audio accessories'].map(x=><div className="memory-row" key={x}><CheckCircle2 size={16}/><span>{x}</span></div>)}</div><div className="panel"><div className="panel-head"><div><h3>Recent context</h3><p>Used to improve answers</p></div><MessageCircle/></div>{['Asked about NovaBook delivery','Compared two laptop models','Requested a return policy'].map((x,i)=><div className="memory-row" key={x}><span className="memory-number">0{i+1}</span><span>{x}</span><small>{i+1} day ago</small></div>)}</div></div></>}
function About(){return <><PageHeader eyebrow="ABOUT PROJECT" title="The intelligence behind support." sub="A college project demonstrating AI agents, tool calling, and memory in e-commerce."/><div className="about-hero"><div><div className="eyebrow">PROJECT OBJECTIVE</div><h2>Turn support conversations into helpful actions.</h2><p>ShopMind is designed to reduce repetitive support work while giving customers fast, contextual, and transparent assistance.</p></div><div className="architecture"><div className="arch-node"><Bot/> AI Agent</div><ArrowRight/><div className="arch-node"><Zap/> Tools</div><ArrowRight/><div className="arch-node"><BrainCircuit/> Memory</div></div></div><div className="about-cards"><div className="panel"><h3>Key capabilities</h3><p>RAG-ready responses, product search, order lookup, return workflows, recommendations, and customer memory.</p></div><div className="panel"><h3>Technology stack</h3><p>React, TypeScript, Vite, Tailwind-inspired CSS, Lucide icons, and local mock data.</p></div><div className="panel"><h3>Future enhancements</h3><p>Connect real APIs, add authentication, integrate a vector database, and deploy a production agent backend.</p></div></div></>}
createRoot(document.getElementById('root')!).render(<App/>)
