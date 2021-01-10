import React from 'react';
import Typography from '@material-ui/core/Typography';

class About  extends React.Component {

    state = {
        username: ''
    };

    componentDidMount = () => { 
        this.setState ({

        })
    }

    componentDidUpdate = () => {    
        
    }

    handleClickShowPassword = () => {
        if (this.state.showPassword === false) {
            this.setState({
                showPassword: true
            });
        }
        else {
            this.setState({
                showPassword: false
            });
        }
    }

    handleMouseDownPassword = () => {
        
    }

    handleChange = (prop) => (event) => {
        this.setState({ 
            ...this.state, 
            [prop]: event.target.value 
        });
      };

    handleSubmit = () => {
        
    }

    render () {

        return (
            <div style={{
                position: 'absolute', left: '50%', top: '205%',
                transform: 'translate(-50%, -50%)'
            }}>
                   
                <Typography 
                style={{textAlign: 'center'}}
                variant="h4" paragraph >
                INTRODUCERE
                </Typography>

                <Typography variant="h5">
                Scopul documentului
                </Typography>

                <Typography paragraph>
                Documentul reprezinta un ghid de implementare a unui site de socializare care se rezuma la glume. Scopul acestuia este de a face cunoscuti pasii pe care trebuie sa ii urmeze programatorul si punctele pe care ar trebui sa le atinga. Vor fi incluse aspecte de la User Interface si User Experience pana la partea de backend in care se va lucra cu baza de date a  serverului  sau aplicatii third party.                
                </Typography>

                <Typography variant="h5">
                Contextul de utilizare al sistemului
                </Typography>

                <Typography paragraph>
                Sistemul poate fi folosit de oricine are acces la internet, fie pe calculatorul personal, fie pe mobil. Este un sistem folosit ca metoda de recreere, o modalitate de a share-ui glume si de a te delecta cu altele.
                </Typography>

                <Typography variant="h5">
                Lista de definiții si abrevieri
                </Typography>

                <Typography>
                ● System - produsul din specificatii
                </Typography>
                <Typography >
                ● User - o entitate externa de tip client ce comunica cu sistemul
                </Typography>
                <Typography >
                ● Admin - o entitate externa de tip administratorul ce comunica cu sistemul
                </Typography>
                <Typography >
                ● Login - operatia de autentificare a unui user in sistem
                </Typography>
                <Typography >
                ● Logout - operatia de deconectare din sistem
                </Typography>
                <Typography paragraph>
                ● Upvote - operatia de apreciere a unei postari
                </Typography>

                <Typography variant="h4" paragraph style={{textAlign: 'center'}}>
                DESCRIERE GENERALĂ
                </Typography>

                <Typography variant="h5">
                Scurtă descriere a sistemului
                </Typography>
                <Typography paragraph>
                Aplicatie reprezinta o platforma web unde utilizatorii pot impartasi glume. Acestia pot aprecia glumele altora si pot face donatii monetare fie platformei fie organizatiilor caritabile sustinute de platforma. Exista si un sistem de moderatori, reprezentati prin userii Admin, care pot edita sau sterge glumele utilizatorilor normali.
                </Typography>


                <Typography variant="h5">
                Motivație (de ce este necesar)
                </Typography>
                <Typography paragraph>
                O astfel de aplicatie este sociala si are scop de entertainment. Umorul si comedia au reprezentat mereu una dintre industriile cele mai importante de divertisment. Glumele, ca au venit sub forma de bancuri, sitcom-uri, spectacole, stand up comedy, etc, mereu au atras atentia oamenilor si au produs profit si fericire.
                </Typography>
                <Typography paragraph>
                Umorul a ramas mereu prezent in viata oamenilor doar ca a luat diverse forme iar astazi e de datoria noastra, odata cu evolutia tehnologica sa il facem sa ramana la fel de actual si relevant pentru toata lumea.
                De aceea ne-am gandit ca un comedy hub care sa concentreze esenta meme-urilor si a glumelor online e mai mult decat necesar in contextul actual. 
                </Typography>

                <Typography variant="h5">
                Produse similare
                </Typography>
                <Typography paragraph>
                reddit.com/r/jokes este un produs similar, dar nu dedicat impartasirii glumelor. De aceea, noi am considerat ca exista nevoia de astfel de aplicatie.
                </Typography>

                <Typography variant="h5">
                Riscurile proiectului: competiție, factori de experiență, de planificare, tehnologici, externi
                </Typography>
                <Typography paragraph>
                Un factor important de care trebuie sa se tina cont este filtrarea continutului, adica toate postarile sa respecte regulile comunitatii care asigura buna functionare a platformei. Intrucat un algoritm care ar verifica aceste lucruri dureaza mai mult pentru a fi implementat, este necesar angajamentul unei persoane pentru acest task. 
                </Typography>


                <Typography variant="h4" paragraph style={{textAlign: 'center'}}>
                SISTEMUL PROPUS
                </Typography>

                <Typography variant="h5">
                Descrierea categoriilor de utilizatori direcți/indirecți ai sistemului
                </Typography>
                <Typography paragraph>
                Utilizatorii generici: vor putea vedea, filtra si posta glume, vor putea edita propriile glume. Ei se vor folosi de interfata web pentru a comunica cu backend-ul aplicatiei, iar acesta va salva datele intr-o baza de date.
                Utilizatorii admin: vor putea vedea, filtra si edita orice gluma, indiferent de utilizatorul care a postat-o. Utilizatorii admin trebuie antrenati de catre developeri pentru a putea discerne umorul real de glumele proaste. Vor accesa sistemul cu frecventa mare, in vederea limitarii numarului de glume inadecvate/neamuzante. denumire, cum va utiliza sistemul/ va folosi rezultatele sistemului/ va influenta utilizarea sistemului, competente necesare pentru utilizarea sistemului, număr aproximativ de utilizatori în categorie; frecvența accesării sistemului.
                </Typography>

                <Typography variant="h5">
                Motivație (de ce este necesar)
                </Typography>
                <Typography>
                Cerințe software necesare pentru accesarea aplicației desktop:                 
                </Typography>
                <Typography>
                ● Sisteme de operare: Windows (7, 8, 10), MacOS, Linux (Ubuntu, Kali, Debian) 
                </Typography>
                <Typography>
                ● Web browser: Microsoft Edge, Mozilla Firefox, Google Chrome, Safari. 
                </Typography>
                <Typography>
                ● Baza de date: MongoDB. 
                </Typography>
                <Typography>
                ● Minimum 2GB RAM. 
                </Typography>
                <Typography>
                ● Minimum 40 GB HDD. 
                </Typography>
                <Typography paragraph>
                ● Procesor Intel sau AMD. 
                </Typography>

                <Typography variant="h5">
                Cerințe funcționale (in limbaj natural)
                </Typography>
                <Typography >
                Un user fara cont/neautentificat are posibilitatea de a:
                </Typography>

                <Typography>
                ●	Vizualiza glume
                </Typography>
                <Typography>
                ●	Cauta glume
                </Typography>
                <Typography>
                ●	Filtra glume
                </Typography>
                <Typography>
                ●	Vedea comentarii
                </Typography>
                <Typography paragraph>
                ●	Crea un cont nou / Login
                </Typography>

                <Typography>
                Un user autentificat poate, pe langa cele de mai sus, urmatoarele:
                </Typography>
                <Typography>
                ●	Upvote
                </Typography>
                <Typography>
                ●	Posta glume
                </Typography>
                <Typography>
                ●	Comenta la postari
                </Typography>
                <Typography>
                ●	Face donatii
                </Typography>
                <Typography paragraph>
                ●	Acorda premii
                </Typography>

                <Typography variant="h5">
                Cerințe nefuncționale: constrângeri hardware/software
                </Typography>
                <Typography paragraph>
                Sistemul ruleaza pe baza conexiunii la Internet.
                Intrucat pentru a-ti crea un cont sunt necesare date cu caracter personal, trebuie ca site-ul sa respecte GDPR pentru a nu periclita siguranta utilizatorilor. 
                Totodata, este necesara si o conexiune secure pentru efectuarea donatiilor, dar de aceasta se ocupa aplicatiile de tip third-party cu care vom colabora.
                </Typography>

                <Typography paragraph variant="h5">
                Modele ale sistemului
                </Typography>
                <Typography>
                Actorii sunt: 
                </Typography>
                <Typography>
                ● Persoanele care vor accesa aplicația web pentru a viziona. (Acestia vor fi userii care nu au nevoie de cont) -> USER
                </Typography>
                <Typography>
                ● Persoanele care s-au saturat sa fie observatori la glumele altora si vor sa devina postaci -> NEW USER
                </Typography>
                <Typography>
                ● Persoanele care vor accesa aplicatia web pentru a posta propriile glume si a le edita sau sterge, eventual, in viitor. -> REGISTERED USER
                </Typography>
                <Typography>
                ● Persoanele care pot edita glumele de pe site. Aceste persoane pot sterge postari sau chiar sterge/bloca useri existenti, in cazul in care acestia incalca regulile site-ului prin postarile lor. -> ADMINII
                </Typography>

                <Typography>
                ●	Un serviciu automatizat prin care se face verificarea si autentificarea utilizatorilor. Acest serviciu primeste ca input datele (username, password) cu care un anumit USER doreste sa intre pe site si verifica daca exista in baza de date un user deja inregistrat cu credentialele respective -> IDENTITY PROVIDER
                </Typography>
                <Typography>
                ●	Un serviciu fictiv automatizat prin care se realizeaza plata catre site (Donate/Give award) -> PAYMENT SERVICE
                </Typography>
                <Typography>
                ● Actorii si cazurile de utilizare prin care interacționează
                </Typography>
                <Typography>
                ● Utilizatorii generici (inregistrati sau neinregistrati)
                </Typography>
                <Typography>
                ● Identity Provider
                </Typography>
                <Typography paragraph>
                ● Payment Service
                </Typography>
                <Typography paragraph variant="h4" style={{textAlign: 'center'}}>
                Descrierea cazurilor de utilizare ale sistemului
                </Typography>
                <Typography>
                ●		Sign up: utilizatorul neinregistrat foloseste interfata web pentru a trimite o cerere de inregistrare catre backend-ul aplicatiei. Acesta comunica cu Identity Provider-ul (eg Google) pentru a stabili identitatea user-ului si a crea un cont, pe care il va salva in baza de date. Dupa terminarea procesului, utilizatorul va primi in interfata un mesaj de succes/eroare. Va fi printre primele endpoint-uri implementate, deoarece este coloana vertebrala a sistemului de useri.
                </Typography>
                <Typography>
                ●	Donate: utilizatorul initiaza o donatie fictiva prin apasarea butonului de donate, dupa care isi va alege destinatarul donatiei. Interfata comunica cu backend-ul. Interfata va trece intr-o pagina de confirmare a platii, pe care utilizatorul o va completa cu date personale, care vor fi trimise sub forma de payment request catre payment service. La succes, va fi notificata interfata, backend-ul si user-ul de acest fapt. In caz de eroare la completarea datelor, pagina de confirmare va fi reincarcata. Va fi implementata la final, deoarece este functionalitate extra
                </Typography>
                <Typography>
                ●	Edit Joke: utilizatorul isi are in fata propria gluma in modul view. Apasa pe butonul edit, fapt care face interfata sa treaca in modul text si sa trimita catre backend un edit request. Utilizatorul editeaza textul glumei, dupa care apasa pe save, moment in care textul nou este trimis de catre interfata, prin backend, catre baza de date. Un mesaj de succes este propagat inapoi. In caz de eroare la baza de date, se va reflecta acest lucru printr-o pagina de eroare (eg something went wrong). Va fi implementata odata ce exista sistemul de useri si de glume.
                </Typography>
            </div>
          );
        }
 }
  
   export default (About);