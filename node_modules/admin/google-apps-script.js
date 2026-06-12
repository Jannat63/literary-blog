// ═══════════════════════════════════════════════════════════
//  MY LITERARY SPACE — Google Apps Script Backend v2
//  1. Replace YOUR_SPREADSHEET_ID with your Sheet ID
//  2. Deploy as Web App (Execute as: Me, Access: Anyone)
// ═══════════════════════════════════════════════════════════

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

const COLUMNS = ['id','title','date','content','excerpt','author','genre','status','image','featured'];

// ── GET ──────────────────────────────────────────────────
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'ping') {
      return json({ status: 'ok', message: 'Literary Blog API v2 running' });
    }

    if (action === 'counts') {
      return json({
        poems:   getRows('Poems').length,
        stories: getRows('Stories').length,
        books:   getRows('Books').length,
      });
    }

    if (action === 'list') {
      return json({ status: 'ok', data: getRows(e.parameter.sheet) });
    }

    if (action === 'get') {
      const rows = getRows(e.parameter.sheet);
      const row  = rows.find(r => r.id === e.parameter.id);
      if (!row) return json({ status: 'error', message: 'Not found' });
      return json({ status: 'ok', data: row });
    }

    if (action === 'search') {
      const q     = (e.parameter.q || '').toLowerCase();
      const sheet = e.parameter.sheet;
      const rows  = getRows(sheet);
      const hits  = rows.filter(r =>
        (r.title   || '').toLowerCase().includes(q) ||
        (r.content || '').toLowerCase().includes(q) ||
        (r.excerpt || '').toLowerCase().includes(q) ||
        (r.author  || '').toLowerCase().includes(q)
      );
      return json({ status: 'ok', data: hits });
    }

    return json({ status: 'error', message: 'Unknown action: ' + action });
  } catch (err) {
    return json({ status: 'error', message: err.toString() });
  }
}

// ── POST ─────────────────────────────────────────────────
function doPost(e) {
  try {
    const body   = JSON.parse(e.postData.contents);
    const action = body.action;

    if (action === 'create') { createRow(body.sheet, body); return json({ status: 'ok' }); }
    if (action === 'update') { updateRow(body.sheet, body.id, body); return json({ status: 'ok' }); }
    if (action === 'delete') { deleteRow(body.sheet, body.id); return json({ status: 'ok' }); }

    return json({ status: 'error', message: 'Unknown action: ' + action });
  } catch (err) {
    return json({ status: 'error', message: err.toString() });
  }
}

// ── Sheet helpers ─────────────────────────────────────────
function getSheet(name) {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    const hdr = sheet.getRange(1, 1, 1, COLUMNS.length);
    hdr.setValues([COLUMNS]);
    hdr.setFontWeight('bold').setBackground('#1a1208').setFontColor('#d4a843');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(4, 300); // content column wider
  }
  return sheet;
}

function getRows(sheetName) {
  const sheet  = getSheet(sheetName);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  const headers = values[0].map(h => String(h).toLowerCase().trim());
  return values.slice(1)
    .filter(row => row[0] !== '')
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = row[i] !== undefined ? String(row[i]) : ''; });
      return obj;
    });
}

function createRow(sheetName, data) {
  const sheet  = getSheet(sheetName);
  const row    = COLUMNS.map(col => data[col] || '');
  sheet.appendRow(row);
  const last = sheet.getLastRow();
  if (last % 2 === 0) sheet.getRange(last, 1, 1, COLUMNS.length).setBackground('#faf6ee');
}

function updateRow(sheetName, id, data) {
  const sheet   = getSheet(sheetName);
  const values  = sheet.getDataRange().getValues();
  const headers = values[0].map(h => String(h).toLowerCase().trim());
  const idCol   = headers.indexOf('id');
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idCol]) === String(id)) {
      COLUMNS.forEach((col, ci) => {
        if (data[col] !== undefined) sheet.getRange(i + 1, ci + 1).setValue(data[col]);
      });
      return;
    }
  }
  throw new Error('Row not found: ' + id);
}

function deleteRow(sheetName, id) {
  const sheet   = getSheet(sheetName);
  const values  = sheet.getDataRange().getValues();
  const headers = values[0].map(h => String(h).toLowerCase().trim());
  const idCol   = headers.indexOf('id');
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idCol]) === String(id)) { sheet.deleteRow(i + 1); return; }
  }
  throw new Error('Row not found: ' + id);
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// ── Run once to create/migrate all sheets ────────────────
function setupSheets() {
  ['Poems', 'Stories', 'Books'].forEach(name => {
    const sheet = getSheet(name);
    // Add any missing header columns
    const existing = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(h => String(h).toLowerCase().trim());
    COLUMNS.forEach((col, i) => {
      if (!existing.includes(col)) {
        const newCol = existing.length + 1;
        sheet.getRange(1, newCol).setValue(col).setFontWeight('bold').setBackground('#1a1208').setFontColor('#d4a843');
      }
    });
  });
  Logger.log('Setup complete!');
}
