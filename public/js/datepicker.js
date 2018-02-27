var nativePicker = document.querySelector('.nativeDatePicker');
var fallbackPicker = document.querySelector('.fallbackDatePicker');

var yearSelect = document.querySelector('#year');
var monthSelect = document.querySelector('#month');
var daySelect = document.querySelector('#day');

fallbackPicker.style.display = 'none';

var test = document.createElement('input');
test.type = 'date';

if (test.type === 'text') {
  nativePicker.style.display = 'none';
  fallbackPicker.style.display = 'block';

  populateDays(monthSelect.value);
  populateYears();
}

function populateDays(month) {
  while (daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }

  var dayNum;

  if (month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December') {
    dayNum = 31;
  } else if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
    dayNum = 30;
  } else {
    var year = yearSelect.value;
    (year - 2016) % 4 === 0 ? dayNum = 29 : dayNum = 28;
  }

  for (i = 1; i <= dayNum; i++) {
    var option = document.createElement('option');
    option.textContent = i;
    daySelect.appendChild(option);
  }

  if (previousDay) {
    daySelect.value = previousDay;

    if (daySelect.value === "") {
      daySelect.value = previousDay - 1;
    }

    if (daySelect.value === "") {
      daySelect.value = previousDay - 2;
    }

    if (daySelect.value === "") {
      daySelect.value = previousDay - 3;
    }
  }
}

function populateYears() {
  var date = new Date();
  var year = date.getFullYear();

  for (var i = 0; i <= 100; i++) {
    var option = document.createElement('option');
    option.textContent = year - i;
    yearSelect.appendChild(option);
  }
}

yearSelect.onchange = function() {
  populateDays(monthSelect.value);
}

monthSelect.onchange = function() {
  populateDays(monthSelect.value);
}

var previousDay;
daySelect.onchange = function() {
  previousDay = daySelect.value;
}