import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  articles,
  faqs,
  services,
  testimonials,
  type ModalState,
  type ServiceId,
} from "./data";

const asset = (name: string) => `/assets/${name}.png`;
const email = "hello@altheacare.com";

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useScene(
  ref: React.RefObject<HTMLElement | null>,
  update: (rect: DOMRect, height: number) => void,
) {
  const callback = useRef(update);
  callback.current = update;
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (ref.current)
        callback.current(ref.current.getBoundingClientRect(), innerHeight);
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", request);
      removeEventListener("resize", request);
    };
  }, [ref]);
}

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -32px 0px", threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function Button({
  children,
  onClick,
  light = false,
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  light?: boolean;
  className?: string;
  type?: "submit" | "button";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`pill-button ${light ? "pill-light" : ""} ${className}`}
    >
      <span className="button-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </button>
  );
}

function SectionHeading({
  tag,
  title,
  children,
  className = "",
}: {
  tag?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={`section-heading ${className}`}>
      {tag && <span className="eyebrow">{tag}</span>}
      <div className="heading-copy">
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
    </Reveal>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`star ${className}`}>
      <path
        d="m12 1.7 3.03 6.17 6.8.98-4.91 4.8 1.16 6.77L12 17.22l-6.08 3.2 1.16-6.78-4.91-4.79 6.8-.98Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          direction === "left"
            ? "M22.5 12.5 15 20l7.5 7.5"
            : "M17.5 12.5 25 20l-7.5 7.5"
        }
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Redes sociais">
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a
        href="https://www.threads.com/"
        target="_blank"
        rel="noreferrer"
        aria-label="Threads"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19.6 8.2C18.9 4.7 16.5 2.7 12.3 2.7 6.7 2.7 4 6.3 4 12s2.8 9.3 8.3 9.3c4.4 0 7.7-2.4 7.7-6 0-3.2-2.8-5.3-6.8-5.3-3.4 0-5.1 1.8-4.8 4.1.3 2 3 2.9 5.1 1.6 2.2-1.3 2.5-5 .9-7.1-.8-1.1-2.9-1.5-4.4-.7" />
        </svg>
      </a>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M13 21V11h3l.5-3H13V6.7c0-1 .5-1.7 2-1.7h1.7M10 11h3" />
        </svg>
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noreferrer"
        aria-label="YouTube"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2.5" y="5" width="19" height="14" rx="4" />
          <path d="m10 9 5 3-5 3Z" />
        </svg>
      </a>
    </div>
  );
}

function TrustRating({ full = false }: { full?: boolean }) {
  return (
    <div className={`trust-rating ${full ? "trust-full" : ""}`}>
      {!full && <span>Excelente, 4,9 de 5</span>}
      <span className="trust-wordmark">
        <Star />
        <strong>TrustPoint</strong>
      </span>
      {full && (
        <>
          <div className="trust-stars" aria-label="5 estrelas">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>
                <Star />
              </span>
            ))}
          </div>
          <p>TrustScore 4.9&nbsp; 245 avaliações</p>
        </>
      )}
    </div>
  );
}

function AvatarStack() {
  return (
    <div className="avatar-stack" aria-label="Mais de 80 clientes">
      {[9, 10, 11, 12, 13].map((n, index) => (
        <span className="avatar" key={n} style={{ zIndex: index + 1 }}>
          <img
            src={asset(`I${n.toString().padStart(2, "0")}`)}
            alt=""
            width="44"
            height="44"
            loading="lazy"
          />
        </span>
      ))}
      <span className="avatar avatar-more">+81</span>
    </div>
  );
}

