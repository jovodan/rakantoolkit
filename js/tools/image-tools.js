document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCompressTool();
  initResizeTool();
  initConvertTool();
  initRemoveBgTool();
  initCropTool();
  initRotateTool();
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

function loadImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function drawImageToCanvas(img, maxW, maxH) {
  let w = img.width, h = img.height;
  if (maxW && w > maxW) { h = h * maxW / w; w = maxW; }
  if (maxH && h > maxH) { w = w * maxH / h; h = maxH; }
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  return canvas;
}

function downloadCanvas(canvas, filename, type, quality) {
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, type, quality);
}

// ===== COMPRESS =====
function initCompressTool() {
  const zone = document.getElementById('uploadZone');
  const input = document.getElementById('fileInput');
  const previewArea = document.getElementById('previewArea');
  const previewGrid = document.getElementById('previewGrid');
  const fileStats = document.getElementById('fileStats');
  const qualitySlider = document.getElementById('qualitySlider');
  const qualityValue = document.getElementById('qualityValue');
  const compressBtn = document.getElementById('compressBtn');

  let files = [];

  qualitySlider.addEventListener('input', () => {
    qualityValue.textContent = qualitySlider.value + '%';
  });

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
    previewGrid.innerHTML = '';
    let totalSize = 0;
    files.forEach((file, i) => {
      totalSize += file.size;
      const div = document.createElement('div');
      div.className = 'preview-item';
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      div.appendChild(img);
      const name = document.createElement('div');
      name.className = 'file-name';
      name.textContent = file.name;
      div.appendChild(name);
      previewGrid.appendChild(div);
    });
    fileStats.innerHTML = '<div class="stat"><span class="label">Files</span><span class="value">' + files.length + '</span></div><div class="stat"><span class="label">Size</span><span class="value">' + formatSize(totalSize) + '</span></div>';
    previewArea.style.display = 'block';
  }

  compressBtn.addEventListener('click', async () => {
    const quality = parseInt(qualitySlider.value) / 100;
    const format = document.getElementById('outputFormat').value;
    for (const file of files) {
      const img = await loadImage(file);
      const canvas = drawImageToCanvas(img);
      const outType = format === 'original' ? file.type : 'image/' + format;
      const ext = format === 'original' ? file.name.split('.').pop() : format;
      const name = file.name.replace(/\.[^.]+$/, '') + '_compressed.' + ext;
      downloadCanvas(canvas, name, outType, quality);
    }
  });
}

// ===== RESIZE =====
function initResizeTool() {
  const zone = document.getElementById('uploadZoneResize');
  const input = document.getElementById('fileInputResize');
  const options = document.getElementById('resizeOptions');
  const resizeBtn = document.getElementById('resizeBtn');
  const widthInput = document.getElementById('newWidth');
  const heightInput = document.getElementById('newHeight');
  const keepRatio = document.getElementById('keepRatio');

  let currentFile = null;
  let origW = 0, origH = 0;

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
    if (!file.type.startsWith('image/')) return;
    currentFile = file;
    const img = new Image();
    img.onload = () => {
      origW = img.width;
      origH = img.height;
      widthInput.value = origW;
      heightInput.value = origH;
      options.style.display = 'block';
      zone.style.display = 'none';
    };
    img.src = URL.createObjectURL(file);
  }

  widthInput.addEventListener('input', () => {
    if (keepRatio.checked && origW > 0) {
      heightInput.value = Math.round(widthInput.value * origH / origW);
    }
  });

  heightInput.addEventListener('input', () => {
    if (keepRatio.checked && origH > 0) {
      widthInput.value = Math.round(heightInput.value * origW / origH);
    }
  });

  document.querySelectorAll('.preset-btn[data-w]').forEach(btn => {
    btn.addEventListener('click', () => {
      widthInput.value = btn.getAttribute('data-w');
      heightInput.value = btn.getAttribute('data-h');
    });
  });

  resizeBtn.addEventListener('click', async () => {
    if (!currentFile) return;
    const img = await loadImage(currentFile);
    const canvas = document.createElement('canvas');
    canvas.width = parseInt(widthInput.value);
    canvas.height = parseInt(heightInput.value);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const ext = currentFile.name.split('.').pop();
    downloadCanvas(canvas, currentFile.name.replace(/\.[^.]+$/, '') + '_' + canvas.width + 'x' + canvas.height + '.' + ext, currentFile.type);
  });
}

