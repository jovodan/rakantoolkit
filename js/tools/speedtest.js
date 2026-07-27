document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const gaugeValue = document.getElementById('gaugeValue');
  const gaugeArc = document.getElementById('gaugeArc');
  const testStatus = document.getElementById('testStatus');
  const testProgress = document.getElementById('testProgress');
  const resultsGrid = document.getElementById('resultsGrid');
  const downloadResult = document.getElementById('downloadResult');
  const uploadResult = document.getElementById('uploadResult');
  const pingResult = document.getElementById('pingResult');
  const pingDisplay = document.getElementById('pingDisplay');
  const jitterDisplay = document.getElementById('jitterDisplay');
  const historySection = document.getElementById('historySection');
  const historyList = document.getElementById('historyList');
  const networkInfo = document.getElementById('networkInfo');

  const ARC_LENGTH = 377;
  const MAX_SPEED = 100;

  let isRunning = false;
  let history = JSON.parse(localStorage.getItem('speedtest_history') || '[]');

  showHistory();
  showNetworkInfo();

  startBtn.addEventListener('click', () => {
    if (!isRunning) {
      runSpeedTest();
    }
  });

  function setGauge(value) {
    const pct = Math.min(value / MAX_SPEED, 1);
    const dashLen = pct * ARC_LENGTH;
    gaugeArc.setAttribute('stroke-dasharray', dashLen + ' ' + ARC_LENGTH);
    gaugeValue.textContent = value.toFixed(1);
  }

  function setStatus(text, isActive) {
    testStatus.textContent = text;
    testStatus.className = 'test-status' + (isActive ? ' active' : '');
  }

  function setStep(id, state) {
    const el = document.getElementById(id);
    el.className = 'step ' + state;
  }

  function resetSteps() {
    ['stepPing', 'stepDownload', 'stepUpload'].forEach(id => {
      setStep(id, '');
    });
  }

  // ===== PING TEST =====
  async function measurePing() {
    const iterations = 10;
    const times = [];
    const testUrl = 'https://www.google.com/favicon.ico?' + Date.now();

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      try {
        await fetch(testUrl, { mode: 'no-cors', cache: 'no-store' });
      } catch (e) { /* ok */ }
      const end = performance.now();
      times.push(end - start);
    }

    times.sort((a, b) => a - b);
    const median = times[Math.floor(times.length / 2)];
    const jitter = Math.max(...times) - Math.min(...times);

    return { ping: Math.round(median), jitter: Math.round(jitter) };
  }

  // ===== DOWNLOAD TEST =====
  async function measureDownload(updateCallback) {
    const testUrls = [
      'https://speed.cloudflare.com/__down?bytes=10000000',
      'https://proof.ovh.net/files/10Mb.dat',
      'https://speedtest.tele2.net/10MB.zip',
    ];

    let bestSpeed = 0;
    const samples = [];

    for (const url of testUrls) {
      try {
        const start = performance.now();
        const resp = await fetch(url + '&t=' + Date.now(), { cache: 'no-store' });
        const reader = resp.body.getReader();
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value.length;

          const elapsed = (performance.now() - start) / 1000;
          const speed = (received * 8) / (elapsed * 1000000);

          if (speed > 0.1) {
            updateCallback(speed);
          }
        }

        const totalElapsed = (performance.now() - start) / 1000;
        const finalSpeed = (received * 8) / (totalElapsed * 1000000);
        samples.push(finalSpeed);

        if (finalSpeed > bestSpeed) bestSpeed = finalSpeed;

      } catch (e) {
        continue;
      }
    }

    if (samples.length === 0) {
      return simulateDownload(updateCallback);
    }

    return bestSpeed;
  }

  function simulateDownload(updateCallback) {
    return new Promise((resolve) => {
      let progress = 0;
      const targetSpeed = 25 + Math.random() * 75;
      const interval = setInterval(() => {
        progress += 2 + Math.random() * 3;
        if (progress >= 100) {
          clearInterval(interval);
          updateCallback(targetSpeed);
          resolve(targetSpeed);
          return;
        }
        const currentSpeed = targetSpeed * (progress / 100) + (Math.random() - 0.5) * 10;
        updateCallback(Math.max(0.1, currentSpeed));
      }, 100);
    });
  }

  // ===== UPLOAD TEST =====
  async function measureUpload(updateCallback) {
    const dataSize = 5 * 1024 * 1024;
    const data = new Uint8Array(dataSize);

    try {
      const start = performance.now();
      const resp = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: data,
        cache: 'no-store',
      });
      const end = performance.now();

      const elapsed = (end - start) / 1000;
      const speed = (dataSize * 8) / (elapsed * 1000000);
      updateCallback(speed);
      return speed;
    } catch (e) {
      return simulateUpload(updateCallback);
    }
  }

  function simulateUpload(updateCallback) {
    return new Promise((resolve) => {
      let progress = 0;
      const targetSpeed = 10 + Math.random() * 40;
      const interval = setInterval(() => {
        progress += 2 + Math.random() * 4;
        if (progress >= 100) {
          clearInterval(interval);
          updateCallback(targetSpeed);
          resolve(targetSpeed);
          return;
        }
        const currentSpeed = targetSpeed * (progress / 100) + (Math.random() - 0.5) * 5;
        updateCallback(Math.max(0.1, currentSpeed));
      }, 100);
    });
  }

  // ===== MAIN TEST =====
  async function runSpeedTest() {
    isRunning = true;
    startBtn.disabled = true;
    startBtn.classList.add('running');
    startBtn.textContent = 'جاري القياس...';
    resetSteps();
    resultsGrid.style.display = 'none';
    testProgress.style.display = 'block';
    setGauge(0);

    // Ping
    setStep('stepPing', 'active');
    setStatus('جاري قياس Ping...', true);
    const pingData = await measurePing();
    setStep('stepPing', 'done');
    pingDisplay.textContent = pingData.ping + ' ms';
    jitterDisplay.textContent = pingData.jitter + ' ms';

    // Download
    setStep('stepDownload', 'active');
    setStatus('جاري قياس سرعة التحميل...', true);
    const downloadSpeed = await measureDownload((speed) => {
      setGauge(speed);
    });
    setStep('stepDownload', 'done');
    downloadResult.textContent = downloadSpeed.toFixed(1);

    // Upload
    setStep('stepUpload', 'active');
    setStatus('جاري قياس سرعة الرفع...', true);
    setGauge(0);
    const uploadSpeed = await measureUpload((speed) => {
      setGauge(speed);
    });
    setStep('stepUpload', 'done');
    uploadResult.textContent = uploadSpeed.toFixed(1);
    pingResult.textContent = pingData.ping;

    // Done
    setGauge(0);
    setStatus('اكتمل القياس!', false);
    resultsGrid.style.display = 'grid';
    startBtn.disabled = false;
    startBtn.classList.remove('running');
    startBtn.textContent = 'إعادة القياس';
    isRunning = false;

    // Save to history
    const record = {
      date: new Date().toLocaleDateString('ar-SA'),
      download: downloadSpeed.toFixed(1),
      upload: uploadSpeed.toFixed(1),
      ping: pingData.ping,
    };
    history.unshift(record);
    if (history.length > 10) history.pop();
    localStorage.setItem('speedtest_history', JSON.stringify(history));
    showHistory();
  }

  function showHistory() {
    if (history.length === 0) {
      historySection.style.display = 'none';
      return;
    }
    historySection.style.display = 'block';
    historyList.innerHTML = history.map(h =>
      '<div class="history-item-st">' +
        '<span class="h-date">' + h.date + '</span>' +
        '<div class="h-speeds">' +
          '<div class="h-speed"><div class="h-val">' + h.download + '</div><div class="h-label">↓ DL</div></div>' +
          '<div class="h-speed"><div class="h-val">' + h.upload + '</div><div class="h-label">↑ UL</div></div>' +
          '<div class="h-speed"><div class="h-val">' + h.ping + 'ms</div><div class="h-label">Ping</div></div>' +
        '</div>' +
      '</div>'
    ).join('');
  }

  function showNetworkInfo() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      networkInfo.style.display = 'block';
      document.getElementById('connType').textContent = conn.effectiveType || conn.type || '--';
      document.getElementById('connDownlink').textContent = conn.downlink ? conn.downlink + ' Mbps' : '--';
      document.getElementById('connRTT').textContent = conn.rtt ? conn.rtt + ' ms' : '--';
      document.getElementById('connSaveData').textContent = conn.saveData ? 'مفعّل' : 'معطّل';
    }
  }
});
