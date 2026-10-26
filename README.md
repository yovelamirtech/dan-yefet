# דן יפת — אתר אמן

React + Vite + TypeScript + Tailwind. בדיקות: Vitest + React Testing Library. תכנון מלא: [dan-yefet-plan.md](dan-yefet-plan.md).

```bash
npm install
npm run dev        # http://localhost:5173/dan-yefet/
npm test           # watch mode
npm run build
npm run images     # הורדה מחדש של תמונות הפיתוח (--force כדי לדרוס)
```

- **כל התוכן** (שירים, הופעות, קישורים, טקסטים) נמצא ב-`src/data/content.ts`. מה שמחכה לתשובה מדן מסומן `TODO(Dan)`.
- **הופעות** עוברות אוטומטית ל"הופעות שעברו" יום אחרי התאריך האחרון שלהן.
- **פריסה:** push ל-`main` מריץ בדיקות, בונה ומעלה ל-GitHub Pages (`.github/workflows/deploy.yml`). צריך להפעיל Pages עם המקור "GitHub Actions" בהגדרות הריפו.
- **דומיין משלו:** מוסיפים `public/CNAME`. ה-base וכתובת ה-Open Graph נלקחים אוטומטית מ-Pages.
