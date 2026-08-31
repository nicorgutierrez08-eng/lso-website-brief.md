/* =========================================================================
   Language Service Organization - site behavior
   1. Mobile nav (hamburger)
   2. Scroll-reveal motion
   3. i18n scaffold (English only today; structured for es/zh later)
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- 1. Mobile navigation ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__menu");
  var backdrop = document.querySelector(".nav-backdrop");

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("data-open", String(open));
    if (backdrop) backdrop.setAttribute("data-open", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    if (backdrop) backdrop.addEventListener("click", function () { setMenu(false); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    // Reset when resizing back to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setMenu(false);
    });
  }

  /* ---------- 2. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 3. Languages (English / Español / 中文) ----------
     The site is written in English in the HTML; Spanish and Chinese live here
     as translations of each English line. The header switcher (EN / ES / 中)
     swaps them live and remembers the choice.

     TO FIX OR IMPROVE ANY WORDING: find the English line in quotes and edit the
     text after it under `es` (Spanish) or `zh` (Chinese). Any English line with
     no entry here simply stays in English, so partial translations are fine.
     Names, emails, and the org name are intentionally left untranslated.       */
  var I18N = {
    es: {
      "Home": "Inicio",
      "Our Work": "Nuestro trabajo",
      "Get Involved": "Participa",
      "Our People": "Nuestro equipo",
      "Join us": "Únete",
      "A student-led nonprofit at Avenues NYC, serving our communities through the power of language.": "Una organización sin fines de lucro dirigida por estudiantes de Avenues NYC, al servicio de nuestras comunidades a través del poder del idioma.",
      "Explore": "Explorar",
      "Connect": "Conéctate",
      "Language Service Organization. All rights reserved.": "Language Service Organization. Todos los derechos reservados.",
      "Made by students at Avenues NYC.": "Hecho por estudiantes de Avenues NYC.",
      "Made by Nicolas Gutierrez and students at Avenues NYC.": "Hecho por Nicolas Gutierrez y estudiantes de Avenues NYC.",
      "Language is a bridge across our city.": "El idioma es un puente que conecta nuestra ciudad.",
      "We are high school volunteers who use our fluency in English, Spanish, and Chinese to give back to New York City. Translation, connection, and real support, where it is needed most.": "Somos estudiantes de secundaria que usamos nuestra fluidez en inglés, español y chino para retribuir a la ciudad de Nueva York. Traducción, conexión y apoyo real, donde más se necesita.",
      "See our work": "Ver nuestro trabajo",
      "Get involved": "Participa",
      "Our mission": "Nuestra misión",
      "Language should bring our diverse city closer together.": "El idioma debe unir más a nuestra diversa ciudad.",
      "The Language Service Organization is a student-led nonprofit dedicated to giving back to the New York City community through the power of language. While we strive to break down communication barriers, our ultimate goal is to actively help our neighbors by providing essential translation, connection, and support where it is needed most.": "Language Service Organization es una organización sin fines de lucro dirigida por estudiantes y dedicada a retribuir a la comunidad de la ciudad de Nueva York a través del poder del idioma. Si bien nos esforzamos por derribar las barreras de comunicación, nuestro objetivo final es ayudar activamente a nuestros vecinos brindando traducción, conexión y apoyo esenciales donde más se necesitan.",
      "We believe language should be a bridge that brings our diverse city closer together.": "Creemos que el idioma debe ser un puente que acerque a nuestra diversa ciudad.",
      "What we do": "Lo que hacemos",
      "Fluency, put to work for our neighbors.": "Fluidez al servicio de nuestros vecinos.",
      "Our high school volunteers use their fluency in English, Spanish, and Chinese to serve local NYC communities. We host multilingual events, offer real-time translation assistance, and partner with local organizations so everyone has access to the resources they need to thrive.": "Nuestros voluntarios de secundaria usan su fluidez en inglés, español y chino para servir a las comunidades locales de Nueva York. Organizamos eventos multilingües, ofrecemos asistencia de traducción en tiempo real y colaboramos con organizaciones locales para que todos tengan acceso a los recursos que necesitan para prosperar.",
      "Meet our partner organizations": "Conoce a nuestras organizaciones aliadas",
      "In the community": "En la comunidad",
      "Our impact": "Nuestro impacto",
      "Showing up, over and over.": "Presentes, una y otra vez.",
      "Volunteer hours contributed": "Horas de voluntariado aportadas",
      "Across our weekly programs since January 2025, counting all volunteers.": "En nuestros programas semanales desde enero de 2025, contando a todos los voluntarios.",
      "Recurring service sessions": "Jornadas de servicio recurrentes",
      "Every Saturday at St. Clement's and every Wednesday at New Sanctuary Coalition during the school year.": "Cada sábado en St. Clement's y cada miércoles en New Sanctuary Coalition durante el año escolar.",
      "Special events and drives": "Eventos y campañas especiales",
      "Including JASA senior programming, the MOCA Lunar New Year event, and food, toy, and clothing drives at St. Peter's Church.": "Incluyendo la programación para personas mayores de JASA, el evento del Año Nuevo Lunar de MOCA y campañas de comida, juguetes y ropa en St. Peter's Church.",
      "Student volunteers": "Estudiantes voluntarios",
      "High schoolers rotating across our service opportunities.": "Estudiantes de secundaria que rotan por nuestras oportunidades de servicio.",
      "Community partners": "Organizaciones aliadas",
      "St. Clement's, New Sanctuary Coalition, JASA, St. Peter's Church, MOCA, MintBox, Hudson Guild, Elliott-Chelsea Houses, Holy Apostles Soup Kitchen, KidsKnowRights, Queens Mutual Aid, Knowledge to Power Catalysts, Youth Today, La Opinión, and SpaceBridge / Visual Echo.": "St. Clement's, New Sanctuary Coalition, JASA, St. Peter's Church, MOCA, MintBox, Hudson Guild, Elliott-Chelsea Houses, Holy Apostles Soup Kitchen, KidsKnowRights, Queens Mutual Aid, Knowledge to Power Catalysts, Youth Today, La Opinión y SpaceBridge / Visual Echo.",
      "Languages": "Idiomas",
      "English, Spanish, and Chinese.": "Inglés, español y chino.",
      "Figures are estimates as of June 2026.": "Las cifras son estimaciones a junio de 2026.",
      "Speak English, Spanish, or Chinese? Put it to good use.": "¿Hablas inglés, español o chino? Dale un buen uso.",
      "We are always looking for passionate high schoolers in NYC who want to give back to the community.": "Siempre buscamos a estudiantes de secundaria apasionados en Nueva York que quieran retribuir a la comunidad.",
      "Join our team": "Únete a nuestro equipo",
      "Meet our people": "Conoce a nuestro equipo",
      "Hands-on impact across the boroughs.": "Impacto directo en todos los distritos.",
      "See how our volunteers are making a hands-on impact across the boroughs.": "Descubre cómo nuestros voluntarios generan un impacto directo en todos los distritos.",
      "We volunteer here on an ongoing basis distributing meals to those in need, working to make pantry operations cleaner and more efficient while helping community members through the food registration process.": "Aquí servimos de manera continua repartiendo comidas a quienes lo necesitan, ayudando a que la despensa funcione de forma más limpia y eficiente y acompañando a los miembros de la comunidad en el proceso de registro de alimentos.",
      "We support asylum seekers and immigrants navigating their new environment, offering real-time translation and assisting with community needs and administrative tasks.": "Apoyamos a solicitantes de asilo e inmigrantes que se adaptan a su nuevo entorno, ofreciendo traducción en tiempo real y ayudando con necesidades comunitarias y trámites administrativos.",
      "We connect with the elderly community through multilingual events in English, Spanish, and Chinese, including AI and tech literacy classes, Easter and Lunar New Year celebrations, and quality time together.": "Nos conectamos con la comunidad de personas mayores mediante eventos multilingües en inglés, español y chino, incluyendo clases de inteligencia artificial y alfabetización tecnológica, celebraciones de Pascua y del Año Nuevo Lunar, y momentos de convivencia.",
      "We organized a community outreach drive, collecting and distributing food, toys, and clothing to local individuals and families.": "Organizamos una campaña de ayuda comunitaria, recolectando y distribuyendo comida, juguetes y ropa a personas y familias de la zona.",
      "We partnered with the Museum of Chinese in America for a cultural event teaching Lunar New Year traditions, with hands-on craft sessions and a multilingual storytime.": "Nos asociamos con el Museum of Chinese in America para un evento cultural que enseñó las tradiciones del Año Nuevo Lunar, con talleres de manualidades y una hora del cuento multilingüe.",
      "We collaborated to distribute free home-planting kits to underserved communities, helping families grow sustainable food at home.": "Colaboramos para distribuir kits gratuitos de cultivo en casa a comunidades desatendidas, ayudando a las familias a cultivar alimentos sostenibles en su hogar.",
      "We partner with this longstanding Chelsea community center, supporting their programs and offering multilingual help to neighbors who need it.": "Colaboramos con este histórico centro comunitario de Chelsea, apoyando sus programas y ofreciendo ayuda multilingüe a los vecinos que la necesitan.",
      "We work alongside residents of the Elliott-Chelsea Houses, lending language support and a hand with community events and everyday needs.": "Trabajamos junto a los residentes de los Elliott-Chelsea Houses, brindando apoyo lingüístico y una mano con los eventos comunitarios y las necesidades cotidianas.",
      "We volunteer at one of the city's largest soup kitchens, serving meals and helping guests through the line in the language they speak.": "Servimos como voluntarios en uno de los comedores comunitarios más grandes de la ciudad, repartiendo comidas y atendiendo a los visitantes en el idioma que hablan.",
      "We support grassroots mutual aid in Queens, lending translation and volunteer help so neighbors can share resources and look out for one another.": "Apoyamos la ayuda mutua comunitaria en Queens, aportando traducción y voluntariado para que los vecinos compartan recursos y se cuiden entre sí.",
      "We collaborate with this education and youth-development nonprofit, supporting their work to help all children and youth thrive.": "Colaboramos con esta organización sin fines de lucro de educación y desarrollo juvenil, apoyando su labor para que todos los niños y jóvenes prosperen.",
      "We connect with this independent youth-focused news platform, sharing our community work and amplifying stories that matter to young people.": "Nos conectamos con esta plataforma independiente de noticias sobre juventud, compartiendo nuestro trabajo comunitario y amplificando historias que importan a los jóvenes.",
      "We work with the largest Spanish-language newspaper in the United States to amplify multilingual community stories and resources.": "Colaboramos con el periódico en español más grande de Estados Unidos para amplificar historias y recursos comunitarios multilingües.",
      "We take part in this theater-based exchange that brings young people together across cultures and languages to build friendships and understanding.": "Participamos en este intercambio basado en el teatro que reúne a jóvenes de distintas culturas e idiomas para crear amistades y entendimiento.",
      "Weekly, every Saturday": "Cada semana, todos los sábados",
      "Weekly, every Wednesday": "Cada semana, todos los miércoles",
      "More to come from all of these incredible organizations.": "Y esto es solo el comienzo de todo lo que haremos con estas increíbles organizaciones.",
      "Want to be part of the next event?": "¿Quieres ser parte del próximo evento?",
      "Use your languages to give back to NYC.": "Usa tus idiomas para retribuir a Nueva York.",
      "We are always looking for passionate high schoolers in NYC who speak English, Spanish, or Chinese. If you want to use your language skills to give back to the community, here is how to start.": "Siempre buscamos a estudiantes de secundaria apasionados en Nueva York que hablen inglés, español o chino. Si quieres usar tus habilidades lingüísticas para retribuir a la comunidad, así puedes empezar.",
      "Three steps": "Tres pasos",
      "From hello to your first event.": "Del primer hola a tu primer evento.",
      "Get in touch": "Ponte en contacto",
      "Send any of us an email. A quick hello is all it takes to get started.": "Envía un correo a cualquiera de nosotros. Un simple hola es todo lo que necesitas para empezar.",
      "Attend a club meeting": "Asiste a una reunión del club",
      "Come to our next meeting at school to learn about current partnerships and upcoming initiatives.": "Ven a nuestra próxima reunión en la escuela para conocer las colaboraciones actuales y las próximas iniciativas.",
      "Start volunteering": "Empieza a ser voluntario",
      "Join our current initiatives or lead your own.": "Únete a nuestras iniciativas actuales o lidera la tuya.",
      "Step one": "Primer paso",
      "Send us an email.": "Envíanos un correo.",
      "Reach out to either of us and we will help you find your place on the team.": "Escríbenos a cualquiera de los dos y te ayudaremos a encontrar tu lugar en el equipo.",
      "Join the Team": "Únete al equipo",
      "The students behind the work.": "Los estudiantes detrás del trabajo.",
      "Founded by Nicolas Gutierrez and fellow students, we are a team of high schoolers at Avenues in New York City, led by students and supported by faculty, all volunteering their time and language skills.": "Fundada por Nicolas Gutierrez y otros estudiantes, somos un equipo de estudiantes de secundaria de Avenues en la ciudad de Nueva York, dirigido por estudiantes y apoyado por el profesorado, todos donando su tiempo y sus habilidades lingüísticas.",
      "Leadership": "Liderazgo",
      "Founders and advisors.": "Fundadores y asesores.",
      "Members": "Miembros",
      "The volunteers who show up.": "Los voluntarios que siempre están.",
      "Want your name on this list?": "¿Quieres ver tu nombre en esta lista?",
      "Founder & President, Head of Chinese": "Fundador y presidente, director de chino",
      "Founder & President, Head of Spanish": "Fundador y presidente, director de español",
      "Vice President": "Vicepresidente",
      "Member": "Miembro",
      "Director of Media": "Director de medios",
      "Senior Advisor": "Asesor sénior",
      "Faculty Advisor": "Asesor docente",
      "Director of Outreach": "Director de Alcance",
      "Director of Partnerships": "Director de Alianzas",
      "Assistant Head of Spanish": "Subdirector de Español",
      "Assistant Head of Volunteer Programs": "Subdirector de Programas de Voluntariado",
      "Treasurer": "Tesorero",
      "Head of Volunteer Programs": "Director de Programas de Voluntariado"
    },
    zh: {
      "Home": "首页",
      "Our Work": "我们的工作",
      "Get Involved": "加入我们",
      "Our People": "我们的团队",
      "Join us": "加入我们",
      "A student-led nonprofit at Avenues NYC, serving our communities through the power of language.": "一个由 Avenues NYC 学生主导的非营利组织，用语言的力量服务我们的社区。",
      "Explore": "浏览",
      "Connect": "联系我们",
      "Language Service Organization. All rights reserved.": "Language Service Organization。版权所有。",
      "Made by students at Avenues NYC.": "由 Avenues NYC 的学生制作。",
      "Made by Nicolas Gutierrez and students at Avenues NYC.": "由 Nicolas Gutierrez 和 Avenues NYC 的学生制作。",
      "Language is a bridge across our city.": "语言是连接我们城市的桥梁。",
      "We are high school volunteers who use our fluency in English, Spanish, and Chinese to give back to New York City. Translation, connection, and real support, where it is needed most.": "我们是高中志愿者，运用流利的英语、西班牙语和中文回馈纽约市。在最需要的地方提供翻译、连接和切实的支持。",
      "See our work": "了解我们的工作",
      "Get involved": "加入我们",
      "Our mission": "我们的使命",
      "Language should bring our diverse city closer together.": "语言应当让我们多元的城市更加紧密。",
      "The Language Service Organization is a student-led nonprofit dedicated to giving back to the New York City community through the power of language. While we strive to break down communication barriers, our ultimate goal is to actively help our neighbors by providing essential translation, connection, and support where it is needed most.": "Language Service Organization 是一个由学生主导的非营利组织，致力于通过语言的力量回馈纽约市社区。我们努力打破沟通障碍，但我们的最终目标是积极帮助邻里，在最需要的地方提供必要的翻译、连接和支持。",
      "We believe language should be a bridge that brings our diverse city closer together.": "我们相信，语言应当成为一座让我们多元城市更加亲近的桥梁。",
      "What we do": "我们做什么",
      "Fluency, put to work for our neighbors.": "运用语言，服务邻里。",
      "Our high school volunteers use their fluency in English, Spanish, and Chinese to serve local NYC communities. We host multilingual events, offer real-time translation assistance, and partner with local organizations so everyone has access to the resources they need to thrive.": "我们的高中志愿者运用流利的英语、西班牙语和中文服务纽约本地社区。我们举办多语言活动，提供实时翻译协助，并与本地组织合作，让每个人都能获得茁壮成长所需的资源。",
      "Meet our partner organizations": "认识我们的合作组织",
      "In the community": "走进社区",
      "Our impact": "我们的影响",
      "Showing up, over and over.": "一次又一次，始终在场。",
      "Volunteer hours contributed": "贡献的志愿服务时长",
      "Across our weekly programs since January 2025, counting all volunteers.": "自 2025 年 1 月以来在我们每周的项目中，统计所有志愿者。",
      "Recurring service sessions": "定期服务活动",
      "Every Saturday at St. Clement's and every Wednesday at New Sanctuary Coalition during the school year.": "学年期间，每周六在 St. Clement's，每周三在 New Sanctuary Coalition。",
      "Special events and drives": "特别活动与募集",
      "Including JASA senior programming, the MOCA Lunar New Year event, and food, toy, and clothing drives at St. Peter's Church.": "包括 JASA 长者活动、MOCA 农历新年活动，以及在 St. Peter's Church 举办的食物、玩具和衣物募集。",
      "Student volunteers": "学生志愿者",
      "High schoolers rotating across our service opportunities.": "在各项服务机会中轮换参与的高中生。",
      "Community partners": "社区合作伙伴",
      "St. Clement's, New Sanctuary Coalition, JASA, St. Peter's Church, MOCA, MintBox, Hudson Guild, Elliott-Chelsea Houses, Holy Apostles Soup Kitchen, KidsKnowRights, Queens Mutual Aid, Knowledge to Power Catalysts, Youth Today, La Opinión, and SpaceBridge / Visual Echo.": "St. Clement's、New Sanctuary Coalition、JASA、St. Peter's Church、MOCA、MintBox、Hudson Guild、Elliott-Chelsea Houses、Holy Apostles Soup Kitchen、KidsKnowRights、Queens Mutual Aid、Knowledge to Power Catalysts、Youth Today、La Opinión 和 SpaceBridge / Visual Echo。",
      "Languages": "语言",
      "English, Spanish, and Chinese.": "英语、西班牙语和中文。",
      "Figures are estimates as of June 2026.": "数据为截至 2026 年 6 月的估算。",
      "Speak English, Spanish, or Chinese? Put it to good use.": "会说英语、西班牙语或中文？把它用在对的地方。",
      "We are always looking for passionate high schoolers in NYC who want to give back to the community.": "我们一直在寻找纽约市充满热情、愿意回馈社区的高中生。",
      "Join our team": "加入我们的团队",
      "Meet our people": "认识我们的团队",
      "Hands-on impact across the boroughs.": "在各区带来实实在在的影响。",
      "See how our volunteers are making a hands-on impact across the boroughs.": "看看我们的志愿者如何在各区带来实实在在的影响。",
      "We volunteer here on an ongoing basis distributing meals to those in need, working to make pantry operations cleaner and more efficient while helping community members through the food registration process.": "我们在这里长期做志愿服务，为有需要的人分发餐食，努力让食物救济站的运作更整洁高效，并帮助社区成员完成食物登记流程。",
      "We support asylum seekers and immigrants navigating their new environment, offering real-time translation and assisting with community needs and administrative tasks.": "我们帮助适应新环境的寻求庇护者和移民，提供实时翻译，并协助处理社区需求和行政事务。",
      "We connect with the elderly community through multilingual events in English, Spanish, and Chinese, including AI and tech literacy classes, Easter and Lunar New Year celebrations, and quality time together.": "我们通过英语、西班牙语和中文的多语言活动与长者群体建立联系，包括人工智能与科技素养课程、复活节和农历新年庆祝，以及共度美好时光。",
      "We organized a community outreach drive, collecting and distributing food, toys, and clothing to local individuals and families.": "我们组织了一次社区外展募集活动，为当地的个人和家庭收集并发放食物、玩具和衣物。",
      "We partnered with the Museum of Chinese in America for a cultural event teaching Lunar New Year traditions, with hands-on craft sessions and a multilingual storytime.": "我们与美国华人博物馆（MOCA）合作举办文化活动，讲解农历新年传统，包括动手手工环节和多语言故事时间。",
      "We collaborated to distribute free home-planting kits to underserved communities, helping families grow sustainable food at home.": "我们合作向资源匮乏的社区免费发放家庭种植套件，帮助家庭在家中种植可持续的食物。",
      "We partner with this longstanding Chelsea community center, supporting their programs and offering multilingual help to neighbors who need it.": "我们与这家历史悠久的切尔西社区中心合作，支持他们的项目，并为有需要的邻里提供多语言帮助。",
      "We work alongside residents of the Elliott-Chelsea Houses, lending language support and a hand with community events and everyday needs.": "我们与 Elliott-Chelsea Houses 的居民并肩合作，提供语言支持，并在社区活动和日常需求上伸出援手。",
      "We volunteer at one of the city's largest soup kitchens, serving meals and helping guests through the line in the language they speak.": "我们在全市最大的施食处之一做志愿者，分发餐食，并用来访者所讲的语言为他们提供帮助。",
      "We support grassroots mutual aid in Queens, lending translation and volunteer help so neighbors can share resources and look out for one another.": "我们支持皇后区的草根互助行动，提供翻译和志愿服务，让邻里之间能够共享资源、相互照应。",
      "We collaborate with this education and youth-development nonprofit, supporting their work to help all children and youth thrive.": "我们与这家教育与青年发展非营利组织合作，支持他们帮助所有儿童和青少年茁壮成长的工作。",
      "We connect with this independent youth-focused news platform, sharing our community work and amplifying stories that matter to young people.": "我们与这个独立的青年新闻平台建立联系，分享我们的社区工作，并传播对年轻人重要的故事。",
      "We work with the largest Spanish-language newspaper in the United States to amplify multilingual community stories and resources.": "我们与全美最大的西班牙语报纸合作，传播多语言的社区故事和资源。",
      "We take part in this theater-based exchange that brings young people together across cultures and languages to build friendships and understanding.": "我们参与这个以戏剧为基础的交流项目，让不同文化和语言的年轻人相聚，建立友谊与理解。",
      "Weekly, every Saturday": "每周六",
      "Weekly, every Wednesday": "每周三",
      "More to come from all of these incredible organizations.": "与这些了不起的组织，我们还有更多精彩即将到来。",
      "Want to be part of the next event?": "想参与下一次活动吗？",
      "Use your languages to give back to NYC.": "用你的语言回馈纽约市。",
      "We are always looking for passionate high schoolers in NYC who speak English, Spanish, or Chinese. If you want to use your language skills to give back to the community, here is how to start.": "我们一直在寻找纽约市充满热情、会说英语、西班牙语或中文的高中生。如果你想用自己的语言能力回馈社区，这里就是起点。",
      "Three steps": "三个步骤",
      "From hello to your first event.": "从打招呼到你的第一次活动。",
      "Get in touch": "联系我们",
      "Send any of us an email. A quick hello is all it takes to get started.": "给我们任何一个人发邮件。一句简单的问候就足以开始。",
      "Attend a club meeting": "参加社团会议",
      "Come to our next meeting at school to learn about current partnerships and upcoming initiatives.": "来参加我们在学校的下一次会议，了解当前的合作和即将开展的活动。",
      "Start volunteering": "开始做志愿者",
      "Join our current initiatives or lead your own.": "加入我们现有的项目，或带头发起你自己的项目。",
      "Step one": "第一步",
      "Send us an email.": "给我们发邮件。",
      "Reach out to either of us and we will help you find your place on the team.": "联系我们任何一位，我们会帮你在团队中找到属于你的位置。",
      "Join the Team": "加入团队",
      "The students behind the work.": "工作背后的学生们。",
      "Founded by Nicolas Gutierrez and fellow students, we are a team of high schoolers at Avenues in New York City, led by students and supported by faculty, all volunteering their time and language skills.": "由 Nicolas Gutierrez 和其他同学共同创立，我们是一支来自纽约市 Avenues 的高中生团队，由学生主导、教师支持，所有人都无偿贡献自己的时间和语言能力。",
      "Leadership": "领导团队",
      "Founders and advisors.": "创始人与顾问。",
      "Members": "成员",
      "The volunteers who show up.": "始终到场的志愿者们。",
      "Want your name on this list?": "想让你的名字也出现在这份名单上吗？",
      "Founder & President, Head of Chinese": "创始人兼会长，中文负责人",
      "Founder & President, Head of Spanish": "创始人兼会长，西班牙语负责人",
      "Vice President": "副会长",
      "Member": "成员",
      "Director of Media": "媒体负责人",
      "Senior Advisor": "高级顾问",
      "Faculty Advisor": "指导教师",
      "Director of Outreach": "外联负责人",
      "Director of Partnerships": "合作负责人",
      "Assistant Head of Spanish": "西班牙语副负责人",
      "Assistant Head of Volunteer Programs": "志愿项目副负责人",
      "Treasurer": "财务主管",
      "Head of Volunteer Programs": "志愿项目负责人"
    }
  };
  var I18N_HTMLLANG = { en: "en", es: "es", zh: "zh" };

  /* Snapshot the original English text of every text node once, so switching
     languages (and switching back to English) is exact and reversible. */
  var i18nNodes = [];
  if (document.body) {
    var i18nWalk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var i18nNode;
    while ((i18nNode = i18nWalk.nextNode())) {
      var parentName = i18nNode.parentNode && i18nNode.parentNode.nodeName;
      if (parentName === "SCRIPT" || parentName === "STYLE") continue;
      if (i18nNode.nodeValue && i18nNode.nodeValue.trim()) {
        i18nNodes.push({ node: i18nNode, en: i18nNode.nodeValue });
      }
    }
  }

  function applyLanguage(lang) {
    var dict = I18N[lang];
    document.documentElement.lang = I18N_HTMLLANG[lang] || "en";
    i18nNodes.forEach(function (item) {
      var original = item.en;
      if (!dict) { item.node.nodeValue = original; return; } // English
      var key = original.trim();
      var translated = dict[key];
      item.node.nodeValue = (translated != null) ? original.replace(key, translated) : original;
    });
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    try { localStorage.setItem("lso-lang", lang); } catch (e) {}
  }

  var switcher = document.querySelector(".lang-switch");
  if (switcher) {
    switcher.querySelectorAll("button").forEach(function (b) {
      b.disabled = false;
      b.removeAttribute("title");
      b.addEventListener("click", function () { applyLanguage(b.dataset.lang); });
    });
    var saved;
    try { saved = localStorage.getItem("lso-lang"); } catch (e) {}
    applyLanguage(saved === "es" || saved === "zh" ? saved : "en");
  }

  /* ---------- Photo slots ----------
     Each photo slot contains a labeled placeholder plus a real <img> that
     points at a file in assets/img/. If that file has not been added yet,
     the image fails to load and we hide it so the labeled placeholder (with
     the exact file name to upload) shows instead. Add the file with the name
     shown on the slot and the photo appears automatically. */
  function hidePhoto(img) { img.style.display = "none"; }
  document.querySelectorAll(".placeholder__img").forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) hidePhoto(img);
    img.addEventListener("error", function () { hidePhoto(img); });
    img.addEventListener("load", function () { if (img.naturalWidth === 0) hidePhoto(img); });
  });

  /* ---------- Scrollable photo gallery ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
    var track = gallery.querySelector(".gallery__track");
    var prev = gallery.querySelector("[data-gallery-prev]");
    var next = gallery.querySelector("[data-gallery-next]");
    if (!track) return;
    function step() {
      var card = track.querySelector(".placeholder");
      return card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    }
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
  });

  /* ---------- Photo sliders (sliding photos) ----------
     A [data-slider] shows one labeled placeholder at a time and slides
     between them. Works with any number of slides. Controls: prev/next
     arrows, clickable dots, touch swipe, and gentle autoplay that pauses on
     hover/focus, when off-screen, and when the user prefers reduced motion. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-slider]").forEach(function (slider, sIndex) {
    var track = slider.querySelector(".slider__track");
    if (!track) return;
    var slides = Array.prototype.slice.call(track.querySelectorAll(".placeholder"));
    if (slides.length < 2) return; // a single photo has nothing to slide

    var prevBtn = slider.querySelector("[data-slider-prev]");
    var nextBtn = slider.querySelector("[data-slider-next]");
    var dotsWrap = slider.querySelector("[data-slider-dots]");
    var index = 0;
    var dots = [];
    var timer = null;
    var onScreen = false;

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider__dot";
        dot.setAttribute("aria-label", "Show photo " + (i + 1) + " of " + slides.length);
        dot.addEventListener("click", function () { go(i); restart(); });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function go(i) {
      index = (i % slides.length + slides.length) % slides.length;
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      dots.forEach(function (d, di) { d.setAttribute("aria-current", String(di === index)); });
    }

    function stop() { if (timer) { clearTimeout(timer); timer = null; } }
    function play() {
      if (reduceMotion || timer || !onScreen) return;
      // Stagger each slider slightly so the cards do not all flip in unison.
      timer = setTimeout(function step() {
        go(index + 1);
        timer = setTimeout(step, 5000);
      }, 5000 + sIndex * 400);
    }
    function restart() { stop(); play(); }

    if (prevBtn) prevBtn.addEventListener("click", function () { go(index - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(index + 1); restart(); });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", play);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", play);

    // Touch swipe
    var startX = null;
    track.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; stop(); }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); }
      startX = null;
      play();
    }, { passive: true });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          onScreen = e.isIntersecting;
          if (onScreen) play(); else stop();
        });
      }, { threshold: 0.25 }).observe(slider);
    } else {
      onScreen = true; play();
    }

    go(0);
  });

  /* ---------- Impact numbers count up ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function fmt(n) { return Math.round(n).toLocaleString("en-US"); }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = fmt(target) + suffix;
    }
    requestAnimationFrame(tick);
  }
  if (counters.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countIO.observe(el); });
  }
  /* If JS/observer unavailable, the final figures are already in the HTML. */

  /* ---------- Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
