const table = document.getElementById(`GC`);
const fileName = `./people.xml`;

const loadData = path => new Promise(resolve => 
    {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ({ target }) => 
    {
      if (target.readyState == 4 && target.status == 200) {
        resolve(target.responseXML);
      }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
  });

  const isFiltered = (name, NTerm) => 
  !name.toLowerCase().includes(NTerm.toLowerCase());
  
  const renderTableJS = (data, NTerm) => {
      const htmlString = JSON.parse(data).reduce((p, next) => {
     
        const fullName = `${next.first_name} ${next.last_name}`;
        if (NameTerms && isFiltered(fullName, NameTerms)) return previous;

        return p + `<tr>
            <td>${next.id}</td>
            <td>${fullName}</td>
            <td>${next.email}</td>
            <td>${next.gender}</td>
            <td>${next.ip_address}</td>
        </tr>`;
  }, );
  table.innerHTML = htmlString;
}

const onSubmit = (event) => {
    event.preventDefault();
    const NTerm = event.target.name.value;
    loadData(`./data.json`).then((data) => renderTableJS(data, NTerm));
};

const onReset = () => {
    loadData(`./data.json`).then((data) => renderTableJS(data));
};

onReset();