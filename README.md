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
(s = document.createElement('script')).src = 'https://raw.githubusercontent.com/TerraEgg/seqta-exporter/main/script.js', document.head.appendChild(s);
