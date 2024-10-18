class App {
    static dptos;
    static ciudades;

    static async main() {
        const linkDptos =
            "https://raw.githubusercontent.com/proyecto26/colombia/refs/heads/master/departments.json";
        const linkCiud =
            "https://raw.githubusercontent.com/proyecto26/colombia/refs/heads/master/cities.json";

        App.dptos = await App.fetchJSON(linkDptos);
        App.ciudades = await App.fetchJSON(linkCiud);
        const listOption = document.querySelectorAll("#main-menu a");
        const logo = document.querySelectorAll(".header .logo");
        logo.forEach((item) =>
            item.addEventListener("click", (e) => {
                let option = "ninguna";

                if (e != undefined) {
                    App.loadPage("./resources/html/inicio.html", "main");
                    e.preventDefault();
                }
            }),
        );
        // listOption.forEach(item => item.addEventListener('click', item => console.log(item);
        // ))
        listOption.forEach((item) => item.addEventListener("click", App.#mainMenu));
    }

    static #mainMenu = async (e) => {
        let option = "ninguna";
        if (e != undefined) {
            e.preventDefault();
            option = e.target.text;
            console.log(option);
        }

        switch (option) {
            case "Nuestro trabajo":
                App.loadPage();
                break;
            case "Acerca de...":
                App.loadPage("./resources/html/acerca.html", "main");
                break;
            case "Programas":
                App.loadPage("./resources/html/programas.html", "main");
                break;
            case "Contacto":
                await App.loadPage("./resources/html/contacto.html", "main");

                const selectDepts = document.querySelector("#region");
                const selectCiudad = document.querySelector("#ciudad");

                let deptos = "";
                App.dptos.data.forEach((element) => {
                    deptos += `<option value="${element.id}">${element.name}</option>`;
                });
                selectDepts.innerHTML = deptos;
                selectDepts.addEventListener("click", (e) => {
                    let ciudades = ``;
                    App.ciudades.data
                        .filter((d) => d.departmentId == e.target.value)
                        .forEach(
                            (e) =>
                                (ciudades += `<option value="${e.id}">${e.name}</option>`),
                        );
                    selectCiudad.innerHTML = ciudades;
                });

                break;
            default:
        }
    };

    static async fetchJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(
                    `Problema de acceso al recurso: ${response.status} - ${response.statusText}`,
                );
            }
            return await response.json();
        } catch (error) {
            console.error("No se pudieron recuperar los datos:", error);
        }
    }

    static async loadPage(url, container = null) {
        console.log("Hola");
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `${response.status} - ${response.statusText}, al intentar acceder al recurso '${response.url}'`,
                );
            }
            const html = await response.text();
            console.log(html);

            const element = document.querySelector(container);
            if (element) {
                element.innerHTML = html;
            }
            return element || html; // para permitir encadenamiento o para retornar el HTML
        } catch (e) {
            console.log(e);
        }
    }
}

App.main();
