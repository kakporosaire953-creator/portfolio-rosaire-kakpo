# Optimisation des Images

## Image de profil à optimiser

Pour optimiser l'image `IMG-20260324-WA0045.jpg`, utilise un de ces outils:

### En ligne (gratuit):
1. **Squoosh** - https://squoosh.app/
   - Glisse ton image
   - Choisis WebP
   - Qualité: 80-85%
   - Télécharge

2. **TinyPNG** - https://tinypng.com/
   - Upload ton image
   - Télécharge la version optimisée

### Commande (si tu as Node.js):
```bash
npm install -g sharp-cli
sharp -i IMG-20260324-WA0045.jpg -o profile.webp --webp
```

### Résultat attendu:
- Format: WebP
- Taille: 400x400px
- Poids: ~50-80KB (au lieu de 200-500KB)
- Nom: `profile.webp`

### Après optimisation:
Remplace dans `index.html`:
```html
<img src="images/profile.webp" 
     alt="Rosaire KAKPO - Développeur Frontend" 
     class="profile-image" 
     loading="lazy">
```

## Pourquoi WebP?
- 30-50% plus léger que JPG
- Qualité identique
- Supporté par tous les navigateurs modernes
- Meilleur pour le SEO (vitesse de chargement)