function Topography() {
  const paths = Array.from({ length: 17 }, (_, index) => {
    const radius = 60 + index * 74;
    const points =
      Array.from({ length: 121 }, (_, n) => {
        const angle = (n / 120) * Math.PI * 2;
        const wave =
          1 +
          0.045 * Math.sin(angle * 6 + index * 0.17) +
          0.025 * Math.cos(angle * 4 - index * 0.12);
        return `${n ? "L" : "M"}${(679 + Math.cos(angle) * radius * wave).toFixed(2)},${(305 + Math.sin(angle) * radius * wave * 0.84).toFixed(2)}`;
      }).join(" ") + "Z";
    return <path key={index} d={points} />;
  });
  return (
    <svg
      className="topography"
      viewBox="0 0 1358 610"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useScene(ref, (rect, height) => {
    const progress = clamp(-rect.top / height);
    ref.current?.style.setProperty(
      "--hero-opacity",
      String(clamp(1 - progress * 1.5)),
    );
    ref.current?.style.setProperty("--hero-shift", `${-progress * 70}px`);
  });
  function move(event: React.PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    portrait.current?.style.setProperty(
      "--px",
      `${(event.clientX / innerWidth - 0.5) * 15}px`,
    );
    portrait.current?.style.setProperty(
      "--py",
      `${(event.clientY / innerHeight - 0.5) * 8}px`,
    );
  }
  return (
    <section
      ref={ref}
      id="inicio"
      className="hero"
      aria-label="Althea — cuidados sutis, confiança visível"
      onPointerMove={move}
    >
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-glow" />
        <Topography />
        <div className="hero-portrait" ref={portrait}>
          <img
            src={asset("I01")}
            alt=""
            width="1090"
            height="1443"
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="hero-copy">
        <h1>Subtle care. Visible confidence.</h1>
        <p>
          Cuidados estéticos e de bem-estar modernos, com uma abordagem suave e
          pessoal.
        </p>
        <Button onClick={onBook} className="hero-cta">
          Comece sua jornada
        </Button>
      </div>
    </section>
  );
}

function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const text =
    "Althea é construída sobre um cuidado natural e respeitoso. Nosso foco está em resultados sutis, tratamentos cuidadosos e bem-estar a longo prazo. Dedicamos tempo para ouvir e entender suas necessidades antes de escolher o que realmente combina com você. Sem pressão, sem extremos — apenas cuidado que ajuda você a se sentir confiante.";
  const words = text.split(" ");
  useScene(ref, (rect) =>
    ref.current?.style.setProperty(
      "--reveal",
      String(reduced || innerWidth < 1200 ? 1 : clamp((-rect.top + 80) / 800)),
    ),
  );
  return (
    <section ref={ref} id="sobre" className="manifesto">
      <div className="manifesto-sticky">
        <div className="manifesto-inner">
          <p aria-label={text} className="manifesto-quote">
            <span aria-hidden="true">
              “
              {words.map((word, i) => (
                <span
                  key={i}
                  style={{ "--i": i / words.length } as CSSProperties}
                >
                  {word}{" "}
                </span>
              ))}
              ”
            </span>
          </p>
          <p className="founder-signature">Dr. Eva Laurent — Fundadora</p>
        </div>
      </div>
    </section>
  );
}