// ===== CONVERT =====
function initConvertTool() {
  const zone = document.getElementById('uploadZoneConvert');
  const input = document.getElementById('fileInputConvert');
  const options = document.getElementById('convertOptions');
  const convertBtn = document.getElementById('convertBtn');

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
    options.style.display = 'block';
  }

  convertBtn.addEventListener('click', async () => {
    const targetFormat = document.querySelector('input[name="convertTo"]:checked').value;
    const mime = 'image/' + targetFormat;
    for (const file of files) {
      const img = await loadImage(file);
      const canvas = drawImageToCanvas(img);
      const name = file.name.replace(/\.[^.]+$/, '') + '.' + targetFormat;
      downloadCanvas(canvas, name, mime, 0.92);
    }
  });
}

// ===== REMOVE BACKGROUND =====
function initRemoveBgTool() {
  const zone = document.getElementById('uploadZoneRemoveBg');
  const input = document.getElementById('fileInputRemoveBg');
  const options = document.getElementById('removebgOptions');
  const originalCanvas = document.getElementById('removeBgOriginal');
  const resultCanvas = document.getElementById('removeBgResult');
  const removeBgBtn = document.getElementById('removeBgBtn');
  const sensitivitySlider = document.getElementById('removeBgSensitivity');
  const sensVal = document.getElementById('removeBgSensVal');

  let currentFile = null;

  sensitivitySlider.addEventListener('input', () => {
    sensVal.textContent = sensitivitySlider.value + '%';
  });

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) processImage(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => { if (input.files.length > 0) processImage(input.files[0]); });

  function processImage(file) {
    if (!file.type.startsWith('image/')) return;
    currentFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 400;
        let w = img.width, h = img.height;
        if (w > maxW) { h = h * maxW / w; w = maxW; }

        originalCanvas.width = w;
        originalCanvas.height = h;
        const ctx = originalCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        resultCanvas.width = w;
        resultCanvas.height = h;

        removeBackground(ctx, resultCanvas.getContext('2d'), w, h);
        options.style.display = 'block';
        zone.style.display = 'none';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function removeBackground(srcCtx, destCtx, w, h) {
    const imageData = srcCtx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const outData = destCtx.createImageData(w, h);
    const out = outData.data;

    const sensitivity = parseInt(sensitivitySlider.value) / 100;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const brightness = (r + g + b) / 3;
      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      const isLight = brightness > 200 - (sensitivity * 100);
      const isLowSat = maxDiff < 30 + (sensitivity * 20);

      const threshold = sensitivity;
      const alpha = (isLight && isLowSat) ? Math.max(0, Math.round((1 - threshold) * 255)) : 255;

      out[i] = r;
      out[i + 1] = g;
      out[i + 2] = b;
      out[i + 3] = alpha;
    }

    destCtx.putImageData(outData, 0, 0);

    const bgType = document.querySelector('input[name="bgType"]:checked').value;
    if (bgType !== 'transparent') {
      const bgCanvas = document.createElement('canvas');
      bgCanvas.width = w;
      bgCanvas.height = h;
      const bgCtx = bgCanvas.getContext('2d');
      const colors = { white: '#ffffff', green: '#10b981', blue: '#2563eb' };
      bgCtx.fillStyle = colors[bgType] || '#ffffff';
      bgCtx.fillRect(0, 0, w, h);
      bgCtx.drawImage(resultCanvas, 0, 0);
      destCtx.clearRect(0, 0, w, h);
      destCtx.drawImage(bgCanvas, 0, 0);
    }
  }

  sensitivitySlider.addEventListener('input', () => {
    if (currentFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const w = originalCanvas.width;
          const h = originalCanvas.height;
          const ctx = originalCanvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          removeBackground(ctx, resultCanvas.getContext('2d'), w, h);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(currentFile);
    }
  });

  document.querySelectorAll('input[name="bgType"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (currentFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const w = originalCanvas.width;
            const h = originalCanvas.height;
            const ctx = originalCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            removeBackground(ctx, resultCanvas.getContext('2d'), w, h);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(currentFile);
      }
    });
  });

  removeBgBtn.addEventListener('click', () => {
    downloadCanvas(resultCanvas, 'no-bg.png', 'image/png');
  });
}

