

// scripts/moc.js
// DataviewJS-Snippet für Projekt-MOCs (PARA/GTD-ready)
// Verwendung in Obsidian: kompletten Inhalt in einen ```dataviewjs```-Block kopieren.

const MEETINGS_FOLDER_DEFAULT = "Resources/Meetings";

/**
 * Rendert einen Projekt-MOC:
 * - Filter-Tag = Ordnername der aktuellen MOC-Datei
 * - Zeigt: Summery (## Summery …), Überschriften (verlinkt), Tasks (offen/erledigt)
 *
 * @param {DataviewApi} dv
 * @param {object} opts
 * @param {string} [opts.meetingsFolder]  Pfad zu deinem Meetings-Ordner
 */
async function renderProjectMOC(dv, opts = {}) {
  const MEETINGS_FOLDER = opts.meetingsFolder || MEETINGS_FOLDER_DEFAULT;

  // Aktive Datei → Ordnername als Tag
  const active = app.workspace.getActiveFile();
  if (!active) { dv.paragraph("Keine aktive Datei gefunden."); return; }
  const parts = active.path.split("/");
  const currentFolder = parts.length > 1 ? parts[parts.length - 2] : "";
  const TAG = currentFolder;

  // Tag-Check (file.tags ohne # / file.etags mit #)
  const hasTag = (page, tag) => {
    const tags  = (page.file?.tags  ?? []).map(String);
    const etags = (page.file?.etags ?? []).map(String);
    return tags.includes(tag) || etags.includes("#" + tag) || etags.includes(tag);
  };

  const pages = dv.pages(`"${MEETINGS_FOLDER}"`)
    .where(p => hasTag(p, TAG))
    .sort(p => p.file.name, 'desc');

  dv.paragraph(`🔎 Filter-Tag: **${TAG}** — Treffer: ${pages.length}`);

  for (const page of pages) {
    dv.header(3, page.file.link);

    const tfile   = app.vault.getAbstractFileByPath(page.file.path);
    const content = await app.vault.read(tfile);

    // Summery-Abschnitt: ## Summery ... (bis nächste ##)
    const m = content.match(/##\s*Summery\s*\n([\s\S]*?)(\n##|$)/i);
    if (m) {
      const summeryText = m[1].trim();
      if (summeryText) dv.paragraph("📌 **Summery:** " + summeryText);
    }

    // Überschriften als anklickbare Links
    const cache  = app.metadataCache.getFileCache(tfile) ?? {};
    const heads  = cache.headings ?? [];
    if (heads.length) {
      const items = heads.map(h => {
        const indent = " ".repeat(Math.max(0, h.level - 1));
        const link   = `[[${page.file.path}#${h.heading}|${h.heading}]]`;
        return indent + link;
      });
      dv.list(items);
    } else {
      dv.paragraph("_Keine Überschriften gefunden._");
    }

    // Tasks (offen / erledigt)
    const pg = dv.page(page.file.path);
    const allTasks = (pg?.file?.tasks ?? dv.array());
    const openTasks = allTasks.where(t => !t.completed);
    const doneTasks = allTasks.where(t =>  t.completed);

    if (openTasks.length) {
      dv.paragraph(`📝 **Offene Aufgaben** (${openTasks.length})`);
      dv.taskList(openTasks, false);
    }
    if (doneTasks.length) {
      dv.paragraph(`✅ **Erledigt** (${doneTasks.length})`);
      dv.taskList(doneTasks, false);
    }

    dv.el("hr");
  }
}

// Falls du den Code direkt in einem dataviewjs-Block einfügst, kannst du am Ende aufrufen:
// await renderProjectMOC(dv, { meetingsFolder: "03_Resources/Meetings" });