function Services({ onService }: { onService: (id: ServiceId) => void }) {
  const ref = useRef<HTMLElement>(null);
  const carousel = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  useScene(ref, (rect, height) => {
    if (innerWidth < 1200 || reduced) return;
    const progress = clamp(-rect.top / (rect.height - height));
    ref.current?.style.setProperty(
      "--heading-opacity",
      String(clamp(1 - progress * 4)),
    );
    cards.current.forEach((card, i) => {
      const angle = (i - 2) * 13 + 42.5 - progress * 85;
      const radians = (angle * Math.PI) / 180;
      card?.style.setProperty("--card-x", `${2000 * Math.sin(radians)}px`);
      card?.style.setProperty(
        "--card-y",
        `${2000 * (1 - Math.cos(radians)) - 35}px`,
      );
      card?.style.setProperty("--card-angle", `${angle}deg`);
    });
  });
  const goTo = (index: number) => {
    const element = carousel.current;
    if (element)
      element.scrollTo({
        left: index * (element.clientWidth + 8),
        behavior: reduced ? "instant" : "smooth",
      });
    setActive(index);
  };
  function focusCard(index: number) {
    if (innerWidth < 1200 || reduced || !ref.current) return;
    const progress = clamp((42.5 + (index - 2) * 13) / 85);
    const rect = ref.current.getBoundingClientRect();
    scrollTo({
      top: scrollY + rect.top + progress * (rect.height - innerHeight),
      behavior: "smooth",
    });
  }
  const content = (index: number) => (
    <>
      <span className="service-glyph" aria-hidden="true">
        <img
          src={asset(services[index].icon)}
          alt=""
          loading="lazy"
          width="1254"
          height="1254"
        />
      </span>
      <span className="service-text">
        <span className="service-title">{services[index].title}</span>
        <span className="service-description">
          {services[index].description}
        </span>
      </span>
      <span className="service-more">Clique para saber mais</span>
      <span className="card-inner-border" />
    </>
  );
  return (
    <section className="services" id="servicos" ref={ref}>
      <div className="services-heading">
        <SectionHeading
          tag="Nossos Serviços"
          title="Cuidado atencioso, escolhido para você."
        >
          Oferecemos uma gama cuidadosamente selecionada de tratamentos
          estéticos e de bem-estar, focados em resultados naturais e na saúde da
          pele a longo prazo.
        </SectionHeading>
      </div>
      <div className="services-scene">
        <div className="services-arc">
          {services.map((service, i) => (
            <button
              ref={(element) => {
                cards.current[i] = element;
              }}
              key={service.id}
              className="service-card arc-card"
              onClick={() => onService(service.id)}
              onFocus={() => focusCard(i)}
            >
              {content(i)}
            </button>
          ))}
        </div>
      </div>
      <div className="services-touch">
        <div
          ref={carousel}
          className="services-carousel"
          aria-label="Tratamentos"
          onScroll={(event) =>
            setActive(
              Math.round(
                event.currentTarget.scrollLeft /
                  (event.currentTarget.clientWidth + 8),
              ),
            )
          }
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(clamp(active + (event.key === "ArrowRight" ? 1 : -1), 0, 4));
            }
          }}
        >
          {services.map((service, i) => (
            <div className="service-slide" key={service.id}>
              <button
                className="service-card"
                onClick={() => onService(service.id)}
              >
                {content(i)}
              </button>
            </div>
          ))}
        </div>
        <div className="carousel-dots" aria-label="Escolher tratamento">
          {services.map((service, i) => (
            <button
              key={service.id}
              className={active === i ? "active" : ""}
              aria-label={service.short}
              aria-current={active === i ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="journey section-space">
      <SectionHeading title="Your Care Journey.">
        Um processo simples e cuidadoso, projetado para entender suas
        necessidades e guiá-lo em direção a resultados naturais e duradouros.
      </SectionHeading>
      <div className="journey-layout">
        <div className="journey-image">
          <img
            src={asset("I03")}
            alt="Retrato frontal sereno, com luz suave"
            loading="lazy"
            width="1261"
            height="1247"
          />
        </div>
        <div className="journey-steps">
          {[
            {
              title: "Consulta.",
              text: "Começamos com uma conversa calma para entender seus objetivos e preocupações antes de recomendar a abordagem correta.",
            },
            {
              title: "Plano Personalizado.",
              text: "Com base na sua pele, estilo de vida e preferências, criamos um plano cuidadoso projetado para apoiar resultados naturais e equilibrados.",
            },
            {
              title: "Tratamento e Cuidado.",
              text: "Os tratamentos são realizados com precisão e cuidado, seguidos de orientações para apoiar a saúde da pele a longo prazo e manter resultados refinados.",
            },
          ].map((step, i) => (
            <Reveal
              key={step.title}
              className={`journey-step step-${i + 1}`}
              delay={i * 100}
            >
              <span className="step-number" aria-hidden="true">
                0{i + 1}
              </span>
              <div className="step-copy">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultationCTA({ onBook }: { onBook: () => void }) {
  return (
    <section className="consultation-cta section-space">
      <div className="editorial-container consultation-layout">
        <Reveal className="consultation-copy">
          <h2>
            Pronto para começar
            <br />
            seu cuidado?
          </h2>
          <p>
            Cada passo em Althea começa com uma conversa. Juntos, criamos um
            plano que faz sentido para você — calmo, ponderado e focado no
            bem-estar a longo prazo.
          </p>
          <Button onClick={onBook}>Agende uma consulta</Button>
        </Reveal>
        <Reveal className="social-proof" delay={100}>
          <p className="trust-caption">Confiável por 80+ clientes</p>
          <AvatarStack />
          <TrustRating />
          <div className="social-contact">
            <p>
              <a href={`mailto:${email}`}>Envie um e-mail</a> ou entre em
              contato conosco nas redes sociais — estamos sempre felizes em
              ajudar.
            </p>
            <SocialLinks />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="approach section-space">
      <SectionHeading tag="Nossa Abordagem" title="Juntando as peças.">
        Nossa abordagem é construída combinando alguns elementos essenciais.
        Juntos, eles criam uma forma cuidadosa e equilibrada de cuidar de você —
        desde a primeira consulta até o suporte a longo prazo.
      </SectionHeading>
      <div className="bento-grid">
        <Reveal className="bento-card bento-listen">
          <h3>Ouvindo primeiro</h3>
          <p>
            Toda jornada começa com uma conversa de verdade. Dedicamos tempo
            para entender seus objetivos, suas preocupações e o que realmente
            importa para você.
          </p>
        </Reveal>
        <Reveal className="bento-card bento-choices" delay={90}>
          <img
            src={asset("I05")}
            alt=""
            loading="lazy"
            width="1086"
            height="1448"
          />
          <h3>Escolhas cuidadosas</h3>
          <p>
            Recomendamos apenas o que faz sentido para você. Sem tendências, sem
            pressão — apenas tratamentos cuidadosos escolhidos com cuidado.
          </p>
        </Reveal>
        <Reveal className="bento-card bento-results" delay={180}>
          <img
            src={asset("I04")}
            alt=""
            loading="lazy"
            width="1268"
            height="1241"
          />
          <h3>Resultados sutis</h3>
          <p>
            Nosso foco é em resultados com aparência natural. O objetivo é
            ajudar você a parecer renovado e se sentir confiante, nunca
            exagerando.
          </p>
        </Reveal>
        <Reveal className="bento-card bento-long-term" delay={90}>
          <img
            src={asset("I06")}
            alt=""
            loading="lazy"
            width="1086"
            height="1448"
          />
          <h3>Cuidados de longo prazo</h3>
          <p>
            Pensamos além de soluções rápidas. Nossa abordagem apoia a saúde e o
            bem-estar da sua pele ao longo do tempo, não apenas hoje.
          </p>
        </Reveal>
        <Reveal className="bento-card bento-brand" delay={180}>
          <span className="brand">Althea</span>
          <p>Estética e Bem-Estar</p>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const move = (direction: number) =>
    setActive(
      (i) => (i + direction + testimonials.length) % testimonials.length,
    );
  return (
    <section className="testimonials" aria-label="Depoimentos de clientes">
      <div className="testimonial-background" aria-hidden="true">
        What our
        <br />
        clients say
      </div>
      <div
        className="testimonial-stage"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
      >
        <button
          className="round-button previous"
          onClick={() => move(-1)}
          aria-label="Depoimento anterior"
        >
          <Chevron direction="left" />
        </button>
        <div className="testimonial-deck" aria-live="polite" aria-atomic="true">
          {testimonials.map((testimonial, i) => {
            const position =
              (i - active + testimonials.length) % testimonials.length;
            return (
              <article
                className={`testimonial-card deck-position-${position}`}
                aria-hidden={position !== 0}
                key={testimonial.name}
              >
                <span className="card-inner-border" />
                <div className="orange-stars" aria-label="5 estrelas">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} />
                  ))}
                </div>
                <blockquote>{testimonial.quote}</blockquote>
                <p>— {testimonial.name}</p>
              </article>
            );
          })}
        </div>
        <button
          className="round-button next"
          onClick={() => move(1)}
          aria-label="Próximo depoimento"
        >
          <Chevron direction="right" />
        </button>
      </div>
      <TrustRating full />
    </section>
  );
}

function Pricing({ onBook }: { onBook: (service?: ServiceId) => void }) {
  const prices = [
    {
      id: "skin",
      title: (
        <>
          Consulta para a Saúde
          <br />
          da Pele
        </>
      ),
      price: 120,
      text: "Uma avaliação detalhada da pele com orientação personalizada para ajudar você a entender sua pele e escolher a abordagem de cuidado mais adequada.",
    },
    {
      id: "aesthetic",
      title: (
        <>
          Tratamentos
          <br />
          estéticos
        </>
      ),
      price: 250,
      text: "Tratamentos sutis e não invasivos, projetados para renovar sua aparência mantendo resultados naturais e equilibrados.",
    },
    {
      id: "wellness",
      title: (
        <>
          Bem-estar e<br />
          Recuperação
        </>
      ),
      price: 180,
      text: "Tratamentos relaxantes que apoiam a recuperação, reduzem a tensão e restauram um senso natural de equilíbrio para o corpo e a mente.",
    },
    {
      id: "care-plan",
      title: (
        <>
          Plano de Cuidado
          <br />
          Pessoal
        </>
      ),
      price: 350,
      text: "Um programa personalizado que combina tratamentos e orientação profissional para apoiar a saúde da pele e o bem-estar a longo prazo.",
    },
  ] as const;
  return (
    <section id="precos" className="pricing section-space">
      <SectionHeading
        tag="Precificação"
        title={
          <>
            Cuidado atencioso,
            <br />
            preços transparentes.
          </>
        }
      >
        Todo tratamento começa com uma consulta para que possamos entender seus
        objetivos e recomendar o que realmente se encaixa em você.
      </SectionHeading>
      <div className="pricing-grid">
        {prices.map((price, i) => (
          <Reveal key={price.id} delay={i * 100}>
            <button className="price-card" onClick={() => onBook(price.id)}>
              <span className="card-inner-border" />
              <span className="price-heading">{price.title}</span>
              <span className="price-value">
                <span>de</span>
                <strong>${price.price}</strong>
              </span>
              <span className="price-description">{price.text}</span>
              <span className="sr-only">Solicitar consulta</span>
            </button>
          </Reveal>
        ))}
      </div>
      <Reveal className="section-cta">
        <p>
          O preço final pode variar dependendo da sua consulta pessoal e
          <br className="desktop-break" /> do plano de tratamento.
        </p>
        <Button onClick={() => onBook()}>Agende sua consulta</Button>
      </Reveal>
    </section>
  );
}

function Counter({ value, children }: { value: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [number, setNumber] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduced) {
          setNumber(value);
          return;
        }
        const start = performance.now();
        const step = (time: number) => {
          const progress = clamp((time - start) / 1700);
          setNumber(Math.round(value * (1 - (1 - progress) ** 3)));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, reduced]);
  return (
    <div ref={ref} className="metric">
      <span className="metric-number" aria-label={`${value} ou mais`}>
        <span aria-hidden="true">{number}+</span>
      </span>
      <p>{children}</p>
    </div>
  );
}

function Metrics({ onBook }: { onBook: () => void }) {
  return (
    <section className="metrics section-space">
      <div className="metrics-row">
        <Counter value={9}>
          Anos de experiência em cuidados estéticos e de bem-estar
        </Counter>
        <Counter value={320}>
          Clientes apoiados com atenção pessoal e cuidadosa
        </Counter>
        <Counter value={20}>
          Serviços cuidadosamente selecionados e revisados regularmente
        </Counter>
      </div>
      <Reveal className="metrics-bottom">
        <p>
          Por trás de cada tratamento há tempo, atenção e trabalho cuidadoso.
          Esses marcos refletem uma prática focada em qualidade, confiança e
          cuidados de longo prazo.
        </p>
        <Button onClick={onBook}>Comece sua jornada</Button>
      </Reveal>
    </section>
  );
}

function Journal({ onArticle }: { onArticle: (id: string) => void }) {
  return (
    <section id="revista" className="journal section-space editorial-container">
      <SectionHeading
        tag="Nosso Diário"
        title="Insights para cuidados cuidadosos."
      >
        Notas sobre saúde da pele, tratamentos estéticos e maneiras simples de
        apoiar o bem-estar a longo prazo.
      </SectionHeading>
      <div className="journal-grid">
        {articles.map((article, i) => (
          <Reveal
            key={article.id}
            delay={i * 100}
            className={`journal-item journal-item-${i}`}
          >
            <button
              className="article-card"
              onClick={() => onArticle(article.id)}
            >
              <div className="article-image">
                <img
                  src={asset(article.image)}
                  alt={
                    i === 0
                      ? "Plumas secas delicadas sob a luz de uma janela"
                      : "Close-up de uma pele luminosa sob luz suave"
                  }
                  loading="lazy"
                  width="1254"
                  height="1254"
                />
                <span className="article-category">{article.category}</span>
              </div>
              <div className="article-copy">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <Reveal className="section-cta">
        <p>
          Explore mais artigos em nosso periódico e descubra insights
          <br className="desktop-break" /> práticos para um cuidado cuidadoso e
          duradouro.
        </p>
        <Button onClick={() => onArticle(articles[0].id)}>
          Navegue por insights
        </Button>
      </Reveal>
    </section>
  );
}

function FAQ() {
  const [opened, setOpened] = useState(new Set([0, 7]));
  const prefix = useId();
  const toggle = (i: number) =>
    setOpened((current) => {
      const next = new Set(current);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <section id="perguntas" className="faq section-space editorial-container">
      <SectionHeading
        tag="Perguntas Frequentes"
        title="Suas perguntas, respondidas."
      >
        Tudo o que você precisa saber antes de reservar sua visita.
      </SectionHeading>
      <div className="faq-grid">
        {[0, 1].map((column) => (
          <div className="faq-column" key={column}>
            {faqs.slice(column * 4, column * 4 + 4).map((faq, offset) => {
              const i = column * 4 + offset;
              return (
                <Reveal key={faq.q} delay={offset * 45}>
                  <article
                    className={`faq-item ${opened.has(i) ? "is-open" : ""}`}
                  >
                    <h3>
                      <button
                        id={`${prefix}-question-${i}`}
                        aria-expanded={opened.has(i)}
                        aria-controls={`${prefix}-answer-${i}`}
                        onClick={() => toggle(i)}
                      >
                        <span>{faq.q}</span>
                        <span className="faq-plus" aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="faq-answer-wrap"
                      id={`${prefix}-answer-${i}`}
                      role="region"
                      aria-labelledby={`${prefix}-question-${i}`}
                      inert={!opened.has(i)}
                    >
                      <div className="faq-answer">
                        {faq.a.map((text) => (
                          <p key={text}>{text}</p>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        ))}
      </div>
      <Reveal className="contact-note">
        <p>
          Não encontrou o que procurava? Entre em contato e vamos resolver isso.
        </p>
        <a href={`mailto:${email}`}>{email}</a>
      </Reveal>
    </section>
  );
}

async function postForm(path: string, body: unknown) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Não foi possível enviar agora. Tente novamente em instantes.",
    );
  }
  if (!response.ok)
    throw new Error(data.error || "Não foi possível enviar agora.");
  return data;
}

function Newsletter({ onLegal }: { onLegal: () => void }) {
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("pending");
    setMessage("");
    try {
      const data = await postForm("/api/newsletter", {
        email: new FormData(form).get("email"),
      });
      setState("success");
      setMessage(data.message);
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Tente novamente.");
    }
  }
  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <Reveal>
        <h2 id="newsletter-title">Uma nota discreta de Althea.</h2>
        <p className="newsletter-description">
          Atualizações ocasionais sobre saúde da pele, cuidados
          <br className="desktop-break" /> atentos e formas simples de apoiar
          seu bem-estar.
        </p>
      </Reveal>
      <Reveal className="newsletter-form-wrap">
        <form onSubmit={submit} className="newsletter-form">
          <label className="email-field">
            <span className="sr-only">Seu e-mail</span>
            <input
              type="email"
              name="email"
              placeholder="Digite seu e-mail"
              required
              maxLength={254}
              autoComplete="email"
              disabled={state === "pending"}
            />
          </label>
          <Button type="submit" disabled={state === "pending"}>
            {state === "pending" ? "Enviando…" : "Assine"}
          </Button>
        </form>
        <p
          className={`form-feedback ${state === "error" ? "is-error" : ""}`}
          role="status"
        >
          {message}
        </p>
        <p className="newsletter-consent">
          Ao assinar, você concorda em receber e-mails da Althea. Você pode
          cancelar
          <br className="desktop-break" /> a inscrição a qualquer momento.{" "}
          <button className="text-button" onClick={onLegal}>
            Leia nossa Política de Privacidade.
          </button>
        </p>
      </Reveal>
    </section>
  );
}

function Footer({
  onBook,
  onArticle,
  onLegal,
}: {
  onBook: () => void;
  onArticle: (id: string) => void;
  onLegal: (page: "privacy" | "terms" | "cookies") => void;
}) {
  return (
    <footer id="contato" className="site-footer">
      <Newsletter onLegal={() => onLegal("privacy")} />
      <div className="footer-bottom">
        <div className="footer-panels editorial-container">
          <Reveal className="footer-panel sitemap">
            <p className="panel-label">Sitemap</p>
            <div className="sitemap-columns">
              <div>
                <a href="#inicio">Casa</a>
                <a href="#sobre">Sobre</a>
                <a href="#servicos">Serviços</a>
                <a href="#revista">Revista</a>
              </div>
              <div>
                <button onClick={() => onArticle(articles[0].id)}>
                  Artigo
                </button>
                <a href={`mailto:${email}`}>Contato</a>
                <button onClick={onBook}>Agende uma sessão</button>
                <a href="/404">404</a>
              </div>
            </div>
          </Reveal>
          <Reveal className="footer-panel legal-panel" delay={100}>
            <p className="panel-label">Jurídico</p>
            <div>
              <button onClick={() => onLegal("privacy")}>
                Política de Privacidade
              </button>
              <button onClick={() => onLegal("terms")}>Termos de Uso</button>
              <button onClick={() => onLegal("cookies")}>
                Política de Cookies
              </button>
            </div>
          </Reveal>
        </div>
        <Reveal className="contact-note">
          <p>
            Não encontrou o que procurava? Entre em contato e vamos resolver
            isso.
          </p>
          <a href={`mailto:${email}`}>{email}</a>
        </Reveal>
        <Reveal className="footer-socials">
          <SocialLinks />
        </Reveal>
        <div className="copyright">
          <p>
            Direitos autorais {new Date().getFullYear()} Althea. Todos os
            direitos reservados.
          </p>
          <p>
            Framer Template feito à mão por{" "}
            <a href="https://templatoria.com/" target="_blank" rel="noreferrer">
              Anton Drukarov
            </a>
          </p>
          <a
            className="framer-mark"
            href="https://www.framer.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Framer"
          >
            <svg
              width="22"
              height="33"
              viewBox="0 0 24 36"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 0h24v12H12L0 0Zm0 12h12l12 12H0V12Zm0 12h12v12L0 24Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

function Dialog({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = saved;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={headingId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="modal-close"
        onClick={onClose}
        aria-label="Fechar janela"
      >
        <span aria-hidden="true">×</span>
      </button>
      <h2 id={headingId}>{title}</h2>
      {children}
    </dialog>,
    document.body,
  );
}

function Booking({
  service = "consultation",
  onClose,
}: {
  service?: ServiceId;
  onClose: () => void;
}) {
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const today = new Date().toLocaleDateString("en-CA");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("pending");
    setMessage("");
    try {
      const data = await postForm("/api/appointments", {
        name: form.get("name"),
        email: form.get("email"),
        service: form.get("service"),
        date: form.get("date"),
        notes: form.get("notes"),
        consent: form.get("consent") === "on",
      });
      setReceipt(data.id.slice(0, 8).toUpperCase());
      setState("success");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Tente novamente.");
    }
  }
  return (
    <Dialog
      title={
        state === "success"
          ? "O primeiro passo está dado."
          : "Seu cuidado começa com uma conversa."
      }
      onClose={onClose}
      className="booking-modal"
    >
      {state === "success" ? (
        <div className="booking-success" role="status">
          <span className="success-mark" aria-hidden="true">
            ✓
          </span>
          <p>Seu pedido de consulta foi registrado.</p>
          <p>
            Para confirmar a disponibilidade e combinar os próximos passos,
            entre em contato pelo e-mail{" "}
            <a href={`mailto:${email}?subject=Consulta%20${receipt}`}>
              {email}
            </a>
            .
          </p>
          <p className="receipt">Seu registro: {receipt}</p>
          <Button onClick={onClose}>Até breve</Button>
        </div>
      ) : (
        <>
          <p className="modal-intro">
            Conte um pouco sobre você. Vamos encontrar um caminho que faça
            sentido para o seu momento.
          </p>
          <form className="booking-form" onSubmit={submit}>
            <label>
              Seu nome
              <input
                name="name"
                autoComplete="name"
                placeholder="Como podemos chamar você?"
                required
                minLength={2}
                maxLength={120}
                disabled={state === "pending"}
              />
            </label>
            <label>
              Seu e-mail
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                required
                maxLength={254}
                disabled={state === "pending"}
              />
            </label>
            <div className="form-row">
              <label>
                Cuidado que procura
                <select
                  name="service"
                  defaultValue={service}
                  disabled={state === "pending"}
                >
                  {services.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.short}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Data de preferência <span>(opcional)</span>
                <input
                  type="date"
                  name="date"
                  min={today}
                  disabled={state === "pending"}
                />
              </label>
            </div>
            <label>
              Algo que gostaria de compartilhar? <span>(opcional)</span>
              <textarea
                name="notes"
                rows={3}
                maxLength={1000}
                placeholder="Seus objetivos, suas dúvidas, seu momento."
                disabled={state === "pending"}
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="consent"
                required
                disabled={state === "pending"}
              />
              <span>
                Autorizo o contato da Althea sobre meu pedido de consulta.
              </span>
            </label>
            <p className="booking-note">
              A data escolhida é uma preferência. O atendimento depende de
              confirmação de disponibilidade.
            </p>
            <p className="form-feedback is-error" role="status">
              {message}
            </p>
            <Button type="submit" disabled={state === "pending"}>
              {state === "pending"
                ? "Registrando…"
                : "Solicitar minha consulta"}
            </Button>
          </form>
        </>
      )}
    </Dialog>
  );
}

function Legal({
  page,
  onClose,
}: {
  page: "privacy" | "terms" | "cookies";
  onClose: () => void;
}) {
  const content = {
    privacy: {
      title: "Política de Privacidade",
      paragraphs: [
        "Ao solicitar uma consulta, você fornece nome, e-mail, cuidado desejado e, se quiser, uma data de preferência e uma mensagem. Esses dados são registrados para organizar sua solicitação. Não inclua informações médicas sensíveis no formulário.",
        "Ao assinar a newsletter, seu e-mail é registrado na lista de interesse. O site não envia mensagens automaticamente nem compartilha esses dados com ferramentas de marketing.",
        `Para solicitar acesso, correção ou exclusão dos seus dados, entre em contato pelo e-mail ${email}.`,
      ],
    },
    terms: {
      title: "Termos de Uso",
      paragraphs: [
        "O conteúdo deste site apresenta a abordagem e os cuidados da Althea. A indicação de um tratamento depende de avaliação individual.",
        "Os preços apresentados são valores iniciais e podem variar conforme a consulta e o plano de cuidado. Solicitar uma consulta pelo site não confirma um horário nem exige pagamento.",
        `Para informações sobre atendimento e disponibilidade, entre em contato pelo e-mail ${email}.`,
      ],
    },
    cookies: {
      title: "Política de Cookies",
      paragraphs: [
        "Esta versão do site não utiliza cookies de publicidade ou ferramentas de rastreamento.",
        "Os formulários enviam apenas os dados que você escolhe fornecer. Links de redes sociais e sites externos possuem suas próprias políticas de privacidade.",
      ],
    },
  }[page];
  return (
    <Dialog title={content.title} onClose={onClose} className="reading-modal">
      <div className="reading-copy">
        {content.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <Button onClick={onClose}>Voltar ao site</Button>
    </Dialog>
  );
}

function SoundToggle() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  async function toggle() {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
      return;
    }
    try {
      ref.current.volume = 0.25;
      await ref.current.play();
      setPlaying(true);
      setError(false);
    } catch {
      setError(true);
    }
  }
  useEffect(
    () => () => {
      ref.current?.pause();
    },
    [],
  );
  return (
    <div className="sound-control">
      <audio ref={ref} src="/assets/ambient.mp3" loop preload="none" />
      <button
        aria-pressed={playing}
        aria-label={playing ? "Desativar som ambiente" : "Ativar som ambiente"}
        onClick={toggle}
      >
        <span
          className={`sound-bars ${playing ? "is-playing" : ""}`}
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} style={{ "--bar": i } as CSSProperties} />
          ))}
        </span>
      </button>
      <span>
        {error ? (
          <>
            Som indisponível
            <br />
            Tente novamente
          </>
        ) : (
          <>
            Experience
            <br />
            with sound
          </>
        )}
      </span>
    </div>
  );
}

function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useScene(headerRef, () =>
    headerRef.current?.style.setProperty(
      "--nav-shade",
      String(clamp(scrollY / 200)),
    ),
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const links = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("a,button") || [],
      );
      const first = links[0],
        last = links[links.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === toggleRef.current)
      ) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        toggleRef.current?.focus();
      }
    };
    const resize = () => {
      if (innerWidth >= 1200) setOpen(false);
    };
    addEventListener("keydown", key);
    addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      removeEventListener("keydown", key);
      removeEventListener("resize", resize);
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [open]);
  const nav = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#revista", label: "Revista" },
    { href: "#contato", label: "Contato" },
  ];
  return (
    <>
      <header
        ref={headerRef}
        className={`site-header ${open ? "menu-is-open" : ""}`}
      >
        <a
          className="brand"
          href="#inicio"
          aria-label="Althea — início"
          onClick={() => setOpen(false)}
        >
          Althea
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {nav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <Button light onClick={onBook} className="header-cta">
          Agende uma consulta
        </Button>
        <button
          ref={toggleRef}
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </header>
      {open && (
        <div
          id="mobile-menu"
          className="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navegação"
        >
          <nav aria-label="Navegação móvel">
            {nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button
            light
            onClick={() => {
              setOpen(false);
              onBook();
            }}
          >
            Agende sua sessão
          </Button>
        </div>
      )}
    </>
  );
}

function TemplatePromo() {
  if (import.meta.env.VITE_SHOW_TEMPLATE_PROMO === "false") return null;
  return (
    <a
      className="template-promo"
      href="https://framer.link/drukarov"
      target="_blank"
      rel="noreferrer"
      aria-label="Conheça o template original de Anton Drukarov"
    >
      <img
        src={asset("I14")}
        alt="Prévia de um template de site"
        width="1448"
        height="1086"
        loading="lazy"
      />
      <span>Adquira este modelo</span>
    </a>
  );
}

export default function App() {
  const [modal, setModal] = useState<ModalState>(null);
  const book = (service?: ServiceId) => setModal({ type: "booking", service });
  const knownPaths = [
    "/",
    "/about",
    "/services",
    "/journal",
    "/contact",
    "/book-a-consultation",
  ];
  const path = location.pathname.replace(/\/$/, "") || "/";
  const notFound = !knownPaths.includes(path);
  useEffect(() => {
    if (path === "/book-a-consultation") setModal({ type: "booking" });
    const anchors: Record<string, string> = {
      "/about": "sobre",
      "/services": "servicos",
      "/journal": "revista",
      "/contact": "contato",
    };
    if (anchors[path])
      requestAnimationFrame(() =>
        document.getElementById(anchors[path])?.scrollIntoView(),
      );
  }, [path]);
  const activeService =
    modal?.type === "service"
      ? services.find((service) => service.id === modal.id)
      : undefined;
  const activeArticle =
    modal?.type === "article"
      ? articles.find((article) => article.id === modal.id)
      : undefined;
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="ambient-background" aria-hidden="true" />
      <div id="site-content">
        <Header onBook={() => book()} />
        {notFound ? (
          <main className="not-found">
            <span className="eyebrow">404</span>
            <h1>Uma pausa no caminho.</h1>
            <p>
              Esta página não foi encontrada. Seu cuidado continua por aqui.
            </p>
            <a className="pill-button" href="/">
              Voltar ao início
            </a>
          </main>
        ) : (
          <>
            <main id="conteudo">
              <Hero onBook={() => book()} />
              <Manifesto />
              <Services onService={(id) => setModal({ type: "service", id })} />
              <Journey />
              <ConsultationCTA onBook={() => book()} />
              <Approach />
              <Testimonials />
              <Pricing onBook={book} />
              <Metrics onBook={() => book()} />
              <Journal onArticle={(id) => setModal({ type: "article", id })} />
              <FAQ />
            </main>
            <Footer
              onBook={() => book()}
              onArticle={(id) => setModal({ type: "article", id })}
              onLegal={(page) => setModal({ type: "legal", page })}
            />
            <SoundToggle />
            <TemplatePromo />
          </>
        )}
      </div>
      {modal?.type === "booking" && (
        <Booking service={modal.service} onClose={() => setModal(null)} />
      )}
      {activeService && (
        <Dialog
          title={activeService.short}
          onClose={() => setModal(null)}
          className="service-modal"
        >
          <div className="modal-glyph">
            <img
              src={asset(activeService.icon)}
              alt=""
              width="1254"
              height="1254"
            />
          </div>
          <p className="modal-intro">{activeService.detail}</p>
          <p className="service-modal-price">
            A partir de <strong>${activeService.price}</strong>
          </p>
          <p className="booking-note">
            A escolha do cuidado e o valor final são definidos na consulta.
          </p>
          <Button onClick={() => book(activeService.id)}>
            Comece com uma conversa
          </Button>
        </Dialog>
      )}
      {activeArticle && (
        <Dialog
          title={activeArticle.title}
          onClose={() => setModal(null)}
          className="reading-modal article-modal"
        >
          <span className="eyebrow">{activeArticle.category}</span>
          <img
            className="reading-image"
            src={asset(activeArticle.image)}
            alt=""
            width="1254"
            height="1254"
          />
          <div className="reading-copy">
            {activeArticle.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Button onClick={() => book()}>Converse com a Althea</Button>
        </Dialog>
      )}
      {modal?.type === "legal" && (
        <Legal page={modal.page} onClose={() => setModal(null)} />
      )}
    </>
  );
}
