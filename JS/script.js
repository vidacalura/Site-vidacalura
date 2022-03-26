const lang = document.querySelector(".idioma");
const curriculoBtn = document.querySelector(".curriculo");
const sobreMim_h2 = document.querySelector(".aboutme-h2");
const sobreMim_p = document.querySelector(".aboutme-p");
const contato_h2 = document.querySelector(".contato-h2");
const projetos_h2 = document.querySelector(".projetos-h2");
const projetos_h3 = document.querySelector(".projetos-h3");

lang.addEventListener("click", changeLanguage);


function changeLanguage(){

    // Caso o idioma estiver em português:
    if (lang.textContent.includes("en")){

        lang.textContent = "pt br";
        curriculoBtn.textContent = "DOWNLOAD RESUME";
        sobreMim_h2.textContent = "About me:";

        sobreMim_p.textContent = "I am Lucas, a web developer and software developer starting in the technology field. \
        I develop complete and responsive websites and web applications using the LAMP stack and/or Firebase. I also develop Java and C applications. \
        I am always looking forward to learn more about this vast and intriguing field that is technology!";
        
        contato_h2.textContent = "Contact:";
        projetos_h2.textContent = "Projects:";
        projetos_h3.textContent = "These are some of my projects:";

    }
    // Caso o idioma estiver em inglês:
    else {

        lang.textContent = "en";
        curriculoBtn.textContent = "BAIXAR CURRÍCULO";
        sobreMim_h2.textContent = "Sobre mim:";

        sobreMim_p.textContent = "Eu sou Lucas, um web developer e software developer iniciando na área da tecnologia. \
        Eu desenvolvo sites completos e responsivos e aplicações web com o stack LAMP ou Firebase, e crio aplicações em Java e C. \
        Estou sempre buscando conhecer mais desta área tão vasta e bela que é a tecnologia!"

        contato_h2.textContent = "Entre em contato:";

        projetos_h2.textContent = "Projetos:";
        projetos_h3.textContent = "Esses são alguns de meus projetos:";

    }

}