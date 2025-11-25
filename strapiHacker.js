
const identifier= document.getElementById("identifier");
const mdp= document.getElementById("mdp");
const submit= document.getElementById("submit");
const restaurants = document.getElementById("restaurants");


document.addEventListener('DOMContentLoaded', () => {
    submit.addEventListener('click',(e)=>{
        e.preventDefault();
        console.log('click');
        fetch('http://localhost:1337/api/auth/local', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                identifier: identifier.value,
                password: mdp.value,
            })
        })
        .then(response => response.json())
        .then(json => {
                console.log(json.jwt);

                if (json.jwt) {
                    fetch('http://localhost:1337/api/restaurants', {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${json.jwt}`,
                            "Accept": "application/json",
                        }

                    })
                        .then(response => response.json())
                        .then(json => {
                            console.log(json.data[0]);
                            json.data.forEach((item) => {
                                console.log("ITEM:", item); // <-- pour voir la vraie structure

                                const p = document.createElement("p");
                                p.textContent = item.Name;
                                console.log(p);
                                restaurants.appendChild(p)
                            })



                        })

                }
            }
        )
    })

})