// ===== CROP =====
function initCropTool() {
  const zone = document.getElementById('uploadZoneCrop');
  const input = document.getElementById('fileInputCrop');
  const options = document.getElementById('cropOptions');
  const cropCanvas = document.getElementById('cropCanvas');
  const cropBtn = document.getElementById('cropBtn');

  let currentImg = null;

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) loadCropImage(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => { if (input.files.length > 0) loadCropImage(input.files[0]); });

  function loadCropImage(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        currentImg = img;
        const maxW = 600;
        let w = img.width, h = img.height;
        if (w > maxW) { h = h * maxW / w; w = maxW; }
        cropCanvas.width = w;
        cropCanvas.height = h;
        const ctx = cropCanvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        options.style.display = 'block';
        zone.style.display = 'none';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  cropBtn.addEventListener('click', () => {
    if (!currentImg) return;
    const canvas = document.createElement('canvas');
    canvas.width = currentImg.width;
    canvas.height = currentImg.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(currentImg, 0, 0);
    downloadCanvas(canvas, 'cropped_' + currentImg.width + 'x' + currentImg.height + '.png', 'image/png');
  });
}

// ===== ROTATE =====
function initRotateTool() {
  const zone = document.getElementById('uploadZoneRotate');
  const input = document.getElementById('fileInputRotate');
  const options = document.getElementById('rotateOptions');
  const rotateCanvas = document.getElementById('rotateCanvas');
  const rotateBtn = document.getElementById('rotateBtn');
  const rotateLeft = document.getElementById('rotateLeft');
  const rotateRight = document.getElementById('rotateRight');
  const flipH = document.getElementById('flipH');
  const flipV = document.getElementById('flipV');

  let currentImg = null;
  let rotation = 0;
  let flipX = 1;
  let flipY = 1;

  zone.addEventListener('click', () => input.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) loadRotateImage(e.dataTransfer.files[0]);
  });
  input.addEventListener('change', () => { if (input.files.length > 0) loadRotateImage(input.files[0]); });

  function loadRotateImage(file) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        currentImg = img;
        rotation = 0;
        flipX = 1;
        flipY = 1;
        drawRotated();
        options.style.display = 'block';
        zone.style.display = 'none';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function drawRotated() {
    if (!currentImg) return;
    const rad = rotation * Math.PI / 180;
    const is90 = rotation % 180 !== 0;
    const w = is90 ? currentImg.height : currentImg.width;
    const h = is90 ? currentImg.width : currentImg.height;
    rotateCanvas.width = w;
    rotateCanvas.height = h;
    const ctx = rotateCanvas.getContext('2d');
    ctx.translate(w / 2, h / 2);
    ctx.scale(flipX, flipY);
    ctx.rotate(rad);
    ctx.drawImage(currentImg, -currentImg.width / 2, -currentImg.height / 2);
  }

  rotateLeft.addEventListener('click', () => { rotation -= 90; drawRotated(); });
  rotateRight.addEventListener('click', () => { rotation += 90; drawRotated(); });
  flipH.addEventListener('click', () => { flipX *= -1; drawRotated(); });
  flipV.addEventListener('click', () => { flipY *= -1; drawRotated(); });

  rotateBtn.addEventListener('click', () => {
    if (!currentImg) return;
    const rad = rotation * Math.PI / 180;
    const is90 = rotation % 180 !== 0;
    const canvas = document.createElement('canvas');
    canvas.width = is90 ? currentImg.height : currentImg.width;
    canvas.height = is90 ? currentImg.width : currentImg.height;
    const ctx = canvas.getContext('2d');
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flipX, flipY);
    ctx.rotate(rad);
    ctx.drawImage(currentImg, -currentImg.width / 2, -currentImg.height / 2);
    downloadCanvas(canvas, 'rotated_' + currentImg.name, 'image/png');
  });
}
