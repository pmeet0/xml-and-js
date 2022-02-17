const htmlToElement = (html) => {

    const t2 = document.createElement("t2");
    html = html.trim(); 
    t2.innerHTML = html;
    return t2.content.firstChild;
  };
  
  const loadData = (path, callback) => 
  {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = ({ target }) => 
      {
        if (target.readyState == 4 && target.status == 200) {
        callback(target.responseXML);
      }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
  };
  
  const generateTableRow = (item) => 
  {
    const rollno = item.attributes[0].textContent;
    const firstname = Array.from(item.getElementsByTagName('firstname'))[0];
    const lastname = Array.from(item.getElementsByTagName('lastname'))[0];
    const fullname = firstname.textContent+" "+lastname.textContent;
    const nickname = Array.from(item.getElementsByTagName('nickname'))[0];
    const marks = Array.from(item.getElementsByTagName('marks'))[0];
  
    return <tr>
      <td>${rollno}</td>
      <td>${fullname}</td>
      <td>${nickname.textContent}</td>
      <td>${marks.textContent}</td>
    </tr>;
  };
  
  const renderTable = (xmlData) => {
    const table = document.getElementById("t1");
  
    if (!table) 
    {
      throw new Error("table element not found!");
    }
  
    const nodes = Array.from(xmlData.documentElement.childNodes).filter(
      ({ nodeName }) => nodeName === 'student'
    );
  
    nodes.map((studentNode) =>
      table.appendChild(htmlToElement(generateTableRow(studentNode)))
    );
  };
  
  loadData('http://localhost:8080/week-6/assignments/students.xml', renderTable);