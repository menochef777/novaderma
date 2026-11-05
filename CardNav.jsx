'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import './CardNav.css';

const THEMES = {
  dark: {
    '--cn-panel': 'rgba(0, 21, 44, 0.92)',
    '--cn-solid': '#00152c',
    '--cn-edge': 'rgba(255, 255, 255, 0.14)',
    '--cn-highlight': 'rgba(255, 255, 255, 0.1)',
    '--cn-shadow': '0 24px 48px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
    '--cn-text': '#f4f4f5',
    '--cn-muted': 'rgba(244, 244, 245, 0.65)',
    '--cn-hover': 'rgba(255, 255, 255, 0.08)',
    '--cn-ring': 'rgba(37, 99, 235, 0.6)',
    '--cn-tile': 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
    '--cn-tile-rim':
      'inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 4px 10px -4px rgba(0, 0, 0, 0.6)',
    '--cn-cta': '#2563eb',
    '--cn-cta-ink': '#ffffff',
    '--cn-cta-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 6px 16px -6px rgba(37, 99, 235, 0.6)',
    '--cn-cta-hover': 'brightness(1.12)'
  }
};

const ROOT = 'card-nav';
const PANEL = 'card-nav__panel';
const RIM = 'card-nav__rim';
const BAR = 'card-nav__bar';
const MENU = 'card-nav__menu';
const BURGER = 'card-nav__burger';
const LINE_TOP = 'card-nav__line card-nav__line--top';
const LINE_BOTTOM = 'card-nav__line card-nav__line--bottom';
const MENU_LABEL = 'card-nav__menu-label';
const WORD_OPEN = 'card-nav__word card-nav__word--open';
const WORD_CLOSE = 'card-nav__word card-nav__word--close';
const LOGO = 'card-nav__logo';
const CTA = 'card-nav__cta';
const CTA_WIDE = 'card-nav__cta card-nav__cta--wide';
const CONTENT = 'card-nav__content';
const CARDS = 'card-nav__cards';
const CARD = 'card-nav__card';
const CARD_HEAD = 'card-nav__card-head';
const LABEL = 'card-nav__label';
const DESCRIPTION = 'card-nav__description';
const LINKS = 'card-nav__links';
const LINK = 'card-nav__link';
const ARROW = 'card-nav__arrow';
const ARROW_OUT = 'card-nav__arrow-icon card-nav__arrow-icon--out';
const ARROW_IN = 'card-nav__arrow-icon card-nav__arrow-icon--in';

export const NOVADERMA_ITEMS = [
  {
    label: 'A Clínica',
    description: 'Medicina dermatológica de alto padrão em Manaíra.',
    links: [
      { label: 'Nossa História & Espaço', href: '#sobre' },
      { label: 'Corpo Clínico (Dr. André & Dra. Aline)', href: '#especialistas' },
      { label: 'Convênios & Reembolso', href: '#convenios' }
    ]
  },
  {
    label: 'Tratamentos',
    description: 'Procedimentos e tecnologias padrão ouro.',
    links: [
      { label: 'Dermatologia Clínica & Cirúrgica', href: 'dermatologia-clinica.html' },
      { label: 'Injetáveis & Bioestimuladores', href: 'injetaveis-bioestimuladores.html' },
      { label: 'Ultraformer MPT (Lifting)', href: 'ultraformer-mpt.html' },
      { label: 'Laser Etherea MX', href: 'laser-etherea-mx.html' }
    ]
  },
  {
    label: 'Atendimento',
    description: 'Canais diretos e informações úteis.',
    links: [
      { label: 'Dúvidas Frequentes (FAQ)', href: '#faq-accordion-title' },
      { label: 'Avaliações dos Pacientes', href: '#shino-testimonials' },
      { label: 'Instagram Oficial', href: 'https://www.instagram.com/clinicanovaderma/' },
      { label: 'Falar no WhatsApp', href: 'https://wa.me/5583981466894' }
    ]
  }
];

const NARROW = 560;

const CardNav = ({
  logo = 'images/novaderma-logo-darkmode.png',
  logoAlt = 'NovaDerma Clínica Dermatológica',
  logoHref = '/',
  items = NOVADERMA_ITEMS,
  cta = { label: 'Agendar Consulta', href: 'https://wa.me/5583981466894' },
  theme = 'dark',
  surface = 'glass',
  maxWidth = 860,
  accentColor = '#2563eb'
}) => {
  const contentId = useId();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const checkNarrow = () => setNarrow(window.innerWidth < NARROW);
    checkNarrow();
    window.addEventListener('resize', checkNarrow);
    return () => window.removeEventListener('resize', checkNarrow);
  }, []);

  return (
    <div className="card-nav-wrapper">
      <div
        ref={rootRef}
        className={ROOT}
        data-open={open ? '' : undefined}
        data-narrow={narrow ? '' : undefined}
      >
        <nav className={PANEL}>
          <div className={BAR}>
            <button
              type="button"
              className={MENU}
              aria-expanded={open}
              aria-controls={contentId}
              onClick={() => setOpen(!open)}
            >
              <span className={BURGER} aria-hidden="true">
                <span className={LINE_TOP} />
                <span className={LINE_BOTTOM} />
              </span>
              <span className={MENU_LABEL}>
                <span className={WORD_OPEN} aria-hidden={open}>Menu</span>
                <span className={WORD_CLOSE} aria-hidden={!open}>Fechar</span>
              </span>
            </button>

            {logo && (
              <a href={logoHref} className={LOGO} aria-label={logoAlt}>
                {typeof logo === 'string' ? <img src={logo} alt={logoAlt} /> : logo}
              </a>
            )}

            {cta && !narrow && (
              <a href={cta.href} className={CTA}>
                {cta.label}
              </a>
            )}
          </div>

          <div id={contentId} className={CONTENT} aria-hidden={!open}>
            <div className={CARDS}>
              {items.map((item, index) => (
                <div key={index} className={CARD}>
                  <div className={CARD_HEAD}>
                    <span className={LABEL}>{item.label}</span>
                    {item.description && <p className={DESCRIPTION}>{item.description}</p>}
                  </div>
                  <ul className={LINKS}>
                    {item.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href={link.href} className={LINK} onClick={() => setOpen(false)}>
                          <span className={ARROW} aria-hidden="true">
                            <svg className={ARROW_OUT} viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                            <svg className={ARROW_IN} viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                          </span>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {cta && narrow && (
              <a href={cta.href} className={CTA_WIDE} onClick={() => setOpen(false)}>
                {cta.label}
              </a>
            )}
          </div>
          <span className={RIM} />
        </nav>
      </div>
    </div>
  );
};

export default CardNav;

