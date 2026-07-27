document.addEventListener('DOMContentLoaded', () => {
  initHijriNow();
  initNextCountdowns();
  initConverters();
});

// ===== HIJRI DATE NOW =====
function initHijriNow() {
  const hijriEl = document.getElementById('hijriNow');
  const gregEl = document.getElementById('gregorianNow');

  const now = new Date();
  const hijri = gregorianToHijri(now.getFullYear(), now.getMonth() + 1, now.getDate());

  const hijriMonths = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];

  const gregMonths = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  hijriEl.textContent = hijri.day + ' ' + hijriMonths[hijri.month - 1] + ' ' + hijri.year + ' هـ';
  gregEl.textContent = days[now.getDay()] + ' ' + now.getDate() + ' ' + gregMonths[now.getMonth()] + ' ' + now.getFullYear() + ' م';
}

// ===== EVENTS DATA =====
function getEvents() {
  return [
    { id: 'isra',     emoji: '🌙', title: 'ذكرى الإسراء والمعراج',      hijriStr: '٢٧ رجب ١٤٤٨ هـ',       gregDate: new Date('2027-01-05T00:00:00') },
    { id: 'shaaban',  emoji: '✨', title: 'ليلة النصف من شعبان',        hijriStr: '١٥ شعبان ١٤٤٨ هـ',      gregDate: new Date('2027-01-23T00:00:00') },
    { id: 'ramadan',  emoji: '🌙', title: 'بداية شهر رمضان المبارك',   hijriStr: '١ رمضان ١٤٤٨ هـ',       gregDate: new Date('2027-02-08T00:00:00') },
    { id: 'qadr',     emoji: '⭐', title: 'تحري ليلة القدر',            hijriStr: '٢٧ رمضان ١٤٤٨ هـ',      gregDate: new Date('2027-03-06T00:00:00') },
    { id: 'fitr',     emoji: '🎉', title: 'عيد الفطر المبارك',          hijriStr: '١ شوال ١٤٤٨ هـ',        gregDate: new Date('2027-03-09T00:00:00') },
    { id: 'arafa',    emoji: '🧎', title: 'يوم عرفة',                   hijriStr: '٩ ذو الحجة ١٤٤٨ هـ',   gregDate: new Date('2027-05-15T00:00:00') },
    { id: 'adha',     emoji: '🐑', title: 'عيد الأضحى المبارك',         hijriStr: '١٠ ذو الحجة ١٤٤٨ هـ',  gregDate: new Date('2027-05-16T00:00:00') },
    { id: 'hijri',    emoji: '📅', title: 'رأس السنة الهجرية ١٤٤٩',    hijriStr: '١ محرم ١٤٤٩ هـ',        gregDate: new Date('2027-06-06T00:00:00') },
    { id: 'ashura',   emoji: '🕌', title: 'يوم عاشوراء',               hijriStr: '١٠ محرم ١٤٤٩ هـ',      gregDate: new Date('2027-06-15T00:00:00') },
  ];
}

