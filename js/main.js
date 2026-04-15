const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

if (links.length > 0) {
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        });
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// DÉSACTIVÉ - Les éléments sont visibles immédiatement
// const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat');
// if (animatedElements.length > 0) {
//     animatedElements.forEach(el => {
//         el.style.opacity = '0';
//         el.style.transform = 'translateY(30px)';
//         el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//         observer.observe(el);
//     });
// }

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
if (smoothScrollLinks.length > 0) {
    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

const downloadCVBtn = document.getElementById('downloadCVBtn');
const downloadCV = document.getElementById('downloadCV');

function handleCVDownload(e) {
    e.preventDefault();
    window.open('images/CV-KAKPO-Rosaire.pdf', '_blank');
}

if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', handleCVDownload);
}

if (downloadCV) {
    downloadCV.addEventListener('click', handleCVDownload);
}

const whatsappForm = document.getElementById('whatsappForm');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const message = document.getElementById('userMessage').value;
        
        if (name && message) {
            const whatsappMessage = `Bonjour, je suis ${name}. ${message}`;
            const whatsappURL = `https://wa.me/22901168812019?text=${encodeURIComponent(whatsappMessage)}`;
            
            window.open(whatsappURL, '_blank');
            
            whatsappForm.reset();
        }
    });
}


// ========================================
// MODE SOMBRE / DARK MODE
// ========================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Charger le thème sauvegardé ou utiliser le thème système
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
const currentTheme = savedTheme || systemTheme;

// Appliquer le thème au chargement
html.setAttribute('data-theme', currentTheme);

// Toggle du thème
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animation du bouton
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

// Détecter les changements de préférence système
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

// ========================================
// FILTRES DE PROJETS
// ========================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            // Obtenir la catégorie du filtre
            const filterValue = button.getAttribute('data-filter');
            
            // Filtrer les projets
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                    card.classList.add('show');
                } else {
                    if (categories && categories.includes(filterValue)) {
                        card.classList.remove('hidden');
                        card.classList.add('show');
                    } else {
                        card.classList.add('hidden');
                        card.classList.remove('show');
                    }
                }
            });
            
            // Animation de comptage
            const visibleProjects = document.querySelectorAll('.project-card:not(.hidden)').length;
            console.log(`${visibleProjects} projet(s) affiché(s)`);
        });
    });
}

// ========================================
// ANALYTICS & TRACKING
// ========================================

// Tracker les clics sur les projets
projectCards.forEach(card => {
    const projectName = card.getAttribute('data-project');
    const projectLinks = card.querySelectorAll('a, button');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Log pour analytics (à remplacer par Google Analytics)
            console.log(`Projet cliqué: ${projectName}`);
            
            // Si vous avez Google Analytics:
            // gtag('event', 'project_click', {
            //     'project_name': projectName,
            //     'link_type': link.classList.contains('project-github') ? 'github' : 'live'
            // });
        });
    });
});

// Tracker le temps passé sur la page
let startTime = Date.now();

window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    console.log(`Temps passé sur le site: ${timeSpent} secondes`);
    
    // Si vous avez Google Analytics:
    // gtag('event', 'time_on_site', {
    //     'value': timeSpent
    // });
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

// Mesurer le temps de chargement
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page chargée en ${Math.round(loadTime)}ms`);
    
    // Afficher un indicateur si le chargement est lent
    if (loadTime > 3000) {
        console.warn('⚠️ Temps de chargement élevé. Optimisation recommandée.');
    }
});

// ========================================
// EASTER EGG
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activé!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 Easter Egg trouvé! Tu es un vrai geek! 🚀');
        }, 2000);
    }
});

// Animation rainbow pour l'easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ========================================
// AMÉLIORATION DE L'ACCESSIBILITÉ
// ========================================

// Annoncer les changements de filtre aux lecteurs d'écran
const announceFilterChange = (filterName, count) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Filtre ${filterName} appliqué. ${count} projet(s) affiché(s).`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
};

