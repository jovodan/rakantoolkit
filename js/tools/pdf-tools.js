document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initMergeTool();
  initSplitTool();
  initImg2PdfTool();
  initPdfCompressTool();
});

function initTabs() {
  document.querySelectorAll('.tool-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tabName);
      if (panel) panel.classList.add('active');
    });
  });
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ===== MERGE =====
function initMergeTool() {
  const zone = document.getElementById('uploadZoneMerge');
  const input = document.getElementById('fileInputMerge');
  const options = document.getElementById('mergeOptions');
  const mergeList = document.getElementById('mergeList');
  const mergeBtn = document.getElementById('mergeBtn');

  let files = [];

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });
  input.addEventListener('change', () => handleFiles(input.files));

  function handleFiles(fileList) {
    const newFiles = Array.from(fileList).filter(f => f.type === 'application/pdf');
    files = files.concat(newFiles);
    if (files.length === 0) return;
    renderList();
    options.style.display = 'block';
  }

  function renderList() {
    mergeList.innerHTML = '';
    files.forEach((file, i) => {
      const item = document.createElement('div');
      item.className = 'file-list-item';
      item.draggable = true;
      item.setAttribute('data-index', i);
      item.innerHTML = '<span class="drag-handle">&#9776;</span><div class="file-info"><div class="name">' + file.name + '</div><div class="size">' + formatSize(file.size) + '</div></div><button class="remove-btn" data-idx="' + i + '">&times;</button>';
      mergeList.appendChild(item);
    });

    mergeList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        files.splice(parseInt(btn.getAttribute('data-idx')), 1);
        renderList();
        if (files.length === 0) options.style.display = 'none';
      });
    });

    enableDragSort(mergeList);
  }

  function enableDragSort(list) {
    let dragItem = null;
    list.querySelectorAll('.file-list-item').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        dragItem = item;
        item.style.opacity = '0.5';
      });
      item.addEventListener('dragend', () => {
        item.style.opacity = '1';
        dragItem = null;
      });
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (dragItem && dragItem !== item) {
          const rect = item.getBoundingClientRect();
          const mid = rect.top + rect.height / 2;
          if (e.clientY < mid) {
            list.insertBefore(dragItem, item);
          } else {
            list.insertBefore(dragItem, item.nextSibling);
          }
        }
      });
    });
  }

  mergeBtn.addEventListener('click', () => {
    const items = mergeList.querySelectorAll('.file-list-item');
    const sorted = Array.from(items).map(item => {
      const idx = parseInt(item.getAttribute('data-index'));
      return files[idx];
    });
    alert('Files ready to merge: ' + sorted.map(f => f.name).join(', ') + '\n\nNote: Full PDF merge functionality requires a backend or pdf-lib library.');
  });
}

// ===== SPLIT =====
function initSplitTool() {
  const zone = document.getElementById('uploadZoneSplit');
  const input = document.getElementById('fileInputSplit');
  const options = document.getElementById('splitOptions');
  const splitBtn = document.getElementById('splitBtn');
  const rangeGroup = document.getElementById('rangeGroup');
  const everyGroup = document.getElementById('everyGroup');

  let currentFile = null;

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => { if (input.files.length > 0) handleFile(input.files[0]); });

  function handleFile(file) {
    if (file.type !== 'application/pdf') return;
    currentFile = file;
    options.style.display = 'block';
    zone.innerHTML = '<div class="upload-icon">&#128196;</div><p>' + file.name + '</p><span class="upload-hint">' + formatSize(file.size) + '</span>';
  }

  document.querySelectorAll('input[name="splitMode"]').forEach(radio => {
    radio.addEventListener('change', () => {
      rangeGroup.style.display = 'none';
      everyGroup.style.display = 'none';
      if (radio.value === 'range') rangeGroup.style.display = 'block';
      if (radio.value === 'every') everyGroup.style.display = 'block';
    });
  });

  splitBtn.addEventListener('click', () => {
    if (!currentFile) return;
    const mode = document.querySelector('input[name="splitMode"]:checked').value;
    let msg = 'Split mode: ' + mode;
    if (mode === 'range') msg += '\nRange: ' + document.getElementById('pageRange').value;
    if (mode === 'every') msg += '\nEvery: ' + document.getElementById('everyN').value + ' pages';
    alert(msg + '\n\nNote: Full PDF split functionality requires a backend or pdf-lib library.');
  });
}

// ===== IMAGE TO PDF =====
function initImg2PdfTool() {
  const zone = document.getElementById('uploadZoneImg2Pdf');
  const input = document.getElementById('fileInputImg2Pdf');
  const options = document.getElementById('img2pdfOptions');
  const preview = document.getElementById('img2pdfPreview');
  const img2pdfBtn = document.getElementById('img2pdfBtn');

  let files = [];

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });
  input.addEventListener('change', () => handleFiles(input.files));

  function handleFiles(fileList) {
    files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    if (files.length === 0) return;
    preview.innerHTML = '';
    files.forEach(file => {
      const div = document.createElement('div');
      div.className = 'preview-item';
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      div.appendChild(img);
      const name = document.createElement('div');
      name.className = 'file-name';
      name.textContent = file.name;
      div.appendChild(name);
      preview.appendChild(div);
    });
    options.style.display = 'block';
  }

  img2pdfBtn.addEventListener('click', () => {
    if (files.length === 0) return;
    alert('Images ready to convert: ' + files.map(f => f.name).join(', ') + '\n\nNote: Full image-to-PDF functionality requires a backend or jsPDF library.');
  });
}

// ===== PDF COMPRESS =====
function initPdfCompressTool() {
  const zone = document.getElementById('uploadZonePdfCompress');
  const input = document.getElementById('fileInputPdfCompress');
  const options = document.getElementById('pdfCompressOptions');
  const compressBtn = document.getElementById('pdfCompressBtn');
  const stats = document.getElementById('pdfStats');

  let currentFile = null;

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => { if (input.files.length > 0) handleFile(input.files[0]); });

  function handleFile(file) {
    if (file.type !== 'application/pdf') return;
    currentFile = file;
    stats.innerHTML = '<div class="stat"><span class="label">File</span><span class="value">' + file.name + '</span></div><div class="stat"><span class="label">Size</span><span class="value">' + formatSize(file.size) + '</span></div>';
    options.style.display = 'block';
    zone.innerHTML = '<div class="upload-icon">&#128196;</div><p>' + file.name + '</p><span class="upload-hint">' + formatSize(file.size) + '</span>';
  }

  compressBtn.addEventListener('click', () => {
    if (!currentFile) return;
    const quality = document.querySelector('input[name="pdfQuality"]:checked').value;
    alert('PDF compress: ' + currentFile.name + '\nQuality: ' + quality + '\n\nNote: Full PDF compression requires a backend service.');
  });
}
