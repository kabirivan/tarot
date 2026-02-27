# 🔮✨ Mystic Tarot - Aplicación de Lectura de Tarot

<div align="center">

![Tarot Banner](https://via.placeholder.com/800x200/8B5CF6/FFFFFF?text=Mystic+Tarot)

**Una experiencia de lectura de tarot moderna, mística y cautivadora**

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Acceso libre • Sin registro • Sin base de datos**

[Demo en Vivo](#) • [Documentación](#características) • [Reporte de Bugs](#)

</div>

---

## 📖 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características](#-características)
- [Vista Previa](#-vista-previa)
- [Tecnologías](#️-tecnologías)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🌟 Sobre el Proyecto

**Mystic Tarot** es una aplicación web moderna que combina la sabiduría ancestral del tarot con tecnología de vanguardia. **Acceso libre**: no requiere registro ni base de datos. El historial se guarda en tu navegador (localStorage).

### ✨ Características Destacadas

- **🔓 Acceso Libre**: Sin login, sin cuentas, sin backend. Entra y usa.
- **🎴 Cartas Holográficas**: Efectos CSS que crean un brillo místico y holográfico
- **🌙 Múltiples Spreads**: Carta del Día, 3 Cartas (Pasado-Presente-Futuro) y Cruz Celta
- **📱 Totalmente Responsive**: Experiencia en móvil, tablet y desktop
- **🎨 Interfaz Mística**: Diseño dark con paleta púrpura/dorado/rosa
- **📚 Historial en el Navegador**: Guarda y revisa lecturas (Zustand + localStorage)
- **🔮 78 Cartas**: Arcanos Mayores y Menores con interpretaciones en español

---

## 🎯 Características

### 🃏 Tipos de Lectura

| Spread | Cartas | Descripción |
|--------|--------|-------------|
| **Carta del Día** | 1 | Orientación diaria rápida |
| **Pasado-Presente-Futuro** | 3 | Visión temporal de tu situación |
| **Cruz Celta** | 10 | Lectura profunda y completa |
| **Pregunta Específica** | 1-5 | Respuesta personalizada |
| **Lectura Lunar** | Variable | Conectada con fases lunares |

### 🎨 Efectos Visuales

- ✨ **Efecto Holográfico**: Cartas con brillo rainbow al mover el mouse
- 🌈 **Animaciones Fluidas**: Transiciones suaves y naturales
- ⭐ **Partículas Mágicas**: Efectos de partículas flotantes en el fondo
- 🔄 **Flip 3D**: Volteo de cartas con perspectiva realista
- 💫 **Glow Effects**: Resplandor místico en hover

### 📊 Funcionalidades

- 🤖 **Interpretación con IA**: Usa Groq (Llama 3.3, gratis) para interpretar lecturas de forma personalizada.
- 💾 **Historial local**: Las lecturas se guardan en tu navegador (persistencia con Zustand).
- 🌍 **Español**: Nombres, significados e interpretaciones completamente en español.
- 📤 **Exportar / Diario / PWA**: Próximamente en el roadmap.

---

## 🖼️ Vista Previa

### 🏠 Dashboard Principal
```
┌─────────────────────────────────────────────┐
│  🌙 Mystic Tarot                    👤 User │
├─────────────────────────────────────────────┤
│                                             │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│   │ Daily   │  │ 3-Card  │  │ Celtic  │   │
│   │  Card   │  │ Spread  │  │ Cross   │   │
│   └─────────┘  └─────────┘  └─────────┘   │
│                                             │
│   Recent Readings:                          │
│   • The Fool - Today 3:45 PM               │
│   • Celtic Cross - Yesterday               │
│                                             │
└─────────────────────────────────────────────┘
```

### 🎴 Lectura de Cartas
```
┌─────────────────────────────────────────────┐
│             ✨ Select Your Card ✨          │
├─────────────────────────────────────────────┤
│                                             │
│     [💫]  [💫]  [💫]  [💫]  [💫]          │
│     Card  Card  Card  Card  Card            │
│                                             │
│  "Focus on your question and choose..."     │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Tecnologías

### Frontend
- **[Next.js 14+](https://nextjs.org/)** - App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones

### Estado y persistencia
- **[Zustand](https://github.com/pmndrs/zustand)** - Estado global e historial (persistido en localStorage). Sin backend.

### Librerías adicionales
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones
- **[Howler.js](https://howlerjs.com/)** - Audio opcional
- **[jsPDF](https://github.com/parallax/jsPDF)** - Exportación a PDF (próximamente)

---

## 🚀 Instalación

### Prerequisitos

- Node.js 18+
- npm, yarn, pnpm o bun

### Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/mystic-tarot.git
cd mystic-tarot
```

2. **Instala dependencias**
```bash
npm install
```

3. **(Opcional) Interpretación con IA** – obtén una API key gratuita en [console.groq.com](https://console.groq.com):
```bash
cp .env.example .env.local
```
Edita `.env.local` y pega tu key:
```env
GROQ_API_KEY=gsk_tu_key_aqui
```
Sin esta key la app funciona perfectamente, solo no tendrás el botón de interpretación con IA.

4. **Inicia el servidor**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). **No se necesita base de datos ni registro.**

---

## ⚙️ Configuración

### 🤖 IA (Groq - Gratis)

La interpretación con IA usa **Groq** con el modelo **Llama 3.3 70B**. Es completamente gratuito:
1. Crea una cuenta en [console.groq.com](https://console.groq.com) (gratis, sin tarjeta).
2. Genera una API key.
3. Agrégala en `.env.local` como `GROQ_API_KEY`.

### 💾 Historial

No se usa base de datos. El historial se guarda en el navegador con **Zustand** (persist middleware) en la clave `mystic-tarot-readings`.

### 🎴 Imágenes de Cartas

Las cartas se configuran en `lib/cards/tarotDeck.ts`:
```typescript
export const tarotDeck = {
  major: [
    {
      id: 0,
      name: "The Fool",
      image: "/cards/major/00-fool.webp",
      keywords: ["new beginnings", "innocence", "spontaneity"],
      upright: "New beginnings, optimism, trust in life",
      reversed: "Recklessness, taken advantage of, inconsideration"
    },
    // ... 21 cartas más
  ],
  // ... palos menores
}
```

---

## 📘 Uso

### Realizar una Lectura
```typescript
// Ejemplo de uso del hook personalizado
import { useTarotReading } from '@/hooks/useTarotReading';

function ReadingPage() {
  const { 
    shuffleDeck, 
    drawCards, 
    selectedCards,
    saveReading 
  } = useTarotReading('celtic-cross');

  const handleDrawCard = () => {
    const cards = drawCards(10);
    // Cartas ahora disponibles en selectedCards
  };

  return (
    <button onClick={handleDrawCard}>
      Draw Cards
    </button>
  );
}
```

### Crear Efecto Holográfico
```tsx
import HolographicCard from '@/components/cards/HolographicCard';

<HolographicCard
  imageSrc="/cards/major/00-fool.webp"
  name="The Fool"
  onReveal={(card) => console.log('Card revealed:', card)}
/>
```

---

## 📁 Estructura del Proyecto
```
mystic-tarot/
├── src/
│   ├── app/
│   │   ├── dashboard/           # Inicio y elección de spread
│   │   ├── reading/
│   │   │   ├── daily/
│   │   │   ├── three-card/
│   │   │   └── celtic-cross/
│   │   ├── history/             # Historial local
│   │   ├── layout.tsx
│   │   └── page.tsx             # Landing
│   ├── components/
│   │   ├── cards/
│   │   │   ├── HolographicCard.tsx
│   │   │   ├── CardDeck.tsx
│   │   │   ├── CardFlip.tsx
│   │   │   └── MagicParticles.tsx
│   │   ├── spreads/
│   │   │   ├── DailyCard.tsx
│   │   │   ├── ThreeCard.tsx
│   │   │   └── CelticCross.tsx
│   │   ├── dashboard/
│   │   │   └── RecentReadings.tsx
│   │   └── layout/
│   │       └── Header.tsx
│   ├── lib/
│   │   ├── cards/
│   │   │   ├── tarotDeck.ts
│   │   │   ├── meanings.ts
│   │   │   └── spreads.ts
│   │   ├── store/
│   │   │   └── readingsStore.ts  # Zustand + persist
│   │   └── utils/
│   ├── hooks/
│   │   ├── useTarotReading.ts
│   │   ├── useCardAnimation.ts
│   │   └── useAudio.ts
│   ├── types/
│   │   └── tarot.ts
│   └── styles/
│       ├── globals.css
│       ├── holographic.css
│       └── animations.css
├── public/
│   ├── cards/                   # Imágenes .webp (opcional)
│   │   ├── major/
│   │   └── minor/
│   └── audio/                   # Opcional
├── scripts/
│   └── download-cards.js        # Crea carpetas de cartas
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🗺️ Roadmap

### ✅ Fase 1: MVP (Completado)
- [x] 78 cartas (Arcanos Mayores y Menores)
- [x] Carta del Día, 3 Cartas y Cruz Celta
- [x] Efecto holográfico en cartas
- [x] Diseño responsive y dark
- [x] Historial local (Zustand + localStorage)
- [x] Acceso libre, sin registro ni base de datos

### 📋 Fase 2: Próximamente
- [ ] Imágenes de cartas (Rider-Waite o propias)
- [ ] Audio ambiente y efecto al voltear carta
- [ ] Exportar lectura a PDF
- [ ] Modo aprendizaje / tutorial

### 🔮 Fase 3: Futuro
- [ ] Diario personal (solo local)
- [ ] PWA / modo offline
- [ ] Más spreads (pregunta específica, lunar)

---

## 🎨 Paleta de Colores
```css
:root {
  --primary: #8B5CF6;        /* Púrpura místico */
  --secondary: #F59E0B;      /* Dorado cálido */
  --accent: #EC4899;         /* Rosa mágico */
  --dark: #0F0A1F;           /* Negro profundo */
  --light: #FAF8FF;          /* Blanco perla */
  --success: #10B981;        /* Verde esmeralda */
  
  /* Gradientes */
  --gradient-primary: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
  --gradient-dark: linear-gradient(180deg, #0F0A1F 0%, #1E1B4B 100%);
}
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Aquí cómo puedes ayudar:

1. **Fork** el proyecto
2. Crea tu **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la branch (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### 📋 Guías de Contribución

- Sigue el estilo de código existente
- Escribe tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario
- Usa commits semánticos: `feat:`, `fix:`, `docs:`, etc.

---

## 🐛 Reportar Bugs

Encontraste un bug? [Abre un issue](https://github.com/tu-usuario/mystic-tarot/issues) con:

- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si es aplicable
- Información del navegador/sistema

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Allient** - *Desarrollador Principal*

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@ejemplo.com

---

## 🙏 Agradecimientos

- **Rider-Waite-Smith Tarot** - Imágenes de dominio público
- **Anthropic Claude** - Asistencia en desarrollo
- **Comunidad Open Source** - Por las increíbles librerías

---

## 📚 Recursos Adicionales

- [Documentación del Tarot](https://www.sacred-texts.com/tarot/)
- [Guía de Next.js](https://nextjs.org/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

<div align="center">

**¿Te gusta el proyecto? ¡Dale una ⭐ en GitHub!**

Hecho con 💜 y mucha ✨ magia

</div>