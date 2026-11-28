import{j as e,r as g}from"./vendor-react-BitYOay7.js";import{H as u}from"./vendor-inertia-CdEzcY59.js";import{A as w}from"./AppLayout-BAuNRAvz.js";import"./AppFooter-Df-4ZdKK.js";import"./FlashToast-CL3kjnck.js";import"./vendor-lucide-DtFTXs1D.js";import"./useRealtimeSync-D_6SPYxN.js";const f=String.raw`
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@500;600;700;800;900&family=Great+Vibes&family=Playfair+Display:wght@600;700;800&display=swap');

/* Scoped to .ew-page to avoid changing the rest of the INFINITE website. */
.ew-page { --ew-navy:#101b31; --ew-ink:#17263b; --ew-teal:#12bbb0; --ew-tint:#f5fafb; font-family:'Barlow',Arial,sans-serif; color:var(--ew-ink); background:#fbfcfd; margin:0; overflow:hidden; }
.ew-page *, .ew-page *::before, .ew-page *::after { box-sizing:border-box; }
.ew-page a { color:inherit; text-decoration:none; }
.ew-page button,.ew-page input,.ew-page select,.ew-page textarea { font:inherit; }
.ew-page button,.ew-page a { -webkit-tap-highlight-color:transparent; }
.ew-page button:focus-visible,.ew-page a:focus-visible,.ew-page input:focus-visible,.ew-page select:focus-visible,.ew-page textarea:focus-visible { outline:3px solid #16b8ae; outline-offset:4px; }
.ew-container { width:min(1280px,calc(100% - 64px)); margin-inline:auto; }
.ew-page h1,.ew-page h2,.ew-page h3,.ew-page p { margin-top:0; }
.ew-page img { display:block; max-width:100%; }
.ew-header { position:relative; z-index:25; background:#172136; color:#fff; border-bottom:1px solid rgba(255,255,255,.08); }
.ew-header-inner { min-height:80px; display:flex; align-items:center; gap:35px; justify-content:space-between; }
.ew-infinite-logo { display:flex; flex-direction:column; line-height:.85; flex:none; letter-spacing:.5px; }
.ew-infinite-logo strong { font-family:'Barlow Condensed',Impact,sans-serif; font-weight:900; font-size:35px; letter-spacing:-.9px; }
.ew-infinite-logo strong span,.ew-footer-logo span { color:var(--ew-teal); }
.ew-infinite-logo small { font-family:'Barlow',sans-serif; color:var(--ew-teal); font-size:10px; font-weight:800; letter-spacing:3.6px; margin-top:8px; }
.ew-nav { display:flex; align-items:center; justify-content:center; flex:1; gap:clamp(13px,1.8vw,27px); }
.ew-nav a { padding:10px 0; color:#e8ecf2; font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1.3px; position:relative; white-space:nowrap; transition:color .2s; }
.ew-nav a:hover,.ew-nav a.is-active { color:#48e0d3; }
.ew-nav a.is-active:after { content:''; position:absolute; height:2px; background:var(--ew-teal); left:0; right:0; bottom:1px; }
.ew-header-actions { display:flex; align-items:center; gap:10px; flex:none; }
.ew-header-actions a { font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:.8px; }
.ew-login { display:inline-flex; align-items:center; justify-content:center; min-width:82px; min-height:35px; padding:7px 18px; border:1px solid rgba(255,255,255,.3); border-radius:60px; background:rgba(255,255,255,.06); }
.ew-join { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:9px 18px; min-height:35px; border-radius:60px; background:#11bdb2; color:#fff; transition:background .2s,transform .2s; }
.ew-join:hover,.ew-op-button:hover { background:#079e96; transform:translateY(-1px); }
.ew-menu-toggle,.ew-mobile-actions { display:none; }

/* Dark O'LAMOUR-inspired hero, but with EU WELLNESS identity. */
.ew-hero { min-height:525px; position:relative; display:flex; align-items:center; justify-content:center; text-align:center; color:#fff; isolation:isolate; background:#111e36; }
.ew-hero::before { content:''; position:absolute; z-index:-2; inset:0; background-image:linear-gradient(90deg,rgba(11,27,45,.93),rgba(10,21,39,.73) 30%,rgba(10,21,39,.77) 70%,rgba(11,25,44,.92)); background-size:cover; background-position:center 46%; opacity:.9; }
.ew-hero::after { content:''; position:absolute; z-index:-1; inset:0; background:linear-gradient(180deg,rgba(12,24,44,.12),rgba(12,24,44,.12) 55%,rgba(12,24,44,.55)); }
.ew-hero-glow { position:absolute; pointer-events:none; width:350px; height:350px; opacity:.24; filter:blur(55px); border-radius:50%; }
.ew-hero-glow-left { background:#05797e; left:-190px; top:-140px; }
.ew-hero-glow-right { background:#b59a2c; right:-230px; bottom:-120px; }
.ew-hero-content { display:flex; flex-direction:column; align-items:center; padding-block:52px 60px; }
.ew-eyebrow { display:inline-flex; align-items:center; gap:9px; border:1px solid rgba(32,222,201,.42); background:rgba(19,138,138,.14); border-radius:100px; padding:8px 19px; color:#67e9da; letter-spacing:2px; font-size:11px; font-weight:800; text-transform:uppercase; }
.ew-eyebrow span { width:7px; height:7px; border-radius:50%; background:#38dcce; box-shadow:0 0 8px #38dcce; }
.ew-hero-script { font-family:'Great Vibes','Brush Script MT',cursive; font-size:clamp(55px,7.5vw,102px); line-height:1.2; color:#35e7d5; margin-top:15px; text-shadow:0 0 25px rgba(12,224,205,.16); font-weight:400; transform:rotate(-2deg); }
.ew-hero h1 { font-family:'Barlow Condensed',Impact,sans-serif; font-weight:900; font-size:clamp(76px,10vw,150px); text-transform:uppercase; letter-spacing:2px; line-height:.91; margin:2px 0 30px; text-shadow:0 6px 32px rgba(3,12,20,.4); }
.ew-hero p { max-width:710px; font-size:clamp(15px,1.55vw,20px); line-height:1.7; font-weight:500; margin-bottom:32px; color:#f0f3fa; }
.ew-outline-btn { border:1.5px solid #fff; min-height:48px; padding:10px 24px; border-radius:100px; display:inline-flex; align-items:center; justify-content:center; gap:16px; color:white; font-weight:700; transition:background .2s,transform .2s; }
.ew-outline-btn:hover { background:rgba(255,255,255,.12); transform:translateY(-2px); }

/* Second image-led banner and quality strip */
.ew-intro { position:relative; overflow:hidden; background:linear-gradient(115deg,#f6e8db 1%,#fffaf7 41%,#e9f2e7 100%); padding:42px 0 34px; }
.ew-intro::before,.ew-intro::after { content:'❧'; position:absolute; color:#7a9958; opacity:.3; font-family:Georgia,serif; font-size:240px; pointer-events:none; }
.ew-intro::before { left:-45px; top:-65px; transform:rotate(16deg); }
.ew-intro::after { right:-35px; top:80px; transform:rotate(-16deg); }
.ew-intro-inner { position:relative; z-index:1; text-align:center; }
.ew-brandmark { font-size:24px; letter-spacing:1.5px; font-weight:900; color:#16366b; margin-bottom:9px; }
.ew-brandmark span { color:#af9234; font-size:17px; vertical-align:top; }
.ew-intro h2 { font-family:'Playfair Display',Georgia,serif; font-weight:800; color:#142b54; font-size:clamp(29px,3.5vw,49px); line-height:1.13; margin-bottom:13px; }
.ew-intro-sub { display:inline-block; padding:9px 27px; background:rgba(243,220,187,.77); border-radius:50px; font-weight:700; color:#2a3550; margin-bottom:0; }
.ew-intro-lineup { width:min(100%,1200px); height:auto; margin:26px auto 0; mix-blend-mode:multiply; border-radius:13px 13px 0 0; }
.ew-quality-strip { margin:-1px auto 0; position:relative; display:grid; grid-template-columns:repeat(5,1fr); border-radius:18px; overflow:hidden; background:rgba(255,255,255,.94); box-shadow:0 8px 22px rgba(24,34,35,.13); border:1px solid rgba(158,128,92,.18); }
.ew-quality-item { min-height:90px; display:flex; align-items:center; justify-content:center; gap:10px; padding:14px 16px; font-size:13px; line-height:1.2; text-align:left; font-weight:800; color:#233048; position:relative; }
.ew-quality-item+.ew-quality-item::before { content:''; height:40px; position:absolute; left:0; width:1px; background:#d6d3d1; }
.ew-quality-icon { color:#087f6d; flex:none; display:grid; place-items:center; height:40px; width:40px; border-radius:50%; background:#e4f4eb; }
.ew-quality-item:nth-child(2) .ew-quality-icon { color:#8b3496; background:#f8eafd; }
.ew-quality-item:nth-child(3) .ew-quality-icon { color:#235aa6; background:#e8f1ff; }
.ew-quality-item:nth-child(n+4) .ew-quality-icon { color:#21415f; background:#edf1f4; }

/* Alternating products */
.ew-products { display:flex; flex-direction:column; gap:28px; padding-top:48px; padding-bottom:10px; scroll-margin-top:30px; }
.ew-product { --ew-accent:#13bbae; --ew-soft:#f6f8fb; --ew-dark:#07463f; display:grid; grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr); gap:clamp(22px,3vw,47px); align-items:stretch; background:linear-gradient(120deg,#fff 0%,#fff 55%,var(--ew-soft) 100%); border-radius:23px; padding:17px; border:1px solid #eaecef; box-shadow:0 8px 23px rgba(24,39,61,.055); min-height:320px; }
.ew-product.is-reversed { grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr); background:linear-gradient(120deg,var(--ew-soft) 0%,#fff 50%,#fff 100%); }
.ew-product.is-reversed .ew-product-media { grid-column:2; grid-row:1; }
.ew-product.is-reversed .ew-product-information { grid-column:1; grid-row:1; }
.ew-product-media { position:relative; border-radius:17px; overflow:hidden; min-height:265px; display:flex; align-items:stretch; background:var(--ew-soft); }
.ew-product-media img { width:100%; height:100%; object-fit:cover; object-position:center; transition:transform .4s ease; }
.ew-product:hover .ew-product-media img { transform:scale(1.03); }
.ew-photo-label { position:absolute; left:14px; top:13px; border-radius:100px; padding:5px 12px; font-size:9px; letter-spacing:1.3px; color:#1d3952; background:rgba(255,255,255,.86); backdrop-filter:blur(3px); font-weight:900; }
.ew-product-information { min-width:0; display:flex; flex-direction:column; justify-content:center; padding:4px 6px 0 0; }
.ew-product-topline { display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
.ew-small-brand { font-size:10px; font-weight:900; letter-spacing:1.2px; text-transform:uppercase; color:#24617f; }
.ew-product-counter { font-size:11px; letter-spacing:1px; color:#9da7b2; font-weight:700; }
.ew-product-heading { display:flex; align-items:center; gap:16px; margin-bottom:7px; }
.ew-product-heading h3 { color:var(--ew-dark); font:900 clamp(28px,3vw,46px)/1 'Barlow Condensed',Impact,sans-serif; letter-spacing:.1px; white-space:nowrap; margin:0; }
.ew-product-alpha-kids .ew-product-heading h3 { background:linear-gradient(90deg,#2c9b56,#15add5,#e43d8d); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.ew-audience { font-weight:800; line-height:1.17; font-size:clamp(12px,1vw,15px); border-left:1px solid #c2cbd3; padding-left:15px; }
.ew-product-description { font-size:13px; line-height:1.45; font-weight:500; color:#506274; margin-bottom:13px; }
.ew-feature-grid { display:grid; grid-template-columns:minmax(125px,.78fr) minmax(0,1.6fr); gap:15px; }
.ew-ingredients,.ew-benefits { position:relative; border-radius:13px; background:rgba(246,247,251,.9); border:1px solid rgba(36,51,80,.05); padding:18px 12px 12px; min-width:0; }
.ew-ingredients { background:linear-gradient(145deg,var(--ew-soft),#fff); }
.ew-section-pill { position:absolute; top:-10px; left:12px; padding:4px 13px; border-radius:100px; background:linear-gradient(180deg,#ffe78a,#f9c53e); color:#24304b; font-size:11px; font-weight:900; box-shadow:0 3px 8px rgba(86,67,12,.08); white-space:nowrap; }
.ew-section-pill.ew-purple { background:linear-gradient(90deg,#7939b8,#aa31ba); color:#fff; left:50%; transform:translateX(-50%); }
.ew-ingredients ul { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); column-gap:6px; row-gap:5px; }
.ew-ingredients li { font-size:11.2px; font-weight:700; line-height:1.2; display:flex; align-items:flex-start; gap:4px; }
.ew-ingredients li svg { flex:none; color:#13a78f; stroke-width:3; margin-top:0; }
.ew-benefit-grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); align-items:start; gap:5px; }
.ew-benefit { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; min-width:0; color:#132940; text-align:center; line-height:1.18; font-size:10.5px; font-weight:800; }
.ew-benefit-icon { display:grid; place-items:center; color:var(--ew-accent); height:31px; }
.ew-benefit:nth-child(2) .ew-benefit-icon { color:#dc7624; }
.ew-benefit:nth-child(3) .ew-benefit-icon { color:#9134c9; }
.ew-benefit:nth-child(4) .ew-benefit-icon { color:#19a5bb; }
.ew-benefit:nth-child(5) .ew-benefit-icon { color:#f6b800; }
.ew-product-footer { margin-top:13px; display:flex; align-items:center; flex-wrap:wrap; gap:8px; font-size:9px; font-weight:800; color:#4a5b68; text-transform:uppercase; letter-spacing:.3px; }
.ew-product-footer>span:not(:first-child) { padding-left:8px; border-left:1px solid #cfd5da; }
.ew-quality-pill { align-items:center; display:inline-flex; gap:6px; border-radius:100px; color:#fff; background:var(--ew-accent); padding:7px 12px; font-size:10px; letter-spacing:0; text-transform:none; box-shadow:0 4px 9px rgba(34,27,27,.08); }

/* Product comparison */
.ew-comparison { padding-top:42px; padding-bottom:48px; text-align:center; }
.ew-section-heading { display:flex; align-items:center; justify-content:center; gap:18px; }
.ew-section-heading>span { background:#a8b1bf; height:1px; width:min(120px,15%); }
.ew-section-heading h2 { font:800 clamp(25px,3vw,39px)/1.23 'Playfair Display',Georgia,serif; color:#182d4b; margin:0; }
.ew-comparison>p:not(.ew-disclaimer) { font-size:14px; color:#6b7785; margin:11px 0 26px; }
.ew-table-scroll { overflow-x:auto; border:1px solid #e3e8ed; border-radius:17px; box-shadow:0 9px 24px rgba(25,43,58,.055); background:#fff; }
.ew-table-scroll table { border-collapse:separate; border-spacing:0; min-width:850px; width:100%; table-layout:fixed; text-align:left; }
.ew-table-scroll th,.ew-table-scroll td { padding:15px 12px; font-size:12px; line-height:1.35; border-right:1px solid #e9edf2; border-bottom:1px solid #e9edf2; vertical-align:top; }
.ew-table-scroll tr>*:last-child { border-right:none; }
.ew-table-scroll tbody tr:last-child>* { border-bottom:none; }
.ew-table-scroll thead th { padding:0; background:#fff; }
.ew-table-scroll thead th:first-child { background:#f3f6f9; padding:14px; color:#344a5f; vertical-align:middle; font-size:13px; }
.ew-table-product { display:block; background:var(--ew-accent); color:#fff; text-transform:uppercase; text-align:center; padding:14px 5px; font-size:13px; font-weight:900; }
.ew-table-scroll tbody th { font-weight:900; color:#294056; background:#f5f7f9; }
.ew-table-scroll tbody td { color:#35465a; background:#fff; font-weight:600; }
.ew-disclaimer { color:#647182; font-style:italic; font-size:12px; margin:16px 0 0; }

/* Unchanged two-part bottom structure: business opportunity, then contact footer. */
.ew-opportunity { background:linear-gradient(110deg,#0a1428,#0d2d45 50%,#08192b); color:#fff; position:relative; overflow:hidden; }
.ew-opportunity::after { content:''; position:absolute; right:-120px; top:-150px; height:400px; width:400px; border-radius:50%; background:#0a857c; opacity:.12; filter:blur(70px); }
.ew-opportunity-inner { position:relative; min-height:228px; display:grid; grid-template-columns:310px minmax(0,1fr) auto; align-items:center; gap:35px; }
.ew-op-globe { width:280px; height:280px; position:relative; border-radius:50%; margin-bottom:-125px; align-self:end; background:radial-gradient(circle at 42% 44%,rgba(40,161,229,.42),rgba(7,46,100,.28) 38%,rgba(0,15,45,.35) 70%),repeating-radial-gradient(circle at 50% 52%,transparent 0 27px,rgba(24,164,233,.35) 28px 30px); box-shadow:0 -15px 62px rgba(31,136,222,.29); border:2px solid rgba(37,180,238,.52); transform:rotate(-16deg); }
.ew-op-globe::before,.ew-op-globe::after { content:''; position:absolute; border:1px solid rgba(90,199,238,.65); border-radius:50%; width:36%; height:100%; left:32%; top:0; }
.ew-op-globe::after { width:100%; height:33%; left:0; top:33%; transform:rotate(5deg); }
.ew-globe-outline { position:absolute; inset:9% 0; background:radial-gradient(ellipse at 47% 50%,rgba(245,188,78,.7) 1px,transparent 2px); background-size:13px 13px; clip-path:polygon(19% 11%,32% 4%,46% 12%,50% 32%,64% 37%,66% 59%,51% 68%,49% 87%,32% 95%,29% 76%,15% 62%); opacity:.8; }
.ew-op-copy { padding-block:34px; }
.ew-op-copy>span { text-transform:uppercase; color:#fac141; font-size:12px; font-weight:900; letter-spacing:1.8px; }
.ew-op-copy h2 { margin:4px 0 7px; font:900 clamp(32px,4vw,52px)/.95 'Barlow Condensed',Impact,sans-serif; color:#fff; }
.ew-op-copy h2 em { color:#25d5c7; font-style:normal; }
.ew-op-copy p { color:#a6bfd2; font-size:14px; line-height:1.4; max-width:450px; margin:0; }
.ew-op-button { display:flex; align-items:center; gap:12px; justify-content:center; min-height:46px; padding:13px 26px; color:#fff !important; font-weight:900; font-size:13px; border-radius:100px; background:#12bdae; text-transform:uppercase; transition:transform .2s,background .2s; white-space:nowrap; }
.ew-footer { background:#0e1629; color:#fff; padding:42px 0 18px; }
.ew-footer-content { display:grid; grid-template-columns:1fr 1.15fr; gap:clamp(60px,12vw,180px); align-items:center; padding-bottom:37px; }
.ew-footer-brand { padding-left:clamp(0px,4vw,45px); }
.ew-footer-logo { font:900 45px/1 'Barlow Condensed',Impact,sans-serif; letter-spacing:.7px; }
.ew-footer-brand p { color:#8192aa; line-height:1.7; font-size:14px; margin:16px 0 20px; }
.ew-socials { display:flex; gap:14px; font-size:22px; align-items:center; color:#f2f6f8; }
.ew-socials span { display:inline-flex; min-width:22px; height:26px; align-items:center; justify-content:center; }
.ew-contact { max-width:530px; width:100%; padding:27px 32px 30px; background:#fff; border-radius:15px; box-shadow:0 20px 45px rgba(0,0,0,.17); color:#14253a; }
.ew-contact h2 { font-size:23px; margin-bottom:4px; font-weight:900; }
.ew-contact>p { color:#84919d; font-size:12px; margin-bottom:17px; }
.ew-contact-fields { display:grid; gap:11px; }
.ew-contact label>span { position:absolute; height:1px; width:1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; }
.ew-contact input,.ew-contact select,.ew-contact textarea { display:block; width:100%; border:1px solid #eff0f2; background:#f5f7fa; border-radius:6px; padding:12px 14px; font-size:13px; outline:none; color:#1d3449; transition:border-color .2s,box-shadow .2s; }
.ew-contact textarea { resize:vertical; min-height:103px; }
.ew-contact input:focus,.ew-contact select:focus,.ew-contact textarea:focus { border-color:#11afa9; box-shadow:0 0 0 2px rgba(17,175,169,.1); }
.ew-honeypot { position:absolute; left:-99999px; width:1px; height:1px; overflow:hidden; }
.ew-contact button { margin-top:13px; width:100%; border:0; border-radius:6px; padding:12px 20px; background:#12bbae; color:white; display:flex; align-items:center; justify-content:center; gap:9px; cursor:pointer; font-size:13px; font-weight:900; transition:background .2s; }
.ew-contact button:hover { background:#0a9c94; }
.ew-contact button:disabled { cursor:wait; opacity:.68; }
.ew-contact .ew-form-status { margin:10px 0 0; font-size:12px; font-weight:700; }
.ew-contact .ew-form-status.error { color:#a72a2a; }
.ew-contact .ew-form-status.success { color:#168048; }
.ew-footer-bottom { display:flex; justify-content:space-between; padding-top:16px; color:#647690; font-size:11px; border-top:1px solid rgba(183,199,219,.11); }

@media (max-width:1150px) {
  .ew-container { width:min(1040px,calc(100% - 40px)); }
  .ew-header-inner { gap:20px; }
  .ew-nav { gap:13px; }
  .ew-nav a { font-size:10px; letter-spacing:.5px; }
  .ew-infinite-logo strong { font-size:30px; }
  .ew-product { gap:19px; }
  .ew-product-heading { align-items:flex-start; flex-wrap:wrap; gap:5px 12px; }
  .ew-audience { border-left:0; padding-left:0; }
  .ew-feature-grid { grid-template-columns:1fr 1.4fr; gap:8px; }
  .ew-benefit { font-size:9.5px; }
  .ew-benefit-icon svg { width:21px; height:21px; }
  .ew-opportunity-inner { grid-template-columns:235px 1fr auto; gap:16px; }
  .ew-op-globe { width:230px; height:230px; margin-bottom:-105px; }
}
@media (max-width:850px) {
  .ew-header-inner { min-height:68px; }
  .ew-menu-toggle { display:grid; place-items:center; border:1px solid rgba(255,255,255,.23); border-radius:8px; background:transparent; color:#fff; width:40px; height:38px; margin-left:auto; cursor:pointer; }
  .ew-nav { position:absolute; top:100%; left:0; right:0; background:#16233b; box-shadow:0 12px 24px rgba(0,0,0,.25); padding:13px 24px 24px; display:none; flex-direction:column; gap:1px; align-items:stretch; }
  .ew-nav.is-open { display:flex; }
  .ew-nav a { padding:11px 6px; font-size:12px; }
  .ew-nav a.is-active::after { width:70px; right:auto; bottom:4px; }
  .ew-header-actions { display:none; }
  .ew-mobile-actions { display:flex; gap:15px; margin-top:12px; }
  .ew-mobile-actions a:last-child { color:#22dbce; }
  .ew-hero { min-height:440px; }
  .ew-hero h1 { font-size:clamp(74px,13vw,110px); }
  .ew-hero-script { font-size:clamp(55px,9vw,82px); }
  .ew-product,.ew-product.is-reversed { grid-template-columns:1fr 1fr; gap:15px; min-height:0; }
  .ew-product-media { min-height:220px; }
  .ew-product-information { padding:3px 0; }
  .ew-product-heading h3 { font-size:32px; }
  .ew-feature-grid { grid-template-columns:1fr; gap:13px; }
  .ew-benefit-grid { gap:0; }
  .ew-ingredients ul { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .ew-ingredients li { font-size:10px; }
  .ew-benefit { font-size:9px; }
  .ew-product-footer { gap:4px 7px; }
  .ew-opportunity-inner { grid-template-columns:1fr auto; }
  .ew-op-globe { display:none; }
}
@media (max-width:650px) {
  .ew-container { width:calc(100% - 28px); }
  .ew-header-inner { min-height:63px; }
  .ew-infinite-logo strong { font-size:28px; }
  .ew-infinite-logo small { font-size:8px; letter-spacing:3px; }
  .ew-hero { min-height:445px; }
  .ew-hero-content { padding:50px 9px; }
  .ew-eyebrow { letter-spacing:1px; font-size:9px; padding:7px 10px; }
  .ew-hero-script { margin-top:24px; font-size:53px; }
  .ew-hero h1 { font-size:72px; margin-bottom:20px; }
  .ew-hero p { font-size:14px; line-height:1.6; }
  .ew-outline-btn { font-size:13px; }
  .ew-intro { padding:27px 0 22px; }
  .ew-brandmark { font-size:19px; }
  .ew-intro h2 { font-size:27px; }
  .ew-intro-sub { font-size:12px; padding:8px 11px; }
  .ew-intro-lineup { margin-top:20px; min-height:140px; object-fit:cover; object-position:50% 50%; }
  .ew-quality-strip { grid-template-columns:repeat(3,1fr); margin-top:9px; }
  .ew-quality-item { flex-direction:column; gap:4px; text-align:center; padding:10px 4px; font-size:9px; min-height:82px; }
  .ew-quality-item+.ew-quality-item::before { display:none; }
  .ew-quality-icon { width:31px; height:31px; }
  .ew-quality-icon svg { width:20px; height:20px; }
  .ew-products { gap:19px; padding-top:26px; }
  .ew-product,.ew-product.is-reversed { grid-template-columns:1fr; gap:13px; padding:9px 9px 15px; border-radius:18px; }
  .ew-product.is-reversed .ew-product-media,.ew-product.is-reversed .ew-product-information { grid-column:1; grid-row:auto; }
  .ew-product-media { min-height:0; aspect-ratio:2.24/1; border-radius:12px; }
  .ew-product-information { padding:0 7px; }
  .ew-product-heading { display:flex; gap:8px; align-items:center; }
  .ew-product-heading h3 { font-size:34px; }
  .ew-audience { font-size:12px; }
  .ew-product-description { margin-bottom:18px; font-size:12px; }
  .ew-feature-grid { grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr); }
  .ew-ingredients ul { grid-template-columns:1fr; }
  .ew-ingredients li { font-size:10px; }
  .ew-benefit-grid { grid-template-columns:repeat(3,1fr); row-gap:13px; }
  .ew-benefit { font-size:9.4px; }
  .ew-product-footer { font-size:8px; }
  .ew-quality-pill { font-size:9px; }
  .ew-comparison { padding:34px 0 36px; }
  .ew-section-heading h2 { font-size:24px; }
  .ew-comparison>p:not(.ew-disclaimer) { font-size:12px; }
  .ew-table-scroll th,.ew-table-scroll td { font-size:11px; padding:11px 9px; }
  .ew-opportunity-inner { display:flex; flex-direction:column; align-items:flex-start; gap:0; padding-bottom:27px; }
  .ew-op-copy { padding:28px 0 15px; }
  .ew-op-copy h2 { font-size:44px; }
  .ew-op-button { min-height:42px; }
  .ew-footer { padding-top:34px; }
  .ew-footer-content { grid-template-columns:1fr; gap:26px; }
  .ew-footer-brand { padding-left:0; }
  .ew-contact { max-width:none; padding:23px 21px; }
  .ew-footer-bottom { display:flex; flex-direction:column; gap:5px; }
}
@media (prefers-reduced-motion:reduce) { .ew-page *, .ew-page *::before, .ew-page *::after { transition:none !important; scroll-behavior:auto !important; } }


/* Refined 2026 design: global header/footer are rendered by AppLayout (as in Barley.jsx). */
.ew-page { background:#f7f9fc; }
.ew-page .ew-hero { min-height:590px; background:#0f1b30; }
.ew-page .ew-hero-content { padding-block:105px 100px; }
.ew-page .ew-hero h1 { font-size:clamp(68px,9vw,128px); letter-spacing:3px; margin-bottom:22px; }
.ew-page .ew-hero-script { font-size:clamp(50px,7vw,85px); }
.ew-page .ew-hero p { max-width:650px; }
.ew-page .ew-intro { padding-block:75px 65px; background:linear-gradient(130deg,#f9f2ea,#fffaf6 42%,#eaf6f3); }
.ew-page .ew-intro-lineup { max-height:420px; object-fit:contain; mix-blend-mode:normal; }
.ew-page .ew-quality-strip { margin-top:24px; border-radius:16px; }
.ew-page .ew-products { gap:32px; padding-top:78px; padding-bottom:38px; }
.ew-page .ew-product { padding:22px; gap:clamp(22px,3.3vw,55px); min-height:370px; border-radius:24px; box-shadow:0 14px 40px rgba(18,40,65,.065); }
.ew-page .ew-product-media { border-radius:17px; min-height:305px; }
.ew-page .ew-product-information { padding:18px 10px 12px 0; }
.ew-page .ew-product-heading h3 { font-size:clamp(32px,3.4vw,48px); }
.ew-page .ew-product-description { font-size:15px; line-height:1.65; margin-bottom:22px; }
.ew-page .ew-ingredients,.ew-page .ew-benefits { padding:22px 14px 16px; }
.ew-page .ew-ingredients li { font-size:12px; line-height:1.45; }
.ew-page .ew-benefit { font-size:11px; line-height:1.3; }
.ew-page .ew-product-footer { margin-top:22px; }
.ew-page .ew-comparison { padding-block:70px 85px; }
.ew-page .ew-opportunity-inner { min-height:240px; }
.ew-contact-section { padding:85px 0; background:linear-gradient(115deg,#eff8f8,#f7f9fc 55%,#e9f2f6); }
.ew-contact-layout { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); align-items:center; gap:clamp(35px,6vw,100px); }
.ew-contact-intro { max-width:470px; }
.ew-contact-eyebrow { color:#0b9d94; font-size:12px; font-weight:900; letter-spacing:2px; }
.ew-contact-intro h2 { color:#122743; font:800 clamp(33px,4vw,54px)/1.1 'Playfair Display',Georgia,serif; margin:15px 0 22px; }
.ew-contact-intro h2 em { color:#0eada3; font-style:normal; }
.ew-contact-intro p { font-size:16px; color:#657489; line-height:1.8; }
.ew-contact-join { display:inline-flex; align-items:center; gap:10px; margin-top:12px; font-weight:800; color:#087f79!important; }
.ew-contact-section .ew-contact { max-width:none; box-shadow:0 18px 50px rgba(14,38,57,.1); padding:34px; }
@media (max-width:850px) { .ew-contact-layout { grid-template-columns:1fr; } .ew-contact-intro { max-width:650px; } .ew-page .ew-products { padding-top:45px; } .ew-page .ew-product { min-height:0; padding:14px; } .ew-page .ew-product-information { padding:10px 4px; } }
@media (max-width:650px) { .ew-page .ew-hero { min-height:450px; } .ew-page .ew-hero-content { padding:70px 8px; } .ew-page .ew-hero h1 { font-size:clamp(54px,13vw,78px); } .ew-page .ew-intro { padding-block:40px; } .ew-page .ew-products { gap:20px; } .ew-page .ew-product { padding:10px; } .ew-page .ew-product-media { min-height:0; } .ew-page .ew-product-information { padding:12px 7px; } .ew-page .ew-product-description { font-size:13px; } .ew-page .ew-benefit { font-size:9px; } .ew-page .ew-comparison { padding-block:42px; } .ew-contact-section { padding:55px 0; } .ew-contact-section .ew-contact { padding:24px 18px; } }

/* Interactive MOCHI-inspired product catalogue; scoped to EU Wellness. */
.ew-catalogue { padding:85px 0 90px; scroll-margin-top:80px; }
.ew-catalogue-heading { text-align:center; margin-bottom:28px; }
.ew-catalogue-heading .ew-kicker { color:#087f7a; font-size:12px; letter-spacing:2.6px; font-weight:900; }
.ew-catalogue-heading h2 { font:900 clamp(36px,5vw,64px)/1.04 'Barlow Condensed',Impact,sans-serif; color:#13243c; margin:12px 0; }
.ew-catalogue-heading p { color:#617086; max-width:620px; margin:0 auto; line-height:1.6; }
.ew-showcase { --ew-showcase-accent:#f28026; --ew-showcase-soft:#fff2e9; --ew-showcase-dark:#81360a; position:relative; overflow:hidden; border-radius:28px; background:linear-gradient(120deg,#111a2c 0%,#1b2537 54%,#263043 100%); color:#fff; box-shadow:0 24px 55px rgba(16,27,49,.15); }
.ew-showcase::before { content:''; position:absolute; width:550px; height:550px; right:-150px; top:-170px; border-radius:50%; background:var(--ew-showcase-accent); opacity:.16; filter:blur(80px); transition:background .5s; }
.ew-showcase::after { content:''; position:absolute; width:350px; height:350px; left:-180px; bottom:-200px; border-radius:50%; background:var(--ew-showcase-accent); opacity:.12; filter:blur(65px); }
.ew-showcase-body { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.05fr) minmax(0,.95fr); align-items:center; min-height:510px; padding:46px 40px 30px; gap:26px; position:relative; z-index:1; }
.ew-showcase-copy { min-width:0; }
.ew-showcase-label { display:inline-flex; padding:8px 13px; border-radius:30px; border:1px solid rgba(255,255,255,.28); font-size:10px; font-weight:800; letter-spacing:1.6px; color:#a6f1e7; }
.ew-showcase-name { font:900 clamp(56px,6vw,100px)/.9 'Barlow Condensed',Impact,sans-serif; letter-spacing:-1px; margin:24px 0 18px; overflow-wrap:anywhere; }
.ew-showcase-audience { font-size:15px; font-weight:800; color:#fff; margin-bottom:12px; }
.ew-showcase-desc { font-size:14px; line-height:1.75; color:#c7d0df; margin-bottom:24px; }
.ew-showcase-switcher-label { font-size:10px; font-weight:900; letter-spacing:2px; color:#90a4b8; margin-bottom:10px; }
.ew-showcase-thumbs { display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:6px; }
.ew-showcase-thumb { display:grid; place-items:center; padding:8px 2px; border:1px solid rgba(255,255,255,.18); border-radius:10px; background:rgba(255,255,255,.065); color:#e9edf4; cursor:pointer; font-size:9px; font-weight:800; transition:transform .2s,border-color .2s,background .2s; }
.ew-showcase-thumb:hover { transform:translateY(-3px); border-color:var(--ew-showcase-accent); }
.ew-showcase-thumb.is-active { background:var(--ew-showcase-accent); border-color:var(--ew-showcase-accent); color:#fff; }
.ew-showcase-thumb img { height:42px; width:100%; object-fit:contain; border-radius:4px; margin-bottom:6px; }
.ew-showcase-media { position:relative; display:flex; justify-content:center; align-items:center; min-height:400px; }
.ew-showcase-halo { position:absolute; width:95%; aspect-ratio:1; border-radius:50%; background:radial-gradient(circle,var(--ew-showcase-accent),transparent 69%); opacity:.32; filter:blur(28px); transition:background .4s; }
.ew-showcase-photo { width:100%; max-width:430px; max-height:440px; object-fit:contain; position:relative; border-radius:20px; box-shadow:0 24px 45px rgba(0,0,0,.2); }
.ew-showcase-details { align-self:center; padding:25px 23px; border:1px solid rgba(255,255,255,.13); border-radius:20px; background:rgba(255,255,255,.075); backdrop-filter:blur(10px); }
.ew-showcase-details h3 { font-size:14px; font-weight:900; letter-spacing:1px; text-transform:uppercase; margin:0 0 13px; color:#fff; }
.ew-showcase-details ul { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:9px; list-style:none; padding:0; margin:0 0 24px; }
.ew-showcase-details li { display:flex; gap:6px; font-size:12px; line-height:1.3; color:#dce4ed; }
.ew-showcase-details li svg { color:#6be4d2; flex-shrink:0; }
.ew-showcase-benefits { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
.ew-showcase-benefit { display:flex; align-items:center; gap:8px; font-size:11px; color:#e8edf3; font-weight:700; }
.ew-showcase-benefit svg { color:#65e1d1; flex:none; }
.ew-showcase-controls { position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; gap:12px; padding:15px 40px 23px; border-top:1px solid rgba(255,255,255,.1); }
.ew-showcase-controls button { display:inline-flex; align-items:center; gap:10px; background:transparent; border:1px solid rgba(255,255,255,.28); border-radius:30px; color:#fff; padding:10px 18px; cursor:pointer; font-size:12px; font-weight:800; }
.ew-showcase-controls button:hover { background:rgba(255,255,255,.12); }
.ew-showcase-count { color:#c1ccda; font-size:12px; font-weight:800; letter-spacing:2px; }
.ew-showcase-animate { animation:ew-catalogue-enter .46s cubic-bezier(.2,.7,.2,1) both; }
@keyframes ew-catalogue-enter { from { opacity:0; transform:translateY(16px) scale(.985); } to { opacity:1; transform:translateY(0) scale(1); } }
@media(max-width:1100px) { .ew-showcase-body { grid-template-columns:1fr 1fr; padding:32px; } .ew-showcase-copy { grid-column:1; } .ew-showcase-media { grid-column:2; } .ew-showcase-details { grid-column:1/-1; display:grid; grid-template-columns:1fr 1fr; gap:12px 25px; } .ew-showcase-details h3:nth-of-type(2) { grid-column:2; grid-row:1; } .ew-showcase-details ul { grid-column:1; grid-row:2; margin-bottom:0; } .ew-showcase-benefits { grid-column:2; grid-row:2; } }
@media(max-width:650px) { .ew-catalogue { padding:45px 0; } .ew-showcase { border-radius:18px; } .ew-showcase-body { grid-template-columns:1fr; padding:25px 18px; gap:12px; } .ew-showcase-copy,.ew-showcase-media,.ew-showcase-details { grid-column:1; } .ew-showcase-name { font-size:clamp(52px,13vw,82px); } .ew-showcase-media { min-height:240px; } .ew-showcase-photo { max-height:290px; } .ew-showcase-details { display:block; padding:19px; } .ew-showcase-details h3:nth-of-type(2) { margin-top:20px; } .ew-showcase-details ul { margin-bottom:16px; } .ew-showcase-thumbs { grid-template-columns:repeat(3,1fr); } .ew-showcase-controls { padding:15px 18px 22px; } }
@media(prefers-reduced-motion:reduce) { .ew-showcase-animate { animation:none; } }


.ew-poster-catalogue{padding:70px 0;scroll-margin-top:80px}
.ew-poster{border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 15px 50px #1d32401a}
.ew-poster-tabs{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px;padding:12px 12px 0;background:#fff}
.ew-poster-tab{border:0;border-radius:12px 12px 0 0;background:#f8f8f8;display:flex;flex-direction:column;align-items:center;gap:7px;padding:10px 2px 0;cursor:pointer;opacity:.73;transition:transform .25s,opacity .25s}
.ew-poster-tab:hover{transform:translateY(-4px);opacity:1}.ew-poster-tab.selected{opacity:1;background:#fff4e8;box-shadow:inset 0 3px var(--tab-accent)}
.ew-poster-tab img{height:82px;width:100%;object-fit:contain;border-radius:8px}
.ew-poster-tab strong{background:var(--tab-accent);color:white;font-size:clamp(10px,1.2vw,15px);padding:12px 2px;width:100%;text-align:center;border-radius:12px 12px 0 0}
.ew-poster-body{background:linear-gradient(180deg,var(--poster-soft),#fffaf5 55%,white);animation:ew-poster-change .55s cubic-bezier(.2,.8,.2,1) both}
@keyframes ew-poster-change{from{opacity:.2;transform:translateX(25px)}to{opacity:1;transform:translateX(0)}}
.ew-poster-banner{display:grid;grid-template-columns:1.2fr .8fr;align-items:center;gap:25px;background:linear-gradient(115deg,var(--poster-accent),var(--poster-soft));padding:36px 6%;min-height:290px}
.ew-poster-brand{display:inline-block;background:white;border-radius:50px;padding:7px 17px;font-size:12px;font-weight:900;color:#1b4564}
.ew-poster-banner h3{font:900 clamp(50px,7vw,98px)/.95 'Barlow Condensed',Impact,sans-serif;color:white;margin:20px 0 12px;text-shadow:0 3px 15px #0002}
.ew-poster-banner h4{font-size:clamp(18px,2.2vw,27px);font-weight:900;background:#fffe;border-radius:30px;display:inline-block;padding:9px 17px;color:#1c3551}
.ew-poster-banner p{font-size:16px;line-height:1.6;max-width:470px;font-weight:600;margin:15px 0;color:#24344a}
.ew-poster-banner img{width:100%;max-height:290px;object-fit:contain;border-radius:12px;filter:drop-shadow(0 14px 15px #0002)}
.ew-poster-middle{display:grid;grid-template-columns:.8fr 1.2fr;gap:30px;align-items:center;padding:35px 6%}
.ew-poster-bottle{background:radial-gradient(circle,var(--poster-soft) 0 55%,transparent 56%);display:grid;place-items:center;min-height:310px}
.ew-poster-bottle img{max-height:300px;max-width:100%;object-fit:contain;border-radius:12px}
.ew-poster-ingredients h4,.ew-poster-benefits h4{font-size:21px;font-weight:900;color:#19365b;background:#ffe18c;border-radius:50px;display:inline-block;padding:9px 24px;margin-bottom:22px}
.ew-poster-ingredients>div{display:grid;grid-template-columns:1fr 1fr;gap:15px}
.ew-poster-ingredients>div>div{display:flex;align-items:center;gap:11px;font-size:14px;line-height:1.35}
.ew-poster-ingredients span{display:grid;place-items:center;width:39px;height:39px;flex:none;border-radius:50%;background:var(--poster-accent);color:#fff;font-weight:900}
.ew-poster-benefits{background:#f2e5f7;border-radius:24px;margin:20px 5%;padding:20px;text-align:center}
.ew-poster-benefits h4{background:linear-gradient(90deg,#7a32a9,#b44dc2);color:white}
.ew-poster-benefits>div{display:grid;grid-template-columns:repeat(5,1fr)}
.ew-poster-benefits article{display:flex;flex-direction:column;align-items:center;gap:13px;padding:12px 10px;font-size:13px;line-height:1.3}
.ew-poster-benefits article+article{border-left:1px solid #d5c7e0}
.ew-poster-benefits svg{color:var(--poster-accent)}
.ew-poster-info{display:grid;grid-template-columns:1fr 1fr;gap:22px;padding:25px 6%}
.ew-poster-info article{padding:24px;border:1px solid #f1e7de;background:linear-gradient(130deg,white,var(--poster-soft));border-radius:18px}
.ew-poster-info span{color:var(--poster-accent);font-size:11px;font-weight:900;letter-spacing:1px}
.ew-poster-info h4{font-size:21px;color:#17365a;font-weight:900;margin:10px 0}
.ew-poster-info p{font-size:14px;line-height:1.6;color:#526072}.ew-poster-info small{color:#677687}
.ew-poster-quality{display:grid;grid-template-columns:1.3fr repeat(5,1fr);margin:0 5% 30px;border:1px solid #f0e3d7;border-radius:15px;overflow:hidden}
.ew-poster-quality>strong{background:var(--poster-accent);color:white;display:grid;place-items:center;text-align:center;padding:15px;font-size:13px}
.ew-poster-quality>span{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:14px 6px;font-size:11px;font-weight:800;text-align:center;border-left:1px solid #eee}
.ew-poster-controls{display:flex;justify-content:space-between;align-items:center;gap:12px;background:#15243b;color:white;padding:15px 22px}
.ew-poster-controls button{border:1px solid #fff7;background:transparent;color:white;padding:10px 16px;border-radius:30px;cursor:pointer;font-weight:800;font-size:12px}
.ew-poster-controls button:hover{background:white;color:#15243b}.ew-poster-controls span{font-size:12px;font-weight:800}
@media(max-width:700px){.ew-poster-tabs{grid-template-columns:repeat(3,1fr)}.ew-poster-tab img{height:55px}.ew-poster-tab strong{font-size:11px;padding:9px 2px}.ew-poster-banner{grid-template-columns:1fr;padding:26px 18px}.ew-poster-banner img{max-height:190px}.ew-poster-banner h3{font-size:60px}.ew-poster-middle{grid-template-columns:1fr;padding:24px 18px}.ew-poster-bottle{min-height:220px}.ew-poster-bottle img{max-height:220px}.ew-poster-ingredients>div{gap:10px}.ew-poster-ingredients>div>div{font-size:12px}.ew-poster-ingredients span{width:30px;height:30px}.ew-poster-benefits>div{grid-template-columns:repeat(2,1fr);gap:12px}.ew-poster-benefits article{border:0!important;background:#fff9;border-radius:12px}.ew-poster-info{grid-template-columns:1fr;padding:18px}.ew-poster-quality{grid-template-columns:repeat(2,1fr)}.ew-poster-quality>strong{grid-column:span 2}.ew-poster-controls{padding:12px;gap:5px}.ew-poster-controls button{padding:9px;font-size:10px}.ew-poster-controls span{font-size:10px;text-align:center}}
@media(prefers-reduced-motion:reduce){.ew-poster-body{animation:none}}


/* Luxury cocoa-reference layout; ONLY the collection between hero and FAQ changes. */
.ew-luxury-experience{background:#170e0b;color:#f7ebd7;scroll-margin-top:0}
.ew-luxury-stage{background:radial-gradient(ellipse at 72% 8%,#ad5b2c 0%,#4d2118 23%,#1d100c 60%,#140d0a 100%);padding:0 0 42px}
.ew-luxury-inner{padding-top:0}
.ew-luxury-scene{min-height:590px;display:grid;grid-template-columns:1fr 1fr;gap:25px;align-items:center;position:relative;animation:ew-lux-in .55s ease both}
@keyframes ew-lux-in{from{opacity:.12;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.ew-luxury-hero-copy{padding:65px 0 50px 2%;position:relative;z-index:2}
.ew-luxury-eyebrow{font:700 12px 'Barlow',sans-serif;letter-spacing:3px;color:#e7b981}
.ew-luxury-hero-copy h2{font:700 clamp(50px,5.8vw,85px)/1.05 'Playfair Display',Georgia,serif;color:#fff0da;margin:22px 0}
.ew-luxury-hero-copy h2 em{font-size:clamp(23px,2.6vw,36px);font-style:normal;font-weight:600;color:#f4cda0;display:block;margin-top:16px}
.ew-luxury-rule{display:block;color:#dcb780;font-size:25px;border-top:1px solid #a77a55;width:190px;text-align:center}
.ew-luxury-hero-copy>p{font-size:17px;line-height:1.7;max-width:460px;color:#ead9ca;margin:28px 0}
.ew-luxury-picker-label{font-size:11px;font-weight:900;letter-spacing:1.7px;color:#f0c89a;margin-bottom:10px}
.ew-luxury-picker{display:flex;flex-wrap:wrap;gap:9px;max-width:560px}
.ew-luxury-choice{cursor:pointer;border:1px solid #9c7958;background:#3c2b20b8;border-radius:12px;padding:7px 7px 6px;display:flex;flex-direction:column;align-items:center;gap:5px;width:77px;transition:transform .22s,box-shadow .22s,border-color .22s}
.ew-luxury-choice:hover{transform:translateY(-4px);border-color:#ffdf9c}
.ew-luxury-choice.active{border-color:#f5c679;box-shadow:0 0 0 2px #eac58c66,0 0 20px #f1c57b3d}
.ew-luxury-choice img{width:58px;height:64px;object-fit:contain;border-radius:5px}
.ew-luxury-choice span{font-size:9px;line-height:1.15;font-weight:800;color:#fff5e7;text-align:center}
.ew-luxury-hero-product{position:relative;min-height:540px;display:grid;place-items:center;isolation:isolate}
.ew-luxury-sun{position:absolute;z-index:-1;width:95%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#e9a35b9c 0%,#b66c3540 42%,transparent 72%);filter:blur(13px)}
.ew-luxury-hero-product>img{width:90%;max-height:500px;object-fit:contain;filter:drop-shadow(0 24px 22px #0008);border-radius:15px}
.ew-luxury-product-stamp{position:absolute;top:12%;right:0;border:1px solid #c9a77d;border-radius:50%;width:105px;height:105px;display:grid;place-items:center;text-align:center;color:#e3bf87;font:800 15px/1.3 'Playfair Display',serif;letter-spacing:1px}
.ew-luxury-benefit-bar{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid #bd9872;border-radius:15px;overflow:hidden;margin:5px 0 25px;animation:ew-lux-in .6s both}
.ew-luxury-benefit-bar>div{display:flex;gap:18px;align-items:center;padding:25px 20px}
.ew-luxury-benefit-bar>div+div{border-left:1px solid #8a6b52}
.ew-luxury-benefit-bar svg{color:#d7ae79;flex:none}
.ew-luxury-benefit-bar strong{display:block;font:700 16px 'Playfair Display',serif;color:#f4e0c2;text-transform:uppercase}
.ew-luxury-benefit-bar small{display:block;font-size:12px;line-height:1.5;color:#d1bca7;margin-top:5px}
.ew-luxury-details{display:grid;gap:15px;animation:ew-lux-in .65s both}
.ew-luxury-detail{display:grid;grid-template-columns:43% 57%;min-height:285px;border:1px solid #ad8563;border-radius:15px;overflow:hidden;background:#261610}
.ew-luxury-detail.reverse{grid-template-columns:57% 43%}
.ew-luxury-detail.reverse .ew-luxury-detail-copy{grid-column:2;grid-row:1}
.ew-luxury-detail.reverse .ew-luxury-detail-visual{grid-column:1;grid-row:1}
.ew-luxury-detail-copy{padding:32px;display:flex;gap:20px;align-items:flex-start}
.ew-luxury-number{flex:none;display:grid;place-items:center;width:51px;height:51px;border:1px solid #ab8c65;transform:rotate(45deg);font-size:14px;color:#d5ad78}
.ew-luxury-detail-copy h3{font:700 clamp(24px,2.6vw,34px)/1.15 'Playfair Display',Georgia,serif;color:#f8e8ce;margin:0 0 14px}
.ew-luxury-mini-rule{color:#d6a870}
.ew-luxury-detail-copy p{font-size:14px;line-height:1.7;color:#d5c1af;margin:17px 0}
.ew-luxury-ingredient-tags,.ew-luxury-benefit-tags{display:flex;flex-wrap:wrap;gap:7px}
.ew-luxury-ingredient-tags span,.ew-luxury-benefit-tags span{display:inline-flex;align-items:center;gap:5px;border:1px solid #98724e;border-radius:20px;padding:6px 9px;font-size:10px;color:#e5caa5}
.ew-luxury-detail-visual{background:radial-gradient(circle at 50% 35%,var(--lux-accent) 0%,#6a3923 35%,#24150e 80%);display:grid;place-items:center;position:relative;min-height:285px;overflow:hidden}
.ew-luxury-detail-visual>img{position:relative;z-index:1;max-height:270px;max-width:75%;object-fit:contain;filter:drop-shadow(0 16px 16px #0008);border-radius:12px}
.ew-luxury-detail-visual .ew-luxury-visual-orb{position:absolute;width:250px;height:250px;border:1px solid #f6d6a96b;border-radius:50%;box-shadow:0 0 90px #d8b38155}
.ew-luxury-ingredient-art{position:absolute;left:8%;bottom:10%;color:#f3d6a9;display:flex;flex-direction:column;align-items:center;gap:8px;opacity:.65;font-size:11px;letter-spacing:2px;text-align:center}
.ew-luxury-bottom{border:1px solid #ad8563;border-radius:15px;margin-top:15px;overflow:hidden;animation:ew-lux-in .7s both}
.ew-luxury-quality{display:grid;grid-template-columns:repeat(5,1fr);padding:22px 10px;border-bottom:1px solid #a5805b}
.ew-luxury-quality>div{display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;color:#f1d9b9;font-size:11px}
.ew-luxury-quality svg{color:#dcb67f}
.ew-luxury-bottom-cta{display:flex;align-items:center;gap:28px;padding:24px 30px}
.ew-luxury-seal{font-size:55px;color:#cfa36d}
.ew-luxury-bottom-cta>div{flex:1}
.ew-luxury-bottom-cta h3{font:700 22px 'Playfair Display',Georgia,serif;color:#f2ddbc;margin:0 0 6px}
.ew-luxury-bottom-cta p{font-size:12px;color:#cfb79e;margin:0}
.ew-luxury-bottom-cta a{border:1px solid #c8a77b;color:#f3d8b1;border-radius:25px;padding:11px 17px;font-size:11px;font-weight:800;white-space:nowrap}
.ew-luxury-bottom-cta a:hover{background:#c8a77b;color:#1c100d}
.ew-luxury-faq{padding:80px 0;background:#f8fafc;color:#17263b}
.ew-luxury-faq-inner{text-align:center;max-width:850px}
.ew-luxury-faq-inner>span{font-size:11px;letter-spacing:2px;font-weight:800;color:#11a9a0}
.ew-luxury-faq h2{font:900 clamp(28px,3.7vw,48px) 'Barlow Condensed',Impact,sans-serif;margin:9px 0}
.ew-luxury-faq h2 em{font-style:normal;color:#10b7ad}
.ew-luxury-faq-inner>p{font-size:14px;color:#697789;margin-bottom:32px}
.ew-luxury-faq-list{display:grid;gap:10px;text-align:left}
.ew-luxury-faq-item{border:1px solid #dce3e9;border-radius:13px;background:white;overflow:hidden}
.ew-luxury-faq-item button{border:0;background:transparent;width:100%;padding:17px 20px;display:flex;align-items:center;justify-content:space-between;text-align:left;cursor:pointer;color:#17263b;font-size:14px;font-weight:800}
.ew-luxury-faq-item button span{font-size:22px;color:#0ca99f}
.ew-luxury-faq-item p{font-size:14px;line-height:1.65;color:#556477;padding:0 20px 20px;margin:0}
@media(max-width:800px){.ew-luxury-scene{grid-template-columns:1fr;gap:0}.ew-luxury-hero-copy{padding:55px 0 0}.ew-luxury-hero-product{min-height:320px}.ew-luxury-hero-product>img{max-height:310px}.ew-luxury-detail,.ew-luxury-detail.reverse{grid-template-columns:1fr}.ew-luxury-detail.reverse .ew-luxury-detail-copy,.ew-luxury-detail.reverse .ew-luxury-detail-visual{grid-column:auto;grid-row:auto}.ew-luxury-detail-visual{min-height:260px}.ew-luxury-benefit-bar{grid-template-columns:1fr}.ew-luxury-benefit-bar>div+div{border-left:0;border-top:1px solid #8a6b52}.ew-luxury-bottom-cta{flex-wrap:wrap}}
@media(max-width:520px){.ew-luxury-hero-copy h2{font-size:48px}.ew-luxury-hero-copy h2 em{font-size:22px}.ew-luxury-choice{width:calc(33.333% - 6px)}.ew-luxury-choice img{height:50px}.ew-luxury-product-stamp{width:70px;height:70px;font-size:10px}.ew-luxury-detail-copy{padding:24px 16px;gap:15px}.ew-luxury-number{width:38px;height:38px;font-size:11px}.ew-luxury-quality{grid-template-columns:repeat(2,1fr);gap:20px}.ew-luxury-bottom-cta{padding:20px}.ew-luxury-bottom-cta a{width:100%;text-align:center}.ew-luxury-faq{padding:50px 0}}
@media(prefers-reduced-motion:reduce){.ew-luxury-scene,.ew-luxury-benefit-bar,.ew-luxury-details,.ew-luxury-bottom{animation:none}}


/* Clean luxury catalogue refinement: calm navy + ivory + soft champagne, with restrained product accent. */
.ew-luxury-experience{background:#101b2b;color:#f7f3eb}
.ew-luxury-stage{background:linear-gradient(145deg,#14243a 0%,#19293b 45%,#101c2c 100%);padding-bottom:52px}
.ew-luxury-scene{min-height:520px;gap:46px}
.ew-luxury-hero-copy{padding:72px 0 52px 1%}
.ew-luxury-eyebrow{color:#d4b98d;letter-spacing:2.5px}
.ew-luxury-hero-copy h2{color:#fcf9f3;font-size:clamp(50px,5.4vw,78px);letter-spacing:-1.5px}
.ew-luxury-hero-copy h2 em{color:#dfc6a0;font-size:clamp(21px,2.3vw,29px);line-height:1.4;max-width:520px}
.ew-luxury-hero-copy>p{color:#cbd6e0;font-size:15px;max-width:500px}
.ew-luxury-rule{border-color:#758397;color:#e3c69a}
.ew-luxury-picker-label{color:#e4c99f}
.ew-luxury-picker{gap:10px;max-width:620px}
.ew-luxury-choice{width:86px;background:#23344a;border:1px solid #4c5e70;border-radius:10px;padding:9px 7px 8px}
.ew-luxury-choice.active{background:#2e4155;border-color:#e1bf86;box-shadow:0 0 0 1px #e1bf86,0 8px 24px #0003}
.ew-luxury-choice:hover{border-color:#e1bf86}
.ew-luxury-choice span{color:#f3f2ef;font-size:9px}
.ew-luxury-sun{background:radial-gradient(circle,#bba17a35 0%,#64839a22 40%,transparent 73%)}
.ew-luxury-product-stamp{border-color:#9bacc0;color:#c9d4e1}
.ew-luxury-benefit-bar{background:#1c2d40;border-color:#40536a;border-radius:14px}
.ew-luxury-benefit-bar>div{padding:23px}
.ew-luxury-benefit-bar>div+div{border-color:#40536a}
.ew-luxury-benefit-bar svg{color:#ddc49c}
.ew-luxury-benefit-bar strong{font-family:'Barlow',sans-serif;font-size:13px;font-weight:800;letter-spacing:.5px;color:#f6f4f0}
.ew-luxury-benefit-bar small{color:#acbccb}
.ew-luxury-details{gap:18px}
.ew-luxury-detail,.ew-luxury-detail.reverse{background:#1b2b3e;border-color:#43576b;border-radius:14px;min-height:285px}
.ew-luxury-detail-copy{padding:38px;gap:25px}
.ew-luxury-detail-copy h3{font-size:clamp(24px,2.5vw,31px);color:#faf6ee}
.ew-luxury-detail-copy p{color:#c6d3df;font-size:14px;line-height:1.8}
.ew-luxury-number{border-color:#8d9fb2;color:#e3c69a}
.ew-luxury-mini-rule{color:#d7bb8b}
.ew-luxury-detail-visual{background:radial-gradient(ellipse at 50% 45%,var(--lux-soft) 0%,#9aa5a9 32%,#425569 70%,#24354a 100%)}
.ew-luxury-detail-visual .ew-luxury-visual-orb{border-color:#f8f2e0a3;box-shadow:0 0 70px #f2e5c53d}
.ew-luxury-ingredient-art{color:#e8f2f5;opacity:.9}
.ew-luxury-ingredient-tags span,.ew-luxury-benefit-tags span{background:#293b50;border:1px solid #53687b;color:#e4ebef;font-size:11px;line-height:1.4}
.ew-luxury-bottom{background:#1c2c40;border-color:#43576b}
.ew-luxury-quality{border-color:#43576b;gap:12px}
.ew-luxury-quality>div{color:#d9e2e9}
.ew-luxury-quality svg{color:#d6bd96}
.ew-quality-source-note{color:#b4c2cf;font-size:11px;line-height:1.5;padding:15px 20px 0;margin:0}
.ew-luxury-bottom-cta{border-top:1px solid #43576b}
.ew-luxury-bottom-cta h3{color:#f6f3ec}
.ew-luxury-bottom-cta p{color:#b8c7d3}
.ew-luxury-bottom-cta a{border-color:#d8bd95;color:#f4e2c5}
.ew-luxury-bottom-cta a:hover{background:#e0c7a1;color:#152235}
.ew-luxury-faq{background:#f7f9fb}
@media(max-width:520px){.ew-luxury-choice{width:calc(33.333% - 7px)}.ew-luxury-detail-copy{padding:24px 17px}.ew-luxury-hero-copy h2{font-size:46px}.ew-luxury-quality{gap:18px}}


/* O’LAMOUR-inspired light palette. Layout and product interactions retained. */
.ew-page .ew-luxury-experience,.ew-page .ew-luxury-stage{background:#fff;color:#172136}
.ew-page .ew-luxury-eyebrow,.ew-page .ew-luxury-picker-label{color:#087f79}
.ew-page .ew-luxury-hero-copy h2{color:#172136}
.ew-page .ew-luxury-hero-copy h2 em{color:#087f79}
.ew-page .ew-luxury-hero-copy>p,.ew-page .ew-luxury-detail-copy p{color:#526172}
.ew-page .ew-luxury-rule{border-color:#cbdedc;color:#0ca99f}
.ew-page .ew-luxury-choice{background:#f5f7f9;border-color:#e1e7eb}
.ew-page .ew-luxury-choice span{color:#172136}
.ew-page .ew-luxury-choice.active{background:#e8f8f6;border-color:#12b8ad;box-shadow:0 0 0 1px #12b8ad}
.ew-page .ew-luxury-choice:hover{border-color:#12b8ad}
.ew-page .ew-luxury-sun{background:radial-gradient(circle,#e4eeed 0%,#f5f7f9 55%,transparent 73%)}
.ew-page .ew-luxury-hero-product>img,.ew-page .ew-luxury-detail-visual>img{filter:drop-shadow(0 15px 16px #17213624)}
.ew-page .ew-luxury-product-stamp{border-color:#b9dcd8;color:#087f79}
.ew-page .ew-luxury-benefit-bar{background:#f5f7f9;border-color:#e0e8eb}
.ew-page .ew-luxury-benefit-bar>div+div{border-color:#dce5e8}
.ew-page .ew-luxury-benefit-bar svg,.ew-page .ew-luxury-quality svg{color:#0a9c94}
.ew-page .ew-luxury-benefit-bar strong,.ew-page .ew-luxury-detail-copy h3,.ew-page .ew-luxury-bottom-cta h3{color:#172136}
.ew-page .ew-luxury-benefit-bar small,.ew-page .ew-luxury-bottom-cta p,.ew-page .ew-quality-source-note{color:#586777}
.ew-page .ew-luxury-detail,.ew-page .ew-luxury-detail.reverse{background:#fff;border-color:#e3e9ed}
.ew-page .ew-luxury-number{border-color:#b5dcd8;color:#087f79}
.ew-page .ew-luxury-mini-rule,.ew-page .ew-luxury-seal{color:#0ca99f}
.ew-page .ew-luxury-detail-visual{background:radial-gradient(ellipse at center,#fff 0%,#f5f7f9 65%,#eef1f4 100%)}
.ew-page .ew-luxury-detail-visual .ew-luxury-visual-orb{border-color:#dce8e7;box-shadow:none}
.ew-page .ew-luxury-ingredient-art{color:#087f79}
.ew-page .ew-luxury-ingredient-tags span,.ew-page .ew-luxury-benefit-tags span{background:#eef8f7;border-color:#cde6e3;color:#245b58}
.ew-page .ew-luxury-bottom{background:#f7f9fa;border-color:#e0e8eb}
.ew-page .ew-luxury-quality{display:flex;flex-wrap:wrap;border-color:#e0e8eb}
.ew-page .ew-luxury-quality>div{flex:1 1 100px;color:#344454}
.ew-page .ew-luxury-bottom-cta{border-color:#e0e8eb}
.ew-page .ew-luxury-bottom-cta a{border-color:#0ca99f;color:#087f79}
.ew-page .ew-luxury-bottom-cta a:hover{background:#087f79;color:#fff}


/* Refined information cards: product photography stays in the main showcase. */
.ew-page .ew-refined-details{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:20px;margin-top:24px;align-items:start}
.ew-page .ew-refined-card{min-width:0;border:1px solid #e3e9ed;border-radius:16px;padding:clamp(20px,3vw,36px);background:#fff;box-shadow:0 5px 20px #17213606}
.ew-page .ew-refined-card-0{grid-column:1/-1;background:#f5f8f9}
.ew-page .ew-refined-heading{display:flex;align-items:center;gap:15px;margin-bottom:16px}
.ew-page .ew-refined-icon{display:grid;place-items:center;flex:none;width:50px;height:50px;border-radius:13px;background:#e5f5f3;color:#087f79}
.ew-page .ew-refined-step{display:block;color:#087f79;font-size:10px;font-weight:700;letter-spacing:1.5px;margin-bottom:5px}
.ew-page .ew-refined-heading h3{font:700 clamp(20px,2vw,28px)/1.2 'Playfair Display',Georgia,serif;color:#172136;margin:0}
.ew-page .ew-refined-card p{font-size:15px;line-height:1.8;color:#526172;margin:0}
.ew-page .ew-refined-list{list-style:none;padding:0;margin:22px 0 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.ew-page .ew-refined-list li{display:flex;align-items:center;gap:10px;padding:12px;background:#f5f8f9;border:1px solid #e5ecee;border-radius:9px;color:#344454;font-size:13px;line-height:1.5;overflow-wrap:anywhere}
.ew-page .ew-refined-list svg{flex:none;color:#0b938a}
.ew-page .ew-refined-benefits{grid-template-columns:1fr}
@media(max-width:850px){.ew-page .ew-refined-details{grid-template-columns:1fr}}
@media(max-width:520px){.ew-page .ew-refined-list{grid-template-columns:1fr}.ew-page .ew-refined-heading{gap:10px}.ew-page .ew-refined-icon{width:42px;height:42px}}

/* Collection-wide quality overview */
.ew-why { background:#fff; padding:76px 0; border-top:1px solid #e7edef; }
.ew-why-head { text-align:center; max-width:720px; margin:0 auto 38px; }
.ew-why-kicker { color:#087f78; font-size:12px; font-weight:800; letter-spacing:2px; }
.ew-why-head h2 { font-family:'Barlow Condensed',sans-serif; font-size:clamp(32px,4vw,48px); font-weight:800; line-height:1.1; margin:12px 0 16px; color:#172136; }
.ew-why-head h2 em { color:#0b938a; font-style:normal; }
.ew-why-head p,.ew-why-card p { color:#526172; line-height:1.7; }
.ew-europe-highlight { display:grid; grid-template-columns:88px 1fr; align-items:center; gap:26px; padding:32px; margin-bottom:24px; border-radius:18px; background:#172136; color:white; }
.ew-europe-symbol { display:grid; place-items:center; width:80px; height:80px; border:1px solid #39c9bd; border-radius:50%; color:#39c9bd; }
.ew-europe-highlight span { color:#59ded1; font-size:12px; font-weight:800; letter-spacing:2px; }
.ew-europe-highlight h3 { color:white; font-size:clamp(23px,3vw,32px); margin:8px 0; }
.ew-europe-highlight p { color:#e1e9ef; line-height:1.7; margin:0; }
@media(max-width:560px){.ew-europe-highlight{grid-template-columns:1fr;padding:24px;}}
.ew-why-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; }
.ew-why-card { background:#f6f8f9; border:1px solid #e5ebed; border-radius:16px; padding:28px; }
.ew-why-icon { display:grid; place-items:center; width:52px; height:52px; border-radius:12px; background:#e3f3f1; color:#087f78; margin-bottom:20px; }
.ew-why-card h3 { font-size:20px; font-weight:700; color:#172136; margin:0 0 10px; }
.ew-why-card p { font-size:15px; margin:0; }
.ew-why-note { text-align:center; color:#526172; font-size:13px; line-height:1.6; margin:24px auto 0; max-width:850px; }
@media(max-width:850px){.ew-why-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:560px){.ew-why{padding:48px 0;}.ew-why-grid{grid-template-columns:1fr;}.ew-why-card{padding:22px;}}


/* Unified comparison-inspired palette */
.ew-page .ew-luxury-experience,.ew-page .ew-luxury-stage,.ew-page .ew-why,.ew-comparison-wrap{background:#f4f9fa;color:#172b40}
.ew-page .ew-luxury-eyebrow,.ew-page .ew-luxury-picker-label,.ew-page .ew-luxury-hero-copy h2 em{color:var(--lux-dark)}
.ew-page .ew-luxury-choice.active{background:var(--lux-soft);border-color:var(--lux-accent);box-shadow:0 0 0 1px var(--lux-accent)}
.ew-page .ew-luxury-choice:hover{border-color:var(--lux-accent)}
.ew-page .ew-luxury-sun{background:radial-gradient(circle,var(--lux-soft),transparent 72%)}
.ew-page .ew-luxury-benefit-bar,.ew-page .ew-luxury-bottom,.ew-page .ew-refined-card{background:#fff;border-color:#e0e8eb}
.ew-page .ew-refined-card-0{border-top:4px solid var(--lux-accent)}
.ew-page .ew-refined-icon,.ew-page .ew-refined-list li{background:var(--lux-soft);color:var(--lux-dark)}
.ew-page .ew-refined-step,.ew-page .ew-refined-list svg,.ew-page .ew-luxury-benefit-bar svg,.ew-page .ew-luxury-quality svg{color:var(--lux-dark)}
.ew-page .ew-europe-highlight{background:#fff;border:1px solid #dce7ea;border-left:5px solid #118f89;color:#172b40;box-shadow:0 8px 24px #172b4009}
.ew-page .ew-europe-highlight h3{color:#172b40}.ew-page .ew-europe-highlight p{color:#526172}.ew-page .ew-europe-highlight span{color:#087f78}.ew-page .ew-europe-symbol{background:#e8f5f3;color:#087f78;border-color:#c5e3df}
.ew-page .ew-why-card{background:#fff;border-color:#e0e8eb}.ew-page .ew-why-card:nth-child(1){--pillar:#a94b08;--pillar-soft:#fff1e5}.ew-page .ew-why-card:nth-child(2){--pillar:#a52469;--pillar-soft:#fceaf4}.ew-page .ew-why-card:nth-child(3){--pillar:#a5222b;--pillar-soft:#fcebed}.ew-page .ew-why-card:nth-child(4){--pillar:#245ca5;--pillar-soft:#eaf1fc}.ew-page .ew-why-card:nth-child(5){--pillar:#287d47;--pillar-soft:#e8f5eb}.ew-page .ew-why-card:nth-child(6){--pillar:#805b00;--pillar-soft:#fff5d9}.ew-page .ew-why-icon{background:var(--pillar-soft);color:var(--pillar)}
.ew-page .ew-intro-lineup{width:min(100%,900px);max-height:420px;min-height:0;object-fit:contain;border-radius:18px;margin:28px auto 0}.ew-page .ew-intro .ew-quality-strip{margin-top:24px}.ew-intro-note{font-size:12px;color:#526172;margin:12px 0 0}.ew-page .ew-comparison{padding-block:52px 65px}.ew-page .ew-table-scroll{border-radius:14px}.ew-page .ew-table-product{color:#fff}.ew-page .ew-table-scroll th:nth-child(2) .ew-table-product,.ew-page .ew-table-scroll th:nth-child(7) .ew-table-product{color:#172b40}
@media(max-width:650px){.ew-page .ew-intro-lineup{max-height:260px}.ew-page .ew-comparison{padding-block:36px}.ew-page .ew-section-heading>span{display:none}}

`,x="/assets/image/eu-wellness",d=[{id:"alpha-kids",name:"ALPHA KIDS",first:"ALPHA",second:"KIDS",accent:"#F18726",soft:"#fff1e5",dark:"#a94b08",audience:"Children’s Multivitamins & Minerals",description:"A children’s multivitamin and mineral supplement with vitamins A, B, C, D2 and E, plus calcium, iron and zinc, designed to complement healthy growth and daily nutrition.",image:"alphakids.png",ingredients:["Vitamin A (Retinyl Acetate)","Vitamin C (L-Ascorbic Acid)","Vitamin D2 (Ergocalciferol)","Vitamin B1 (Thiamine)","Vitamin B2 (Riboflavin)","Vitamin B3 (Niacinamide)","Vitamin B5 (Calcium D-Pantothenate)","Vitamin B6 (Pyridoxine)","Vitamin B7 (D-Biotin)","Vitamin B9 (Folic Acid)","Vitamin B12 (Cyanocobalamin)","Vitamin E (Tocopherol Acetate)","Calcium (Calcium Carbonate)","Iron (Iron Fumarate)","Zinc (Zinc Oxide)"],benefits:[{icon:"shield",label:"Normal immune function"},{icon:"trending",label:"Growth and bone development"},{icon:"brain",label:"Normal psychological function"},{icon:"zap",label:"Energy-yielding metabolism"},{icon:"heart",label:"Red blood cell formation"}],bestFor:"Children growing into their potential",mainBenefits:"Supports normal immune function, bone growth, energy metabolism and red blood cell formation",ingredientSummary:"Vitamins A, B-complex, C, D2 and E; calcium, iron and zinc",focus:"For children growing into their potential",ingredientIntro:"The slide lists a broad vitamin-and-mineral blend including B vitamins, vitamins A, C, D2 and E, and calcium, iron and zinc.",benefitIntro:"The slide highlights contributions to normal immune function, psychological function, energy metabolism, bone growth and red blood cell formation."},{id:"artemis",name:"ARTEMIS",first:"ARTEMIS",second:"",accent:"#CE3D89",soft:"#fceaf4",dark:"#a52469",audience:"Women’s Multivitamins & Minerals",description:"A women’s multivitamin and mineral supplement combining B vitamins, vitamins A, C, D3 and K, key minerals and selected botanical extracts.",image:"Artemis.png",ingredients:["Vitamin A (Retinyl Acetate)","Vitamin B1 (Thiamine)","Vitamin B2 (Riboflavin)","Vitamin B3 (Nicotinamide)","Vitamin B5 (Calcium D-Pantothenate)","Vitamin B6 (Pyridoxine)","Vitamin B9 (Folic Acid)","Vitamin B12 (Cyanocobalamin)","Vitamin C (L-Ascorbic Acid)","Vitamin D3 (Cholecalciferol)","Vitamin K (Phytonadione)","Calcium","Chromium","Copper","Iodine","Iron","Magnesium","Manganese","Molybdenum","Selenium","Zinc","Citrus Aurantium Fruit Extract","Tribulus Terrestris Fruit Extract"],benefits:[{icon:"brain",label:"Normal psychological function"},{icon:"bone",label:"Bone maintenance"},{icon:"heart",label:"Red blood cell formation"},{icon:"sparkles",label:"Hair and skin maintenance"},{icon:"shield",label:"Immune function"}],bestFor:"Women achieving balance, brilliance and vitality",mainBenefits:"Supports normal psychological function, bone maintenance, red blood cell formation and the maintenance of normal hair and skin",ingredientSummary:"B vitamins, vitamins A, C, D3 and K; minerals; citrus aurantium and tribulus extracts",focus:"For women achieving balance, brilliance and vitality",ingredientIntro:"The source slide lists vitamins, minerals and herbal extracts, including citrus aurantium and tribulus terrestris fruit extracts.",benefitIntro:"The source emphasizes normal psychological function, bone health, blood cell formation, protection from oxidative stress and hair and skin maintenance."},{id:"guru",name:"THE GURU",first:"THE",second:"GURU",accent:"#B52B32",soft:"#fcebed",dark:"#a5222b",audience:"Men’s Performance & Vitality Support",description:"A men’s performance and vitality dietary supplement featuring maca root, tribulus terrestris, Korean ginseng and L-arginine hydrochloride.",image:"Guru.png",ingredients:["Korean Ginseng Root Extract","Maca Root Extract","Tribulus Terrestris Fruit Extract","L-Arginine Hydrochloride"],benefits:[{icon:"activity",label:"Physical performance support"},{icon:"zap",label:"Daily vitality"},{icon:"heart",label:"Normal blood circulation"},{icon:"trending",label:"Endurance support"},{icon:"sun",label:"Everyday alertness"}],bestFor:"Men pursuing potential, power, endurance and virility",mainBenefits:"Botanical and amino-acid support for natural stamina, normal blood circulation and everyday vitality",ingredientSummary:"Korean ginseng root extract, maca root extract, tribulus terrestris fruit extract and L-arginine hydrochloride",focus:"For men pursuing potential, power, endurance and virility",ingredientIntro:"The slide groups Korean ginseng, maca and tribulus as herbs and plant extracts, alongside the amino acid L-arginine hydrochloride.",benefitIntro:"The slide describes botanical support for stamina and endurance, and L-arginine as supporting normal nitric oxide production and blood circulation."},{id:"nervana",name:"NERVANA",first:"NERVANA",second:"",accent:"#2863B4",soft:"#eaf1fc",dark:"#245ca5",audience:"Stress Relief & Relaxation Support",description:"A stress-relief and relaxation-support supplement combining B vitamins, vitamin C, minerals and a range of calming botanical extracts.",image:"Nervana.png",ingredients:["Vitamin C (L-Ascorbic Acid)","Vitamin B1 (Thiamine)","Vitamin B2 (Riboflavin)","Vitamin B3 (Nicotinamide)","Vitamin B5 (Calcium D-Pantothenate)","Vitamin B6 (Pyridoxine)","Vitamin B7 (D-Biotin)","Vitamin B9 (Folic Acid)","Copper","Magnesium","Zinc","Ashwagandha Root Extract","Chamomile Flower Extract","Griffonia Seed Extract","Hop Flower Extract","Lemon Balm Extract","Magnolia Bark Extract","Purple Passionflower Flower Extract","Valerian Root Extract"],benefits:[{icon:"flower",label:"Calm and relaxation"},{icon:"brain",label:"Normal psychological function"},{icon:"moon",label:"Restful evening routine"},{icon:"zap",label:"Energy metabolism"},{icon:"shield",label:"Nervous-system support"}],bestFor:"Mental clarity, focus and resilience",mainBenefits:"Complements calm and relaxation routines while supplying nutrients involved in normal psychological and nervous-system function",ingredientSummary:"B vitamins, vitamin C, copper, magnesium, zinc and calming botanical extracts",focus:"For mental clarity, focus and resilience",ingredientIntro:"The source lists B vitamins, vitamin C, magnesium, copper, zinc and botanicals including ashwagandha, chamomile, hops, lemon balm, passionflower and valerian.",benefitIntro:"The slide describes support for everyday emotional balance, a sense of calm, a restful evening routine and normal psychological function."},{id:"oparo",name:"OPARO",first:"OPARO",second:"",accent:"#287D47",soft:"#e8f5eb",dark:"#287d47",audience:"Metabolic Health & Longevity",description:"A metabolic-health and longevity dietary supplement combining red yeast rice, chromium, vitamins, minerals and selected plant extracts.",image:"oparo.png",ingredients:["Vitamin B3 (Nicotinamide)","Vitamin B7 (D-Biotin)","Vitamin D3 (Cholecalciferol)","Vitamin E (Tocopherol Acetate)","Calcium (Calcium Carbonate)","Chromium (Chromium Picolinate)","Magnesium (Magnesium Oxide)","Selenium (Sodium Selenite)","Berberine Bark Extract","Cinnamon Bark Extract","Fenugreek Seed Extract","Red Yeast Rice Extract"],benefits:[{icon:"heart",label:"Normal cholesterol support"},{icon:"activity",label:"Macronutrient metabolism"},{icon:"shield",label:"Protection from oxidative stress"},{icon:"bone",label:"Normal bone maintenance"},{icon:"zap",label:"Reduced tiredness and fatigue"}],bestFor:"Longevity and metabolic wellness",mainBenefits:"Supports normal macronutrient metabolism, maintenance of normal blood glucose levels and overall nutritional wellness",ingredientSummary:"Red yeast rice, chromium, berberine, cinnamon, fenugreek, vitamins B3, B7, D3 and E, and minerals",focus:"For longevity and metabolic wellness",ingredientIntro:"The slide lists vitamins B3, B7, D3 and E; calcium, chromium, magnesium and selenium; and berberine, cinnamon, fenugreek and red yeast rice extracts.",benefitIntro:"The slide highlights cholesterol and glucose-related wellness support, normal macronutrient metabolism, cardiovascular wellness and protection against oxidative stress."},{id:"peakolyte",name:"PEAKOLYTE",first:"PEAKOLYTE",second:"",accent:"#E5A500",soft:"#fff5d9",dark:"#805b00",audience:"Performance Effervescent Tablets",description:"An orange-flavored performance effervescent tablet supplement featuring guarana, green tea and garcinia extracts with vitamin B3 (nicotinamide).",image:"Lyte.png",ingredients:["Garcinia Extract","Green Tea Extract","Guarana Extract","Vitamin B3 (Nicotinamide)"],benefits:[{icon:"zap",label:"Normal energy metabolism"},{icon:"sun",label:"Alertness support"},{icon:"trending",label:"Reduced tiredness and fatigue"},{icon:"activity",label:"Active-lifestyle support"},{icon:"shield",label:"Antioxidant support"}],bestFor:"Peak performance, energy and fitness",mainBenefits:"Complements active days with botanical extracts and vitamin B3, which contributes to normal energy-yielding metabolism and reduced tiredness",ingredientSummary:"Garcinia extract, green tea extract, guarana extract and vitamin B3 (nicotinamide)",focus:"For peak performance, energy and fitness",ingredientIntro:"The source identifies garcinia, green tea and guarana extracts as botanical ingredients, together with vitamin B3 (nicotinamide).",benefitIntro:"The slide describes support for daily vitality and alertness, normal energy metabolism and reduced tiredness, and identifies the product as an orange-flavored effervescent drink."}];function l({name:o,size:r=21,className:a=""}){const i={width:r,height:r,fill:"none",stroke:"currentColor",strokeWidth:1.9,strokeLinecap:"round",strokeLinejoin:"round",viewBox:"0 0 24 24","aria-hidden":!0,className:a};switch(o){case"shield":return e.jsxs("svg",{...i,children:[e.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"}),e.jsx("path",{d:"m9 12 2 2 4-4"})]});case"trending":return e.jsxs("svg",{...i,children:[e.jsx("path",{d:"M3 17 9 11l4 4 8-9"}),e.jsx("path",{d:"M15 6h6v6"})]});case"bone":return e.jsxs("svg",{...i,children:[e.jsx("path",{d:"M17 10a3 3 0 1 0-3-3l-7 7a3 3 0 1 0 3 3l7-7Z"}),e.jsx("path",{d:"M17 10a3 3 0 1 0 3 3M7 14a3 3 0 1 0-3-3"})]});case"brain":return e.jsx("svg",{...i,children:e.jsx("path",{d:"M12 6a3 3 0 0 0-6 0 4 4 0 0 0-2 7 4 4 0 0 0 3 6 3 3 0 0 0 5-2V6ZM12 6a3 3 0 0 1 6 0 4 4 0 0 1 2 7 4 4 0 0 1-3 6 3 3 0 0 1-5-2V6ZM9 9l-2 2 2 2M15 9l2 2-2 2"})});case"zap":return e.jsx("svg",{...i,children:e.jsx("path",{d:"m13 2-9 12h7l-1 8 10-12h-7V2Z"})});case"flower":return e.jsxs("svg",{...i,children:[e.jsx("path",{d:"M12 12c-5-7-8-2-5 1-6-1-5 5 0 5 1 5 6 4 6 0 5 3 8-2 3-5 5-4 0-8-4-1Z"}),e.jsx("circle",{cx:"12",cy:"13",r:"1.5"})]});case"sparkles":return e.jsx("svg",{...i,children:e.jsx("path",{d:"m12 3 1.7 6.3L20 11l-6.3 1.7L12 19l-1.7-6.3L4 11l6.3-1.7L12 3ZM19 17l.7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17Z"})});case"activity":return e.jsx("svg",{...i,children:e.jsx("path",{d:"M2 12h5l3-7 4 14 3-7h5"})});case"heart":return e.jsx("svg",{...i,children:e.jsx("path",{d:"M20.8 4.7a5.6 5.6 0 0 0-7.9 0L12 5.6l-.9-.9a5.6 5.6 0 0 0-7.9 7.9L12 21l8.8-8.4a5.6 5.6 0 0 0 0-7.9Z"})});case"sun":return e.jsxs("svg",{...i,children:[e.jsx("circle",{cx:"12",cy:"12",r:"4"}),e.jsx("path",{d:"M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"})]});case"moon":return e.jsxs("svg",{...i,children:[e.jsx("path",{d:"M20 14.3A8.5 8.5 0 0 1 9.7 4a8.5 8.5 0 1 0 10.3 10.3Z"}),e.jsx("path",{d:"m18 3 .6 1.4L20 5l-1.4.6L18 7l-.6-1.4L16 5l1.4-.6L18 3Z"})]});case"droplet":return e.jsx("svg",{...i,children:e.jsx("path",{d:"M12 2C9 6 5 11 5 15a7 7 0 1 0 14 0c0-4-4-9-7-13Z"})});case"infinity":return e.jsx("svg",{...i,children:e.jsx("path",{d:"M6 16c-3 0-4-2-4-4s1-4 4-4c5 0 7 8 12 8 3 0 4-2 4-4s-1-4-4-4c-5 0-7 8-12 8Z"})});case"leaf":return e.jsxs("svg",{...i,children:[e.jsx("path",{d:"M20 4C8 4 4 10 4 16a4 4 0 0 0 4 4c6 0 12-4 12-16Z"}),e.jsx("path",{d:"M4 20c3-5 7-9 12-12"})]});case"check":return e.jsx("svg",{...i,children:e.jsx("path",{d:"m5 12 4 4L19 6"})});case"arrow":return e.jsx("svg",{...i,children:e.jsx("path",{d:"M5 12h14m-6-6 6 6-6 6"})});case"down":return e.jsx("svg",{...i,children:e.jsx("path",{d:"M12 4v16m-6-6 6 6 6-6"})});case"menu":return e.jsx("svg",{...i,children:e.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})});case"close":return e.jsx("svg",{...i,children:e.jsx("path",{d:"M5 5l14 14M19 5 5 19"})});case"globe":return e.jsxs("svg",{...i,children:[e.jsx("circle",{cx:"12",cy:"12",r:"9"}),e.jsx("path",{d:"M3 12h18M12 3c-3 3-4.5 6-4.5 9s1.5 6 4.5 9M12 3c3 3 4.5 6 4.5 9s-1.5 6-4.5 9"})]});default:return e.jsx("svg",{...i,children:e.jsx("circle",{cx:"12",cy:"12",r:"8"})})}}const s=[{icon:"leaf",name:"Vegetarian Friendly"},{icon:"shield",name:"Non-GMO"},{icon:"globe",name:"European Union Standard"},{icon:"check",name:"HACCP Certified"},{icon:"check",name:"GMP Certified"}];function m(){return e.jsxs("section",{className:"ew-hero","aria-labelledby":"ew-hero-title",children:[e.jsx("div",{className:"ew-hero-glow ew-hero-glow-left"}),e.jsx("div",{className:"ew-hero-glow ew-hero-glow-right"}),e.jsxs("div",{className:"ew-container ew-hero-content",children:[e.jsxs("div",{className:"ew-eyebrow",children:[e.jsx("span",{}),"European Wellness Science by Infinite"]}),e.jsx("div",{className:"ew-hero-script",children:"/holistic wellness/"}),e.jsx("h1",{id:"ew-hero-title",children:"EU WELLNESS"}),e.jsx("p",{children:"European wellness science for modern living. A complete collection of targeted nutritional support for every stage of life."}),e.jsxs("a",{href:"#products",className:"ew-outline-btn",children:["Explore the Collection ",e.jsx(l,{name:"down",size:17})]})]})]})}function h(){const[o,r]=g.useState(0),a=d[o],i=["artemis","nervana","peakolyte"].includes(a.id)?[...s.slice(0,1),{icon:"leaf",name:"Vegan Friendly"},...s.slice(1)]:s,c=[{title:"PURPOSEFUL FORMULATION",text:a.description,image:"product"},{title:"ACTIVE INGREDIENTS",text:a.ingredientIntro,image:"ingredients"},{title:"KEY BENEFITS",text:a.benefitIntro,image:"benefits"}];return e.jsx("section",{className:"ew-luxury-experience",id:"products","aria-label":"Interactive EU Wellness collection",style:{"--lux-accent":a.accent,"--lux-soft":a.soft,"--lux-dark":a.dark},children:e.jsx("div",{className:"ew-luxury-stage",children:e.jsxs("div",{className:"ew-luxury-inner ew-container",children:[e.jsxs("div",{className:"ew-luxury-scene",children:[e.jsxs("div",{className:"ew-luxury-hero-copy",children:[e.jsx("span",{className:"ew-luxury-eyebrow",children:"EU WELLNESS · TARGETED NUTRITION"}),e.jsxs("h2",{children:[a.name,e.jsx("br",{}),e.jsx("em",{children:a.focus})]}),e.jsx("span",{className:"ew-luxury-rule","aria-hidden":"true",children:"✧"}),e.jsx("p",{children:a.description}),e.jsx("div",{className:"ew-luxury-picker-label",children:"SELECT PRODUCT"}),e.jsx("div",{className:"ew-luxury-picker",role:"group","aria-label":"Select an EU Wellness product",children:d.map((t,n)=>e.jsxs("button",{type:"button",className:"ew-luxury-choice"+(n===o?" active":""),"aria-label":`Show ${t.name}`,"aria-pressed":n===o,title:t.name,onClick:()=>r(n),children:[e.jsx("img",{src:`${x}/${t.image}`,alt:"",loading:"lazy"}),e.jsx("span",{children:t.name})]},t.id))})]}),e.jsxs("div",{className:"ew-luxury-hero-product",children:[e.jsx("div",{className:"ew-luxury-sun","aria-hidden":"true"}),e.jsx("img",{src:`${x}/${a.image}`,alt:`${a.name} supplement`}),e.jsxs("span",{className:"ew-luxury-product-stamp",children:["EU",e.jsx("br",{}),"WELLNESS"]})]})]},a.id),e.jsx("div",{className:"ew-luxury-benefit-bar",children:a.benefits.slice(0,3).map(t=>e.jsxs("div",{children:[e.jsx(l,{name:t.icon,size:29}),e.jsxs("div",{children:[e.jsx("strong",{children:t.label}),e.jsx("small",{children:"As described in the product presentation"})]})]},t.label))},`${a.id}-benefits`),e.jsx("div",{className:"ew-luxury-details ew-refined-details",children:c.map((t,n)=>e.jsxs("article",{className:`ew-refined-card ew-refined-card-${n}`,children:[e.jsxs("div",{className:"ew-refined-heading",children:[e.jsx("span",{className:"ew-refined-icon",children:e.jsx(l,{name:["sparkles","leaf","shield"][n],size:26})}),e.jsxs("div",{children:[e.jsxs("span",{className:"ew-refined-step",children:["0",n+1," / PRODUCT INFORMATION"]}),e.jsx("h3",{children:t.title})]})]}),e.jsx("p",{children:t.text}),n===1&&e.jsx("ul",{className:"ew-refined-list",children:a.ingredients.map(p=>e.jsxs("li",{children:[e.jsx(l,{name:"leaf",size:17}),e.jsx("span",{children:p})]},p))}),n===2&&e.jsx("ul",{className:"ew-refined-list ew-refined-benefits",children:a.benefits.map(p=>e.jsxs("li",{children:[e.jsx(l,{name:"check",size:19}),e.jsx("span",{children:p.label})]},p.label))})]},t.title))},`${a.id}-details`),e.jsxs("div",{className:"ew-luxury-bottom",children:[e.jsx("p",{className:"ew-quality-source-note",children:"Quality assurance marks reproduced from the supplied EU Wellness presentation; certifications have not been independently verified."}),e.jsx("div",{className:"ew-luxury-quality",children:i.map(t=>e.jsxs("div",{children:[e.jsx(l,{name:t.icon,size:25}),e.jsx("span",{children:t.name})]},t.name))}),e.jsxs("div",{className:"ew-luxury-bottom-cta",children:[e.jsx("span",{className:"ew-luxury-seal",children:"✧"}),e.jsxs("div",{children:[e.jsx("h3",{children:"WELLNESS FOR EVERY STAGE OF LIFE"}),e.jsx("p",{children:"Review each product’s presentation and check the label for recommended use, precautions and suitability."})]}),e.jsx("a",{href:"#ew-faq",children:"VIEW FAQ"})]})]},`${a.id}-bottom`)]})})})}function b(){return e.jsx("section",{className:"ew-intro","aria-labelledby":"ew-intro-title",children:e.jsxs("div",{className:"ew-container ew-intro-inner",children:[e.jsxs("div",{className:"ew-brandmark",children:[e.jsx("span",{children:"✦"})," EU WELLNESS"]}),e.jsxs("h2",{id:"ew-intro-title",children:["Holistic Wellness from",e.jsx("br",{}),"Europe to the World"]}),e.jsx("p",{className:"ew-intro-sub",children:"Targeted support for every stage of life."}),e.jsx("div",{className:"ew-quality-strip",children:s.map(o=>e.jsxs("div",{className:"ew-quality-item",children:[e.jsx("span",{className:"ew-quality-icon",children:e.jsx(l,{name:o.icon})}),o.name]},o.name))}),e.jsx("p",{className:"ew-intro-note",children:"Quality marks as listed in the product presentation; country of manufacture and certifications have not been independently verified."})]})})}function y(){const o=[["Best For","bestFor"],["Main Benefits","mainBenefits"],["Key Ingredients","ingredientSummary"]];return e.jsx("section",{className:"ew-comparison-wrap","aria-labelledby":"ew-comparison-title",children:e.jsxs("div",{className:"ew-container ew-comparison",children:[e.jsxs("div",{className:"ew-section-heading",children:[e.jsx("span",{"aria-hidden":"true"}),e.jsx("h2",{id:"ew-comparison-title",children:"Find Your Perfect Wellness Solution"}),e.jsx("span",{"aria-hidden":"true"})]}),e.jsx("p",{children:"Explore the formulas and find the product that suits your routine."}),e.jsx("div",{className:"ew-table-scroll",tabIndex:0,role:"region","aria-label":"Scrollable product comparison",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Compare"}),d.map(r=>e.jsx("th",{scope:"col",children:e.jsx("span",{className:"ew-table-product",style:{"--ew-accent":r.accent},children:r.name})},r.id))]})}),e.jsx("tbody",{children:o.map(([r,a])=>e.jsxs("tr",{children:[e.jsx("th",{scope:"row",children:r}),d.map(i=>e.jsx("td",{children:i[a]},i.id))]},a))})]})}),e.jsx("p",{className:"ew-disclaimer",children:"Dietary supplements. No approved therapeutic claims. Follow product labeling and professional guidance."})]})})}function v(){const o=[["globe","European Quality Standards","The collection’s product presentation identifies European Union standards as part of its quality assurance approach."],["shield","Good Manufacturing Practices","GMP focuses on consistent manufacturing processes, hygiene and quality controls. The presentation lists GMP among its quality marks."],["check","Food Safety & Quality Control","HACCP is a systematic approach to identifying and controlling food safety hazards during production."],["leaf","Purposeful Ingredients","The six formulas feature selected vitamins, minerals and botanical ingredients, depending on the product and its intended nutritional purpose."],["heart","Targeted Nutritional Support","Distinct formulas address different nutritional needs, from children’s nutrition to everyday vitality, relaxation and active lifestyles."],["sparkles","Dietary Considerations","The presentation lists vegetarian-friendly and non-GMO marks, with vegan-friendly options for selected products. Check individual labels for suitability."]];return e.jsx("section",{className:"ew-why","aria-labelledby":"ew-why-title",children:e.jsxs("div",{className:"ew-container",children:[e.jsxs("header",{className:"ew-why-head",children:[e.jsx("span",{className:"ew-why-kicker",children:"EUROPEAN WELLNESS SCIENCE · QUALITY & NUTRITION"}),e.jsxs("h2",{id:"ew-why-title",children:["THE ",e.jsx("em",{children:"EUROPEAN ADVANTAGE"})]}),e.jsx("p",{children:"Discover the advantages of a European wellness approach: purposeful nutrition, structured quality standards and formulations for different stages of life."})]}),e.jsxs("div",{className:"ew-europe-highlight",children:[e.jsx("div",{className:"ew-europe-symbol",children:e.jsx(l,{name:"globe",size:48})}),e.jsxs("div",{children:[e.jsx("span",{children:"EUROPEAN QUALITY APPROACH"}),e.jsx("h3",{children:"Quality with purpose. Wellness with confidence."}),e.jsx("p",{children:"The EU Wellness collection identifies European Union standards, GMP and HACCP among its quality marks. These frameworks emphasize consistent production, food safety and quality management — important considerations when choosing dietary supplements."})]})]}),e.jsx("div",{className:"ew-why-grid",children:o.map(([r,a,i])=>e.jsxs("article",{className:"ew-why-card",children:[e.jsx("div",{className:"ew-why-icon",children:e.jsx(l,{name:r,size:27})}),e.jsx("h3",{children:a}),e.jsx("p",{children:i})]},a))}),e.jsx("p",{className:"ew-why-note",children:"Quality marks are based on the supplied product presentation and have not been independently verified. Country of manufacture has not been confirmed. Check individual product labels and certification documentation for details. Dietary supplements are not medicines."})]})})}function k(){const o=[["What is EU Wellness?","EU Wellness is a collection of targeted dietary supplement products for different everyday nutritional and wellness needs."],["How do I choose the right EU Wellness product?","Explore each product’s description, ingredients and intended benefits, then check the official product label or consult a qualified healthcare professional."],["How should I use EU Wellness products?","Always follow the instructions, warnings and recommended use printed on the individual product packaging."],["Are EU Wellness products medicines?","These are dietary supplements, not substitutes for a balanced diet or prescribed medical treatment. Check the official product label for applicable regulatory information."]],[r,a]=g.useState(-1);return e.jsx("section",{className:"ew-luxury-faq",id:"ew-faq","aria-labelledby":"ew-faq-title",children:e.jsxs("div",{className:"ew-container ew-luxury-faq-inner",children:[e.jsx("span",{children:"HELP CENTER"}),e.jsxs("h2",{id:"ew-faq-title",children:["FREQUENTLY ASKED ",e.jsx("em",{children:"QUESTIONS"})]}),e.jsx("p",{children:"Everything you need to know about the EU Wellness collection."}),e.jsx("div",{className:"ew-luxury-faq-list",children:o.map(([i,c],t)=>e.jsxs("div",{className:"ew-luxury-faq-item",children:[e.jsxs("button",{type:"button","aria-expanded":r===t,onClick:()=>a(r===t?-1:t),children:[i,e.jsx("span",{children:r===t?"−":"+"})]}),r===t?e.jsx("p",{children:c}):null]},i))})]})})}function q(){return e.jsxs(w,{children:[e.jsxs(u,{children:[e.jsx("title",{children:"EU Wellness | INFINITE Live Limitless"}),e.jsx("meta",{name:"description",content:"Discover EU Wellness: six targeted nutritional supplement formulas for everyday wellbeing."})]}),e.jsxs("div",{className:"ew-page",children:[e.jsx("style",{children:f}),e.jsxs("div",{children:[e.jsx(m,{}),e.jsx(b,{}),e.jsx(h,{}),e.jsx(y,{}),e.jsx(v,{}),e.jsx(k,{})]})]})]})}export{q as default};
