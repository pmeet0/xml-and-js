
  const Reset = () => {
    window.location.replace(window.location.pathname);
  };

const htmlToElement = (html) => {

    const template = document.createElement("template");
    html = html.trim(); 
    
    template.innerHTML = html;
    return template.content.firstChild;
  };
  
  const render = () => {
    const table = document.getElementById("tb");
  
    if (!table) {
      throw new Error("Table element is not found");
    }
  
    let data = [
        {   id: 1, 
            first_name: "Husain", 
            last_name: "Zeale",
            email: "hzeale0@odnoklassniki.ru",
            gender: "Male",
            ip_address: "143.237.191.245"
        },
        { 
            id: 2,first_name: "Michale",
            last_name: "Delgado",
            email: "mdelgado1@paginegialle.it",
            gender: "Male",
            ip_address: "144.2.126.19"
        },
        { 
            id: 3,
            first_name: "Gaspard",
            last_name: "Upwood",
            email: "gupwood2@fastcompany.com",
            gender: "Male",
            ip_address: "147.85.27.165"
        },
        { 
            id: 4,
            first_name: "Gussy",
            last_name: "Dowzell",
            email: "gdowzell3@ox.ac.uk",
            gender: "Male",
            ip_address: "22.201.167.239"
        },
        { 
            id: 5,
            first_name: "Alida",
            last_name: "Macias",
            email: "amacias4@slate.com",
            gender: "Female",
            ip_address: "166.62.41.24"
        },
        { 
            id: 6,
            first_name: "Tess",
            last_name: "Sainte Paul",
            email: "tsaintepaul5@xinhuanet.com",
            gender: "Female",
            ip_address: "58.80.74.111"
        },
        {
            id: 7,
            first_name: "Germaine",
            last_name: "Winnett",
            email: "gwinnett6@parallels.com",
            gender: "Genderqueer",
            ip_address: "224.15.42.167"
        },
        {
            id: 8,
            first_name: "Mei",
            last_name: "Swansbury",
            email: "mswansbury7@uol.com.br",
            gender: "Female",
            ip_address: "191.235.203.177"
        },
        {
            id: 9,
            first_name: "Brietta",
            last_name: "Greenfield",
            email: "bgreenfield8@qq.com",
            gender: "Male",
            ip_address: "72.108.253.70"
        },
        {
            id: 10,
            first_name: "Guinna",
            last_name: "Dagnan",
            email: "gdagnan9@thetimes.co.uk",
            gender: "Female",
            ip_address: "108.233.202.64"
        }];
  
    const withFilters = Boolean(window.location.search);
  
    if (withFilters) 
    {
        const params = new URLSearchParams(window.location.search);
        const searchTerm = params.get('name').toLowerCase();
        const inputControl = document.getElementById('name-term');

        inputControl.value = searchTerm;
        console.log(searchTerm)

        data = data.filter(element => 
            {
                return element.first_name.toLowerCase().includes(searchTerm)||
                element.last_name.includes(searchTerm)||
                element.email.includes(searchTerm)||
                element.gender.includes(searchTerm)||
                element.ip_address.includes(searchTerm);
        });
      }
  
    const rows = data.map(({ id, first_name, last_name, email, gender, ip_address}) =>
      table.appendChild(
        htmlToElement(
          `<tr id="table-row-${id}">
          <td>${id}</td>
          <td>${first_name}</td>
          <td>${last_name}</td>
          <td>${email}</td>
          <td>${gender}</td>
          <td>${ip_address}</td>
          </tr>`
        )
      )
    );
  };
  render();