# 🚀 Guide de Déploiement - Portfolio Rosaire KAKPO

## Étapes de déploiement sur Vercel

### 1. Préparer le repository GitHub

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Portfolio Rosaire KAKPO - InnerBuild S01"

# Créer le repo sur GitHub
# Aller sur github.com/new
# Nom: portfolio-rosaire-kakpo

# Lier au repo distant
git remote add origin https://github.com/kakporosaire953-creator/portfolio-rosaire-kakpo.git

# Push
git branch -M main
git push -u origin main
```

### 2. Déployer sur Vercel

**Option A: Via le site web**
1. Aller sur https://vercel.com
2. Se connecter avec GitHub
3. Cliquer "New Project"
4. Importer le repo `portfolio-rosaire-kakpo`
5. Cliquer "Deploy"

**Option B: Via CLI**
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions
```

### 3. Configuration Vercel

Dans les settings du projet:
- **Project Name:** portfolio-rosaire-kakpo
- **Framework Preset:** Other
- **Build Command:** (laisser vide)
- **Output Directory:** (laisser vide)

### 4. Domaine personnalisé (optionnel)

Si tu as un domaine:
1. Settings → Domains
2. Ajouter ton domaine
3. Configurer les DNS

Sinon, utilise: `portfolio-rosaire-kakpo.vercel.app`

### 5. Soumettre à Google Search Console

1. Aller sur https://search.google.com/search-console
2. Ajouter une propriété
3. URL: `https://portfolio-rosaire-kakpo.vercel.app`
4. Vérifier la propriété (méthode HTML tag)
5. Soumettre le sitemap: `https://portfolio-rosaire-kakpo.vercel.app/sitemap.xml`

### 6. Tester le déploiement

Vérifier:
- ✅ Site accessible
- ✅ Images chargent
- ✅ CV téléchargeable
- ✅ Certification accessible
- ✅ Formulaire WhatsApp fonctionne
- ✅ Responsive sur mobile
- ✅ Favicon visible

### 7. Partager

Une fois déployé, partager sur:
- LinkedIn (avec article)
- Facebook (groupe InnerBuild)
- WhatsApp Status
- CV et profils professionnels

### 8. Mettre à jour

Pour les futures mises à jour:
```bash
git add .
git commit -m "Description des changements"
git push
```

Vercel redéploiera automatiquement!

---

## Checklist finale avant déploiement

- [ ] Optimiser l'image de profil en WebP
- [ ] Vérifier tous les liens
- [ ] Tester sur mobile
- [ ] Vérifier le CV s'ouvre
- [ ] Vérifier la certification s'ouvre
- [ ] Tester le formulaire WhatsApp
- [ ] Vérifier le sitemap.xml
- [ ] Vérifier le robots.txt
- [ ] Vérifier la favicon

---

Bon déploiement! 🚀
