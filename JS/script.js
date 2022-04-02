const lang = document.querySelector(".idioma");
const mode = document.getElementById("change-mode");
const curriculoBtn = document.querySelector(".curriculo");
const apresentacao_h1 = document.querySelector(".apresentacao-h1");
const apresentacao_h2 = document.querySelector(".apresentacao-h2")
const sobreMim_h2 = document.querySelector(".aboutme-h2");
const sobreMim_p1 = document.querySelector(".aboutme-p1");
const sobreMim_p2 = document.querySelector(".aboutme-p2");
const sobreMim_p3 = document.querySelector(".aboutme-p3");
const ednaldo_p = document.querySelector(".projeto-ednaldosite-p");
const trucoCli_p1 = document.querySelector(".projeto-truco-cli-p1");
const trucoCli_p2 = document.querySelector(".projeto-truco-cli-p2");
const contato_h2 = document.querySelector(".contato-h2");
const projetos_h2 = document.querySelector(".projetos-h2");
const projetos_h3 = document.querySelector(".projetos-h3");
const linkedinIcon = document.querySelector(".fa-linkedin");
const footerStorySet = document.querySelector(".storyset-text");
const footerAboutMe = document.querySelector(".footer-aboutme");
const footerProjetos = document.querySelector(".footer-projetos");
const footerContato = document.querySelector(".footer-contato");
const browser = document.getElementById("browser-emoji");

browserSelect();

lang.addEventListener("click", changeLanguage);
mode.addEventListener("click", changeMode);



function changeLanguage(){

    // Caso o idioma estiver em português:
    if (lang.textContent.includes("en")){

        // Hero section
        lang.textContent = "pt br";
        curriculoBtn.textContent = "DOWNLOAD RESUME";
        sobreMim_h2.textContent = "About me:";

        // About me
        sobreMim_p1.textContent = "I am Lucas, a web developer and software developer starting in the technology field.";
        sobreMim_p2.textContent = "I develop complete and responsive websites and web applications using the LAMP stack and/or Firebase. I also develop Java and C applications.";
        sobreMim_p3.textContent = "I am always looking forward to learn more about this vast and intriguing field that is technology!";
        
        // Projetos
        ednaldo_p.textContent = "My first website developed after my first year of studying web development. It's a fansite \
                                of the brazilian artist and musician Ednaldo Pereira, made entirely in pure HTML/CSS \
                                and hosted via Firebase.";

        trucoCli_p1.textContent = "The famous Spanish card game, truco, coded 100% in C, made to be played on terminals."
        trucoCli_p2.textContent = "In the game you play against a bot until one of the players sums 12 points, following the \
                                   classic Truco Paulista rules."     

        // Titles
        contato_h2.textContent = "Contact:";
        projetos_h2.textContent = "Projects:";
        projetos_h3.textContent = "These are some of my projects:";

        // Rodapé
        footerAboutMe.textContent = "About me";
        footerProjetos.textContent = "Projects"
        footerContato.textContent = "Contact";

    }
    // Caso o idioma estiver em inglês:
    else {

        lang.textContent = "en";
        curriculoBtn.textContent = "BAIXAR CURRÍCULO";
        sobreMim_h2.textContent = "Sobre mim:";

        sobreMim_p1.textContent = "Eu sou Lucas, um web developer e software developer iniciando na área da tecnologia."
        sobreMim_p2.textContent = "Eu desenvolvo sites completos e responsivos e aplicações web com o stack LAMP ou Firebase, e crio aplicações em Java e C."
        sobreMim_p3.textContent = "Estou sempre buscando conhecer mais desta área tão vasta e bela que é a tecnologia!"

        ednaldo_p.textContent = "Meu primeiro site desenvolvido após meu primeiro ano de estudo \
                                 de web development, um fansite do artista Ednaldo Pereira em \
                                 puro HTML/CSS hosteado via Firebase.";

        trucoCli_p1.textContent = "O famoso jogo de cartas espanhol, truco, desenvolvido 100% com a linguagem C, \
                                   feito para ser jogado em terminais."
        trucoCli_p2.textContent = "Nele você joga contra um bot até conseguir 12 pontos, \
                                   seguindo as regras padrão do truco paulista."  


        contato_h2.textContent = "Entre em contato:";

        projetos_h2.textContent = "Projetos:";
        projetos_h3.textContent = "Esses são alguns de meus projetos:";

        footerAboutMe.textContent = "Sobre mim";
        footerProjetos.textContent = "Projetos"
        footerContato.textContent = "Contato";
    }

}

function changeMode(){   

    apresentacao_h1.style.color = "white";
    apresentacao_h2.style.color = "white";

    if (!(document.body.style.background.includes("rgb(221, 221, 221)"))){
        document.body.style.background = "#DDD";
        document.body.style.color = "black";
     
        mode.className = "fa fa-moon clicavel";

        footerAboutMe.style.color = "black";
        footerProjetos.style.color = "black"
        footerContato.style.color = "black";

        linkedinIcon.style.color = "#DDD";

        footerStorySet.style.color = "black"
    }
    else {
        document.body.style.background = "var(--darkBlue)";
        document.body.style.color = "white";

        mode.className = "fa fa-sun clicavel";

        footerAboutMe.style.color = "white";
        footerProjetos.style.color = "white"
        footerContato.style.color = "white";

        linkedinIcon.style.color = "var(--darkBlue)";

        footerStorySet.style.color = "white"
    }

}

function browserSelect(){

    if (navigator.userAgent.includes("Firefox")){

        browser.className = "fa fa-firefox ver-projeto";
    
    }
    else if(navigator.userAgent.includes("Chrome")){
    
        browser.className = "fa fa-chrome ver-projeto";
    
    }
    else if(navigator.userAgent.includes("Edge")){
    
        browser.className = "fa fa-edge ver-projeto";
    
    }
    else if(navigator.userAgent.includes("Safari")){
    
        browser.className = "fa fa-safari ver-projeto";
    
    }    

}