// Ajouter la classe sr-only au CSS si elle n'existe pas
if (!document.querySelector('style[data-sr-only]')) {
    const srStyle = document.createElement('style');
    srStyle.setAttribute('data-sr-only', 'true');
    srStyle.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    `;
    document.head.appendChild(srStyle);
}


// ========================================
// ANIMATION DES BARRES DE COMPÉTENCES
// ========================================

// Afficher les barres immédiatement au chargement
window.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
});

// Animation au scroll (optionnel)
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillsSection = document.getElementById('competences');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}


// ========================================
// SYSTÈME DE BLOG
// ========================================

const blogPosts = {
    'react-performance': {
        title: 'Optimiser les performances React : 10 techniques essentielles',
        date: '10 Avril 2026',
        category: 'Frontend',
        reading: '5 min',
        content: `
            <h1>Optimiser les performances React : 10 techniques essentielles</h1>
            <div class="post-meta">
                <span>10 Avril 2026</span>
                <span>5 min de lecture</span>
                <span>Frontend</span>
            </div>
            
            <p>Dans le développement d'applications React modernes, la performance n'est plus une option mais une nécessité. Après avoir optimisé plusieurs projets en production, j'ai identifié 10 techniques qui ont systématiquement amélioré les performances de 40% en moyenne.</p>
            
            <h2>1. Lazy Loading et Code Splitting</h2>
            <p>Le lazy loading permet de charger les composants uniquement lorsqu'ils sont nécessaires, réduisant ainsi le bundle initial. React.lazy() combiné avec Suspense offre une solution élégante :</p>
            <pre><code>const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Dashboard />
    </Suspense>
  );
}</code></pre>
            
            <h2>2. Mémoïsation avec useMemo et useCallback</h2>
            <p>Ces hooks permettent d'éviter les recalculs coûteux et les re-rendus inutiles. useMemo mémoïse les valeurs calculées, tandis que useCallback mémoïse les fonctions.</p>
            <pre><code>const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);</code></pre>
            
            <h2>3. Virtualisation des Listes</h2>
            <p>Pour les longues listes, la virtualisation est indispensable. React Window ou React Virtualized ne rendent que les éléments visibles à l'écran, économisant considérablement les ressources.</p>
            
            <h2>4. Optimisation des Re-rendus</h2>
            <p>React.memo() pour les composants fonctionnels et PureComponent pour les composants de classe empêchent les re-rendus inutiles en comparant les props.</p>
            
            <h2>5. Debouncing et Throttling</h2>
            <p>Pour les événements fréquents comme le scroll ou la saisie, le debouncing et le throttling limitent le nombre d'exécutions de fonctions coûteuses.</p>
            
            <h2>6. Web Workers pour les Calculs Lourds</h2>
            <p>Déplacer les calculs intensifs vers des Web Workers libère le thread principal et maintient l'interface réactive.</p>
            
            <h2>7. Optimisation des Images</h2>
            <p>Utiliser des formats modernes (WebP, AVIF), le lazy loading natif, et des CDN avec redimensionnement automatique améliore significativement les temps de chargement.</p>
            
            <h2>8. Bundle Analysis et Tree Shaking</h2>
            <p>Analyser régulièrement le bundle avec webpack-bundle-analyzer permet d'identifier et d'éliminer le code mort.</p>
            
            <h2>9. Server-Side Rendering (SSR)</h2>
            <p>Next.js offre du SSR out-of-the-box, améliorant le Time to First Byte et le SEO tout en maintenant l'interactivité côté client.</p>
            
            <h2>10. Monitoring et Profiling</h2>
            <p>React DevTools Profiler et Lighthouse permettent d'identifier les goulots d'étranglement et de mesurer l'impact des optimisations.</p>
            
            <h2>Résultats Mesurables</h2>
            <p>L'application de ces techniques sur le projet Apple Confidence a produit les résultats suivants :</p>
            <ul>
                <li>Temps de chargement initial : réduction de 42%</li>
                <li>Time to Interactive : amélioration de 38%</li>
                <li>Taille du bundle : réduction de 51%</li>
                <li>Score Lighthouse Performance : passage de 72 à 96</li>
                <li>First Contentful Paint : réduction de 1.8s à 0.9s</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>L'optimisation des performances React est un processus itératif qui nécessite mesure, analyse et ajustement continus. Ces techniques, appliquées de manière stratégique, transforment une application lente en une expérience utilisateur fluide et réactive.</p>
        `
    },
    'ux-ecommerce': {
        title: 'UX Design pour l\'e-commerce : Augmenter les conversions de 45%',
        date: '5 Avril 2026',
        category: 'Design',
        reading: '7 min',
        content: `
            <h1>UX Design pour l'e-commerce : Augmenter les conversions de 45%</h1>
            <div class="post-meta">
                <span>5 Avril 2026</span>
                <span>7 min de lecture</span>
                <span>Design</span>
            </div>
            
            <p>L'UX Design en e-commerce ne se limite pas à créer une interface esthétique. C'est une discipline scientifique qui combine psychologie, design et analyse de données pour maximiser les conversions. Voici le processus complet appliqué sur Apple Confidence.</p>
            
            <h2>Analyse Initiale et Diagnostic</h2>
            <p>Le site présentait un taux de conversion de 1.2%, bien en dessous de la moyenne du secteur (2-3%). L'analyse a révélé plusieurs problèmes critiques :</p>
            <ul>
                <li>Parcours d'achat complexe avec 7 étapes</li>
                <li>Temps de chargement de 4.2 secondes</li>
                <li>Absence de preuve sociale</li>
                <li>Navigation confuse sur mobile</li>
                <li>Call-to-action peu visibles</li>
            </ul>
            
            <h2>Principe 1 : Hiérarchie Visuelle et Architecture de l'Information</h2>
            <p>La restructuration de la page produit a suivi la loi de Fitts et le principe de proximité. Les éléments critiques (prix, CTA, disponibilité) ont été positionnés dans la zone de vision primaire, réduisant le temps de décision de 23%.</p>
            
            <h2>Principe 2 : Réduction de la Friction</h2>
            <p>Le processus de checkout a été simplifié de 7 à 3 étapes :</p>
            <ul>
                <li>Étape 1 : Informations de livraison</li>
                <li>Étape 2 : Mode de paiement</li>
                <li>Étape 3 : Confirmation</li>
            </ul>
            <p>Résultat : augmentation de 28% du taux de complétion du checkout.</p>
            
            <h2>Principe 3 : Preuve Sociale et Signaux de Confiance</h2>
            <p>L'intégration stratégique de la preuve sociale a inclus :</p>
            <ul>
                <li>Avis clients vérifiés avec photos</li>
                <li>Badges de sécurité (SSL, paiement sécurisé)</li>
                <li>Compteur de ventes en temps réel</li>
                <li>Garantie satisfait ou remboursé visible</li>
            </ul>
            
            <h2>Principe 4 : Mobile-First Design</h2>
            <p>Avec 68% du trafic provenant du mobile, chaque interaction a été optimisée pour le tactile :</p>
            <ul>
                <li>Boutons de minimum 44x44px</li>
                <li>Espacement généreux entre éléments cliquables</li>
                <li>Navigation par pouce (thumb-friendly)</li>
                <li>Formulaires simplifiés avec auto-complétion</li>
            </ul>
            
            <h2>Principe 5 : Urgence et Rareté Éthiques</h2>
            <p>L'utilisation éthique de l'urgence et de la rareté a augmenté les conversions sans manipuler les utilisateurs :</p>
            <ul>
                <li>Compteur de stock réel et transparent</li>
                <li>Offres limitées dans le temps clairement communiquées</li>
                <li>Notifications de derniers articles disponibles</li>
            </ul>
            
            <h2>Principe 6 : Performance et Vitesse</h2>
            <p>Chaque seconde de chargement coûte 7% de conversions. Les optimisations ont réduit le temps de chargement à 2.3 secondes :</p>
            <ul>
                <li>Images optimisées en WebP</li>
                <li>Lazy loading des images below the fold</li>
                <li>CDN pour la distribution de contenu</li>
                <li>Minification et compression des assets</li>
            </ul>
            
            <h2>Principe 7 : A/B Testing Systématique</h2>
            <p>Chaque hypothèse a été testée avec des échantillons statistiquement significatifs. Tests réalisés :</p>
            <ul>
                <li>Couleur et position des CTA</li>
                <li>Formulation des titres produits</li>
                <li>Placement des avis clients</li>
                <li>Structure du formulaire de checkout</li>
            </ul>
            
            <h2>Résultats Après 3 Mois</h2>
            <p>Les métriques suivantes ont été mesurées avec Google Analytics et Hotjar :</p>
            <ul>
                <li>Taux de conversion : 1.2% à 1.74% (+45%)</li>
                <li>Valeur moyenne du panier : +23%</li>
                <li>Taux de rebond : -18%</li>
                <li>Temps moyen sur site : +42%</li>
                <li>Pages vues par session : +31%</li>
                <li>Taux d'abandon de panier : -15%</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>L'UX Design en e-commerce est une discipline data-driven qui nécessite une compréhension approfondie du comportement utilisateur. L'application méthodique de ces principes, combinée à un testing rigoureux, transforme un site e-commerce ordinaire en une machine à convertir performante.</p>
        `
    },
    'firebase-supabase': {
        title: 'Firebase vs Supabase : Analyse comparative sur 5 projets en production',
        date: '1 Avril 2026',
        category: 'Backend',
        reading: '6 min',
        content: `
            <h1>Firebase vs Supabase : Analyse comparative sur 5 projets en production</h1>
            <div class="post-meta">
                <span>1 Avril 2026</span>
                <span>6 min de lecture</span>
                <span>Backend</span>
            </div>
            
            <p>Le choix d'une solution Backend-as-a-Service (BaaS) est crucial pour la réussite d'un projet. Après avoir déployé 3 applications avec Firebase et 2 avec Supabase en production, voici une analyse comparative basée sur des métriques réelles.</p>
            
            <h2>Contexte des Projets</h2>
            <p>Les 5 projets analysés incluent :</p>
            <ul>
                <li>SkillBridge (Firebase) : Plateforme sociale, 2000+ utilisateurs</li>
                <li>Campusly (Firebase) : Application éducative, 5000+ utilisateurs</li>
                <li>Apple Confidence (Firebase) : E-commerce, 10000+ produits</li>
                <li>Gbéto (Supabase) : Marketplace, 500+ vendeurs</li>
                <li>Portfolio Client (Supabase) : CMS personnalisé</li>
            </ul>
            
            <h2>Firebase : Analyse Approfondie</h2>
            
            <h3>Architecture et Écosystème</h3>
            <p>Firebase offre un écosystème complet intégré avec Google Cloud Platform. Les services utilisés incluent :</p>
            <ul>
                <li>Firestore : Base de données NoSQL temps réel</li>
                <li>Authentication : Gestion complète des utilisateurs</li>
                <li>Storage : Stockage de fichiers</li>
                <li>Hosting : Hébergement statique avec CDN</li>
                <li>Cloud Functions : Serverless backend</li>
            </ul>
            
            <h3>Points Forts Mesurés</h3>
            <ul>
                <li>Temps de mise en place : 2-3 heures pour un projet complet</li>
                <li>Latence moyenne : 45ms (région Europe)</li>
                <li>Disponibilité : 99.95% sur 6 mois</li>
                <li>Documentation : Excellente avec exemples pratiques</li>
                <li>Communauté : 500k+ développeurs actifs</li>
            </ul>
            
            <h3>Limitations Rencontrées</h3>
            <ul>
                <li>Coût : Augmentation exponentielle avec le volume (1000€/mois à 50k utilisateurs)</li>
                <li>Requêtes complexes : Nécessite des workarounds pour les jointures</li>
                <li>Vendor lock-in : Migration difficile vers autre solution</li>
                <li>Limitations NoSQL : Pas adapté pour données relationnelles complexes</li>
            </ul>
            
            <h2>Supabase : Analyse Approfondie</h2>
            
            <h3>Architecture et Philosophie</h3>
            <p>Supabase est construit sur PostgreSQL et propose une alternative open-source à Firebase. Stack technique :</p>
            <ul>
                <li>PostgreSQL : Base de données relationnelle</li>
                <li>PostgREST : API REST automatique</li>
                <li>GoTrue : Authentification JWT</li>
                <li>Storage : Compatible S3</li>
                <li>Realtime : WebSockets pour temps réel</li>
            </ul>
            
            <h3>Points Forts Mesurés</h3>
            <ul>
                <li>Requêtes SQL : Flexibilité totale pour requêtes complexes</li>
                <li>Coût : 300€/mois pour 50k utilisateurs (3x moins cher)</li>
                <li>Row Level Security : Sécurité au niveau des lignes native</li>
                <li>Open Source : Possibilité de self-hosting</li>
                <li>Migrations : Export PostgreSQL standard</li>
            </ul>
            
            <h3>Limitations Rencontrées</h3>
            <ul>
                <li>Courbe d'apprentissage : Nécessite connaissance SQL</li>
                <li>Écosystème : Moins mature que Firebase</li>
                <li>Temps de mise en place : 4-6 heures (configuration plus complexe)</li>
                <li>Communauté : Plus petite (50k+ développeurs)</li>
            </ul>
            
            <h2>Comparaison des Performances</h2>
            
            <h3>Temps de Réponse (moyenne sur 10000 requêtes)</h3>
            <ul>
                <li>Firebase Firestore : 45ms</li>
                <li>Supabase PostgreSQL : 38ms</li>
            </ul>
            
            <h3>Coût Mensuel (50k utilisateurs actifs)</h3>
            <ul>
                <li>Firebase : 1000€ (Blaze plan)</li>
                <li>Supabase : 300€ (Pro plan)</li>
            </ul>
            
            <h3>Temps de Développement</h3>
            <ul>
                <li>Firebase : -20% (plus rapide grâce à l'écosystème)</li>
                <li>Supabase : +15% (configuration initiale plus longue)</li>
            </ul>
            
            <h2>Recommandations Basées sur l'Expérience</h2>
            
            <h3>Choisir Firebase si :</h3>
            <ul>
                <li>Vous débutez en développement backend</li>
                <li>Vous avez besoin de temps réel intensif</li>
                <li>Votre modèle de données est simple et dénormalisé</li>
                <li>Vous voulez un écosystème tout-en-un</li>
                <li>Le budget n'est pas une contrainte majeure</li>
            </ul>
            
            <h3>Choisir Supabase si :</h3>
            <ul>
                <li>Vous maîtrisez SQL et les bases relationnelles</li>
                <li>Vous avez des requêtes complexes avec jointures</li>
                <li>Le contrôle des coûts est important</li>
                <li>Vous préférez l'open source</li>
                <li>Vous voulez éviter le vendor lock-in</li>
            </ul>
            
            <h2>Stratégie Hybride</h2>
            <p>Pour certains projets, une approche hybride peut être optimale :</p>
            <ul>
                <li>Firebase Authentication + Supabase Database</li>
                <li>Supabase pour les données + Firebase pour le temps réel</li>
                <li>Firebase pour le prototypage + Migration vers Supabase en production</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Firebase et Supabase sont deux excellentes solutions avec des philosophies différentes. Firebase excelle en rapidité de développement et écosystème complet, tandis que Supabase offre flexibilité, contrôle et coûts maîtrisés. Le choix dépend de vos compétences, contraintes budgétaires et complexité du projet.</p>
            
            <p>Pour mes nouveaux projets, je privilégie Supabase pour sa flexibilité SQL et son pricing transparent, tout en gardant Firebase pour le prototypage rapide et les projets nécessitant un temps réel intensif.</p>
        `
    }
};

function openBlogPost(postId) {
    const modal = document.getElementById('blogModal');
    const content = document.getElementById('blogPostContent');
    const post = blogPosts[postId];
    
    if (post && modal && content) {
        content.innerHTML = post.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBlogPost() {
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Fermer le modal en cliquant en dehors
document.getElementById('blogModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'blogModal') {
        closeBlogPost();
    }
});

// Fermer avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeBlogPost();
    }
});


// ========================================
// SYSTÈME MULTILINGUE FR/EN
// ========================================

const translations = {
    fr: {
        // Navbar
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.skills': 'Compétences',
        'nav.projects': 'Projets',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.cv': 'CV',
        
        // Hero
        'hero.greeting': 'Hello, je suis',
        'hero.title': 'Développeur Frontend | E-commerce & UX Design',
        'hero.description': 'Étudiant en développement Full-Stack, je crée des sites web modernes qui allient esthétique et performance. Spécialisé en e-commerce et UX Design, mon ambition : devenir expert Full-Stack et spécialiste en cybersécurité.',
        'hero.cta1': 'Découvrir mes projets',
        'hero.cta2': 'Mon CV',
        
        // About
        'about.title': 'À propos',
        'about.projects': 'Projets Réalisés',
        'about.certification': 'Certification',
        'about.engagement': 'Engagement',
        
        // Skills
        'skills.title': 'Mon Expertise',
        'skills.frontend': 'Frontend Development',
        'skills.design': 'Design & Créativité',
        'skills.backend': 'Backend & Outils',
        
        // Projects
        'projects.title': 'Mes Projets',
        'projects.all': 'Tous',
        'projects.completed': 'Terminés',
        'projects.inprogress': 'En développement',
        'projects.visit': 'Visiter le site',
        
        // Blog
        'blog.title': 'Blog & Articles',
        'blog.subtitle': 'Mes réflexions sur le développement web et les tendances tech',
        'blog.read': 'Lire l\'article',
        
        // Process
        'process.title': 'Mon Process de Travail',
        'process.subtitle': 'Une méthodologie éprouvée pour des résultats exceptionnels',
        
        // Testimonials
        'testimonials.title': 'Ce qu\'ils disent de moi',
        
        // CTA
        'cta.title': 'Prêt à donner vie à votre projet ?',
        'cta.description': 'Transformons ensemble vos idées en solutions digitales performantes et innovantes.',
        'cta.button1': 'Démarrer un projet',
        'cta.button2': 'WhatsApp Direct',
        'cta.stat1': 'Réponse garantie',
        'cta.stat2': 'Satisfaction client',
        'cta.stat3': 'Projets réussis',
        
        // Contact
        'contact.title': 'Travaillons ensemble',
        'contact.subtitle': 'Un projet en tête ? Une collaboration à explorer ? Contactez-moi, je réponds rapidement.',
        'contact.form.title': 'Envoyez-moi un message rapide',
        'contact.form.name': 'Votre nom',
        'contact.form.message': 'Votre message...',
        'contact.form.send': 'Envoyer sur WhatsApp',
        
        // Footer
        'footer.text': 'Développé avec passion au Bénin 🇧🇯',
        'footer.challenge': 'InnerBuild S01 - FrontForge Challenge'
    },
    en: {
        // Navbar
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.cv': 'Resume',
        
        // Hero
        'hero.greeting': 'Hello, I\'m',
        'hero.title': 'Frontend Developer | E-commerce & UX Design',
        'hero.description': 'Full-Stack development student, I create modern websites that combine aesthetics and performance. Specialized in e-commerce and UX Design, my ambition: become a Full-Stack expert and cybersecurity specialist.',
        'hero.cta1': 'Discover my projects',
        'hero.cta2': 'My Resume',
        
        // About
        'about.title': 'About Me',
        'about.projects': 'Completed Projects',
        'about.certification': 'Certification',
        'about.engagement': 'Commitment',
        
        // Skills
        'skills.title': 'My Expertise',
        'skills.frontend': 'Frontend Development',
        'skills.design': 'Design & Creativity',
        'skills.backend': 'Backend & Tools',
        
        // Projects
        'projects.title': 'My Projects',
        'projects.all': 'All',
        'projects.completed': 'Completed',
        'projects.inprogress': 'In Development',
        'projects.visit': 'Visit Website',
        
        // Blog
        'blog.title': 'Blog & Articles',
        'blog.subtitle': 'My thoughts on web development and tech trends',
        'blog.read': 'Read article',
        
        // Process
        'process.title': 'My Work Process',
        'process.subtitle': 'A proven methodology for exceptional results',
        
        // Testimonials
        'testimonials.title': 'What They Say About Me',
        
        // CTA
        'cta.title': 'Ready to bring your project to life?',
        'cta.description': 'Let\'s transform your ideas into high-performing and innovative digital solutions together.',
        'cta.button1': 'Start a project',
        'cta.button2': 'WhatsApp Direct',
        'cta.stat1': 'Guaranteed response',
        'cta.stat2': 'Client satisfaction',
        'cta.stat3': 'Successful projects',
        
        // Contact
        'contact.title': 'Let\'s Work Together',
        'contact.subtitle': 'Have a project in mind? Want to explore a collaboration? Contact me, I respond quickly.',
        'contact.form.title': 'Send me a quick message',
        'contact.form.name': 'Your name',
        'contact.form.message': 'Your message...',
        'contact.form.send': 'Send on WhatsApp',
        
        // Footer
        'footer.text': 'Developed with passion in Benin 🇧🇯',
        'footer.challenge': 'InnerBuild S01 - FrontForge Challenge'
    }
};

let currentLang = localStorage.getItem('language') || 'fr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Mettre à jour le HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
    
    // Mettre à jour le bouton
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const flag = langToggle.querySelector('.lang-flag');
        const text = langToggle.querySelector('.lang-text');
        if (flag && text) {
            flag.textContent = lang === 'fr' ? '🇫🇷' : '🇬🇧';
            text.textContent = lang === 'fr' ? 'FR' : 'EN';
        }
    }
    
    // Traduire tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Initialiser la langue au chargement
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
});

// Toggle langue
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'fr' ? 'en' : 'fr';
        setLanguage(newLang);
        
        // Animation du bouton
        langToggle.style.transform = 'scale(1.1)';
        setTimeout(() => {
            langToggle.style.transform = 'scale(1)';
        }, 200);
    });
}


// ========================================
// ANIMATIONS GSAP AVANCÉES - DÉSACTIVÉES
// ========================================

// Animations désactivées pour affichage immédiat
// Attendre que GSAP soit chargé
window.addEventListener('load', () => {
    // GSAP désactivé - tout s'affiche immédiatement
    console.log('✨ Animations désactivées - Affichage immédiat');
});
