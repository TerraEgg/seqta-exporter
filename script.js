// Paste this entire thing into your console

(function() {
  // Config
  const config = {
    titleFormat: "{subject}",           // Options: {subject}, {room}, {teacher}, or combine like "{subject} - {room}" 
    descriptionFormat: "Room: {room}\nTeacher: {teacher}", // What to include in description
    location: "{room}",                  // What to use as location
    includeWeekends: false               // Set to true to include weekend events
  };
  // End of config
  
  const events = [];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const entries = document.querySelectorAll('.entry.class');
  
  entries.forEach(entry => {
    const dayContainer = entry.closest('.entriesWrapper');
    const dateStr = dayContainer ? dayContainer.getAttribute('data-date') : null;
    
    if (!dateStr) return;
    
    const date = new Date(dateStr);
    const dayName = dayNames[date.getDay()];
    const dayOfWeek = date.getDay();
    
    // Skip weekends
    if (!config.includeWeekends && (dayOfWeek === 0 || dayOfWeek === 6)) return;
    
    // Extract classes details
    const subject = entry.querySelector('.title')?.textContent.trim() || 'No title';
    const times = entry.querySelector('.times')?.textContent.trim() || 'No time';
    const teacher = entry.querySelector('.teacher')?.textContent.trim() || 'No teacher';
    const room = entry.querySelector('.room')?.textContent.trim() || '';
    
    const [startTime, endTime] = times.split('–').map(t => t.trim());
    
    events.push({
      date: dateStr,
      dayName,
      dayOfWeek,
      subject,
      startTime,
      endTime,
      teacher,
      room
    });
  });
  
  // Sort by day of week and time (not rly important, but nice to have)
  events.sort((a, b) => {
    if (a.dayOfWeek !== b.dayOfWeek) {
      return a.dayOfWeek - b.dayOfWeek;
    }
    return a.startTime.localeCompare(b.startTime);
  });
  
  // Output - Thank AI for the style
  console.log('=== TIMETABLE EVENTS ===\n');
  console.table(events.map(e => ({
    Day: e.dayName,
    Time: `${e.startTime}–${e.endTime}`,
    Subject: e.subject,
    Teacher: e.teacher,
    Room: e.room
  })));
  
  console.log('\n=== DETAILED VIEW ===');
  let currentDay = '';
  events.forEach(event => {
    if (event.dayName !== currentDay) {
      currentDay = event.dayName;
      console.log(`\n📅 ${event.dayName}`);
    }
    console.log(`  ⏰ ${event.startTime}–${event.endTime} - ${event.subject}`);
    console.log(`     👨‍🏫 ${event.teacher}`);
    console.log(`     🏫 ${event.room || 'No room specified'}`);
  });
  
  console.log(`\n\nTotal events: ${events.length}`);
  
  // Generate the CSV file (for calander)
  function formatField(template, event) {
    return template
      .replace(/{subject}/g, event.subject)
      .replace(/{room}/g, event.room)
      .replace(/{teacher}/g, event.teacher);
  }
  
  function generateCSV() {
    let csv = 'Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\n';
    
    events.forEach(event => {
      const title = formatField(config.titleFormat, event);
      const description = formatField(config.descriptionFormat, event).replace(/\n/g, ' ');
      const location = formatField(config.location, event);
      
      csv += `"${title}",`;
      csv += `${event.date},`;
      csv += `${event.startTime},`;
      csv += `${event.date},`;
      csv += `${event.endTime},`;
      csv += `False,`;
      csv += `"${description}",`;
      csv += `"${location}",`;
      csv += `False\n`;
    });
    
    return csv;
  }
  
  const csv = generateCSV();
  
  // Download CSV
  console.log('\n=== GOOGLE CALENDAR EXPORT ===');
  console.log('To download the CSV file, run: downloadCSV()');
  
  window.downloadCSV = function() {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timetable.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    console.log('CSV downloaded! Import it to Google Calendar (or a calendar that suports .csv imports).');
    console.log('\nImport instructions:');
    console.log('1. Go to Google Calendar (calendar.google.com)');
    console.log('2. Click the gear icon → Settings');
    console.log('3. Click "Import & Export" in the left sidebar');
    console.log('4. Click "Select file from your computer"');
    console.log('5. Choose the downloaded timetable.csv file');
    console.log('6. Select which calendar to add events to');
    console.log('7. Click "Import"');
    console.log('\n⚠️ Note: You may need to manually set events to repeat weekly in Google Calendar');
    console.log('\n If you cant find it odds are you exported the date of a eariler/later part of your timetable, either redownlaod a eariler version or locate it on your calander using the correct date.')
  };
  
  // Return the data for later (not used)
  return events;
})();
