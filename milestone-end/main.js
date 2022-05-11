var app = new Vue({
        el: '#app',
        data: {
            user:{
                name: 'Ugo de Ughi',
                avatar: '_io'
            },
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [{
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [{
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [{
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                        }, 
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            activeContact: 0,
            newMessage:'',
            textToSearch:'',
            messageClicked: {}
        },
        methods:{
            getLastMessage(index){
                const contact = this.contacts[index];
                const messages = contact.messages;
                if(messages.length > 0){
                    const lastMessage = messages[messages.length - 1];
                    return lastMessage.message;
                }
                return 'non sono presenti messaggi';
                
            },
            // versione compatta passando direttamente tutto l'oggetto contact
            // getLastMessage(contact){
            //     return contact.messages[contact.messages.length - 1].message;
            // },
            getLastDate(index){
                const contact = this.contacts[index];
                const messages = contact.messages;
                if(messages.length > 0){
                    const lastMessage = messages[messages.length - 1];
                    return lastMessage.date;
                }
                return '';
                
            },
            sendMessage(message, target){
                // funzione che spedisce i messaggi
                // uso setTimeout per simolura una chiamata ad un servizio
                setTimeout(()=>{
                    target.messages.push(message);
                },500);
            },
            sendNewMessage(){
                // preparo l'oggetto nuovo messaggio da inviare
                // e lo spedisco a sendMessage
                const contact = this.contacts[this.activeContact];
                const newMessage = {
                    date:dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: this.newMessage,
                    status: 'sent'
                }
                this.sendMessage(newMessage, contact);
                this.newMessage = '';
                setTimeout(()=>{
                    this.sendAnswerFake(contact);
                },3000)
            },
            sendAnswerFake(contact){
                const message = {
                    date:dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    message: 'Ok!',
                    status: 'received'
                }
                this.sendMessage(message, contact);
            },
            search(){
                this.contacts.forEach(contact => {
                    contact.visible = contact.name.toUpperCase().includes(this.textToSearch.toUpperCase());
                })
            },
            toggleOptions(itemMessage){
                // questa funzione lavora per il v-if di message-options-panel
              //  console.log('itemMessage',itemMessage);
              //  console.log('this.messageClicked',this.messageClicked);
                // se il messaggio cliccato è uguale al messaggio che passo alla funzione resetto
                if(this.messageClicked === itemMessage){
                    this.messageClicked = {}
                }else{
                    // altrimenti faccio diventare il messaggio cliccato uguale a quello che viene passato
                    this.messageClicked = itemMessage;
                }
            },
            removeMessage(index){
                this.contacts[this.activeContact].messages.splice(index,1);
            }
        },

    },
)