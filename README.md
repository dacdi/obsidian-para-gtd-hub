
# Obsidian PARA + GTD Hub

A lightweight setup that combines **PARA** (Projects / Areas / Resources / Archive) and **Getting Things Done (GTD)** with **Obsidian**.  
The core idea: **MOCs (Maps of Content)**, **DataviewJS scripts**, and **templates** that automatically surface summaries, to-dos, and headings inside project hubs.

## ✨ Features
- Dynamic **project hubs (MOCs)**  
- Automatic display of **summary**, **headings**, and **to-dos**  
- Meeting template with clear structure  
- Clean integration of **PARA + GTD** in Obsidian  

## 🛠️ Requirements
- [Dataview Plugin](https://blacksmithgu.github.io/obsidian-dataview/)  
- [Templater Plugin](https://silentvoid13.github.io/Templater/)  

## 🚀 Quickstart
1. Copy `/scripts/` and `/templates/` into your vault.  
2. Create a MOC file for each project.  
3. Insert the code from `scripts/moc.js` into the MOC.  
4. Use the meeting template in `/templates/Meeting.md` for new meetings.  
5. Tag = project name → the MOC will automatically show all related meetings.  

## 📸 Screenshots
![MOC Overview](assets/screenshots/placeholder.png)

## 📂 Structure
```

/scripts/    → DataviewJS snippets (MOC)
/templates/  → Templates (e.g. meeting)
/examples/   → Demo notes with dummy data

```

## 📖 More Details
See [PARA_Guide.md](./PARA_Guide.md) for the full system description.
