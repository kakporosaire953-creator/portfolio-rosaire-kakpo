# 🚀 COMMANDES POUR CRÉER LE REPO GITHUB

## ÉTAPE 1: Créer le repo sur GitHub.com

1. Va sur: https://github.com/new
2. Nom: `portfolio-rosaire-kakpo`
3. Description: `Portfolio personnel - Développeur Frontend | InnerBuild S01`
4. Public ✅
5. Clique "Create repository"

---

## ÉTAPE 2: Initialiser Git localement

Copie-colle ces commandes UNE PAR UNE dans PowerShell:

```powershell
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Premier commit
git commit -m "Portfolio Rosaire KAKPO - InnerBuild S01"

# 4. Renommer la branche en main
git branch -M main

# 5. Lier au repo GitHub (REMPLACE par ton URL)
git remote add origin https://github.com/kakporosaire953-creator/portfolio-rosaire-kakpo.git

# 6. Pousser vers GitHub
git push -u origin main
```

---

## ÉTAPE 3: Vérifier

1. Va sur: https://github.com/kakporosaire953-creator/portfolio-rosaire-kakpo
2. Tu devrais voir tous tes fichiers! ✅

---

## ⚠️ SI TU AS UNE ERREUR

### Erreur: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/kakporosaire953-creator/portfolio-rosaire-kakpo.git
git push -u origin main
```

### Erreur: "failed to push"
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Erreur: "not a git repository"
```powershell
# Tu es dans le bon dossier?
cd C:\Users\gabino\Desktop\Portfolio
git init
```

---

## 📝 NOTES

- Assure-toi d'être dans le bon dossier (Portfolio)
- Le repo doit être PUBLIC
- Utilise ton nom d'utilisateur GitHub: `kakporosaire953-creator`

---

## ✅ APRÈS LE PUSH

Ton code sera sur GitHub et tu pourras:
1. Déployer sur Vercel
2. Partager le lien du repo
3. Montrer ton code aux recruteurs

**Let's go! 🚀**