function getGregMonths() {
  return [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
}

// ===== NEXT 2 EVENTS HERO COUNTDOWN =====
function initNextCountdowns() {
  const events = getEvents();
  const now = new Date();
  const gm = getGregMonths();

  // Find next 2 upcoming events
  const upcoming = events.filter(ev => ev.gregDate > now).slice(0, 2);

  // If fewer than 2 upcoming, wrap from start
  if (upcoming.length < 2) {
    for (const ev of events) {
      if (upcoming.length >= 2) break;
      const wrapped = { ...ev, gregDate: new Date(ev.gregDate) };
      wrapped.gregDate.setFullYear(wrapped.gregDate.getFullYear() + 1);
      // Avoid duplicates
      if (!upcoming.find(u => u.id === wrapped.id)) {
        upcoming.push(wrapped);
      }
    }
  }

  // Render each hero card
  upcoming.forEach((ev, i) => {
    const prefix = i === 0 ? 'next1' : 'next2';
    document.getElementById(prefix + 'Emoji').textContent = ev.emoji;
    document.getElementById(prefix + 'Title').textContent = ev.title;
    document.getElementById(prefix + 'Hijri').textContent = ev.hijriStr;

    const gd = ev.gregDate;
    document.getElementById(prefix + 'Gregorian').textContent =
      gd.getDate() + ' ' + gm[gd.getMonth()] + ' ' + gd.getFullYear() + ' م';

    function update() {
      const diff = ev.gregDate - new Date();
      if (diff <= 0) {
        document.getElementById(prefix + '-d').textContent = '0';
        document.getElementById(prefix + '-h').textContent = '0';
        document.getElementById(prefix + '-m').textContent = '0';
        document.getElementById(prefix + '-s').textContent = '0';
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById(prefix + '-d').textContent = d;
      document.getElementById(prefix + '-h').textContent = h;
      document.getElementById(prefix + '-m').textContent = m;
      document.getElementById(prefix + '-s').textContent = s;
    }

    update();
    setInterval(update, 1000);
  });

  // Hide second card if somehow missing
  if (upcoming.length < 2) {
    document.getElementById('hero2').style.display = 'none';
  }
}

// ===== GREGORIAN TO HIJRI =====
function gregorianToHijri(gY, gM, gD) {
  let jd = Math.floor((1461 * (gY + 4800 + Math.floor((gM - 14) / 12))) / 4) +
           Math.floor((367 * (gM - 2 - 12 * Math.floor((gM - 14) / 12))) / 12) -
           Math.floor((3 * Math.floor((gY + 4900 + Math.floor((gM - 14) / 12)) / 100)) / 4) +
           gD - 32075;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const remainder = l - 10631 * n + 354;
  const j = Math.floor((10985 - remainder) / 5316) * Math.floor((50 * remainder) / 17719) +
            Math.floor(remainder / 5670) * Math.floor((43 * remainder) / 15238);
  const rem2 = remainder - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
               Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const hM = Math.floor((24 * rem2) / 709);
  const hD = rem2 - Math.floor((709 * hM) / 24);
  const hY = 30 * n + j - 30;

  return { year: hY, month: hM, day: hD };
}

// ===== HIJRI TO GREGORIAN =====
function hijriToGregorian(hY, hM, hD) {
  const jd = Math.floor((11 * hY + 3) / 30) +
             354 * hY +
             30 * hM -
             Math.floor((hM - 1) / 2) +
             hD +
             1948440 - 385;

  let l = jd + 68569;
  const n = Math.floor((4 * l) / 146097);
  l = l - Math.floor((146097 * n + 3) / 4);
  const i = Math.floor((4000 * (l + 1)) / 1461001);
  l = l - Math.floor((1461 * i) / 4) + 31;
  const j = Math.floor((80 * l) / 2447);
  const gD = l - Math.floor((2447 * j) / 80);
  l = Math.floor(j / 11);
  const gM = j + 2 - 12 * l;
  const gY = 100 * (n - 49) + i + l;

  return { year: gY, month: gM, day: gD };
}

// ===== CONVERTERS =====
function initConverters() {
  const hijriMonths = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];

  const gregMonths = getGregMonths();

  // Hijri to Gregorian
  document.getElementById('hijriToGregBtn').addEventListener('click', () => {
    const d = parseInt(document.getElementById('hDay').value);
    const m = parseInt(document.getElementById('hMonth').value);
    const y = parseInt(document.getElementById('hYear').value);

    if (!d || !m || !y) {
      document.getElementById('hijriResult').innerHTML = '<span class="result-label" style="color: #fbbf24;">يرجى ملء جميع الحقول</span>';
      return;
    }

    const result = hijriToGregorian(y, m, d);
    document.getElementById('hijriResult').innerHTML =
      '<span class="result-label">الموافق</span>' +
      '<span class="result-value">' + result.day + ' ' + gregMonths[result.month - 1] + ' ' + result.year + ' م</span>';
  });

  // Gregorian to Hijri
  document.getElementById('gregToHijriBtn').addEventListener('click', () => {
    const d = parseInt(document.getElementById('gDay').value);
    const m = parseInt(document.getElementById('gMonth').value);
    const y = parseInt(document.getElementById('gYear').value);

    if (!d || !m || !y) {
      document.getElementById('gregorianResult').innerHTML = '<span class="result-label" style="color: #fbbf24;">يرجى ملء جميع الحقول</span>';
      return;
    }

    const result = gregorianToHijri(y, m, d);
    document.getElementById('gregorianResult').innerHTML =
      '<span class="result-label">الموافق</span>' +
      '<span class="result-value">' + result.day + ' ' + hijriMonths[result.month - 1] + ' ' + result.year + ' هـ</span>';
  });
}
