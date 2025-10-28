# Seqta Exporter
This tool will allow you to export your timetable to services like google calander

## Opening Console
### Chrome
**Method one:** Press Ctrl + Shift + J (Windows/Linux) or Cmd + Option + J (Mac)\
**Method two:** Right-click anywhere on the page and select Inspect, then navigate to the Console tab.

### Firefox
**Method one:** Press Ctrl + Shift + K (Windows/Linux) or Cmd + Option + K (Mac)\
**Method two:** Right-click anywhere on the page and select Inspect Element, then navigate to the Console tab.

### Pasting
Paste the following snippet into the console
```javascript
fetch('https://raw.githubusercontent.com/TerraEgg/seqta-exporter/main/script.js').then(r => r.text()).then(eval);
```

## Important to google calander
1. **To download the CSV file run:**
```javascript 
downloadCSV()
```
2. Open [The Google Calander Import Section](https://calendar.google.com/calendar/u/0/r/settings/export)
3. Select the **import** section and upload the .csv file
4. Select the calander you want to import to.
5. Click import

## Can't find fix
1. Press the **```A```** key and locate the date where you imported you timetable
2. Press **```W```** to enable week mode
3. Select on a event (class)
4. Click the pencil icon and click **Edit Event**
5. Look for **```Dose Not Repeat```** and change it to **```Weekly on {day}```**
6. Repeat for every event (class)

## Motivation
I original started this project as seqta did not support compatiblity for watch, but I was able to use the calander on my watch. As I was lazy (even though it would be probably quicker to enter it manually) I created this tool to automate the conversion.
