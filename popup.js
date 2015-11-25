document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get('cc_url', function(d){
    populate_cc_url(d.cc_url);
    get_cc_xml(d.cc_url);

  });
  var saveUrlBtn = document.getElementById('save_url_btn');
  saveUrlBtn.addEventListener('click', function() {
    chrome.storage.sync.set({'cc_url': document.getElementById('cc_url_txt').value}, function() {alert('Saved');})
  });
});

function populate_cc_url(cc_url) {
  document.getElementById('cc_url_txt').value = cc_url;
}

function get_cc_xml(cc_url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", cc_url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var xml_str = xhr.responseText;

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xml_str,"text/xml");

      var projects = xmlDoc.getElementsByTagName("Project")
      project_array = [];
      config_array = [];
      for (var i = projects.length - 1; i >= 0; i--) {
        project_array.push('<li>' + projects[i].getAttribute('name') + ' - ' + projects[i].getAttribute('lastBuildStatus') + '</li>');
        config_array.push('<li><input type="checkbox" name="' + projects[i].getAttribute('name') + '">' + projects[i].getAttribute('name')  + '</li>');
      };
      document.getElementById('status').innerHTML = ('<ul>' + project_array.join(' ') + '</ul>');
      document.getElementById('config').innerHTML = ('<ul>' + config_array.join(' ') + '</ul>');
    }
  }
  xhr.send();
}
window.setTimeout(alls, 1000);
function alls(){
  console.log('1');
}