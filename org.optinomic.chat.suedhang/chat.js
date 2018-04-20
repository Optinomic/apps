// ChatEngine | Südhang
// https://admin.pubnub.com/#/user/442897/account/442861/app/35197778/

ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-231082a7-7ad8-4a41-a6cd-eed5540629a4',
    subscribeKey: 'sub-c-ab15b472-4214-11e8-b20a-be401e5b340a'
});

// create a bucket to store our ChatEngine Chat object
let myChat;

// create a bucket to store 
let me;
let uuid;

// compile handlebars templates and store them for use later
let peopleTemplate = Handlebars.compile($("#person-template").html());
let meTemplate = Handlebars.compile($("#message-template").html());
let userTemplate = Handlebars.compile($("#message-response-template").html());
let titleTemplate = Handlebars.compile($("#title-template").html());
let typingTemplate = Handlebars.compile($("#typing-template").html());
let unreadTemplate = Handlebars.compile($("#unread-template").html());


let config = { timeout: 1000 };


// get some references to functions
let keypress = function() {};


// this is our main function that starts our chat app
const init = (user) => {

    // console.log('INNER', user);

    // Build Chatname by current patient  |  ToDo:  API-Current Patient PID
    let chat_name = "optinomic_patient_" + helpers.getPatientID();

    // connect to ChatEngine with our user |  ToDo:  API-Current User
    ChatEngine.connect(user.id, {
        email: user.data.email,
        name: user.data.first_name + " " + user.data.last_name,
        first_name: user.data.first_name,
        last_name: user.data.last_name,
        initials: user.data.initials,
        description: user.data.description,
        uuid: user.id
    });

    // when ChatEngine is booted, it returns your new User as `data.me`
    ChatEngine.on('$.ready', function(data) {

        // attach the typing-indicator plugin to the global channel
        ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-typing-indicator'](config));

        // store my new user as `me`
        me = data.me;

        // create a new ChatEngine Chat
        myChat = new ChatEngine.Chat(chat_name);



        myChat.plugin(ChatEngineCore.plugin['chat-engine-unread-messages']());
        myChat.plugin(ChatEngineCore.plugin['chat-engine-emoji']());
        myChat.unreadMessages.inactive();


        $(document).on("keypress", function(e) {
            // use e.which

            if (e.which !== 13) {

                //console.log('e',e);
                ChatEngine.global.typingIndicator.startTyping();

            }

        });

        // when we recieve messages in this chat, render them
        myChat.on('message', (message) => {
            //console.log('current message', message);
            renderMessage(message);
        });

        // when a user comes online, render them in the online list
        myChat.on('$.online.*', (data) => {
            $('#people-list ul').append(peopleTemplate(data.user));
        });

        // when a user goes offline, remove them from the online list
        myChat.on('$.offline.*', (data) => {
            $('#people-list ul').find('#' + data.user.uuid).remove();
        });

        // wait for our chat to be connected to the internet
        myChat.on('$.connected', () => {


            searchRender();


        });

        myChat.on('$unread', (payload) => {

            if (uuid !== payload.sender.uuid) {
                renderUnread(myChat.unreadCount);

                console.log(payload.sender.state.name, " sent a message you havn't seen in ", payload.chat.channel, ": ", payload.event.data.text);

                // console.log('$unread', uuid, payload, myChat.unreadCount);
            };
        });


        ChatEngine.global.on('$typingIndicator.startTyping', (payload) => {
            // console.log(payload.sender.uuid, "is typing...", payload);

            // use the generic user template by default
            let template = typingTemplate;

            // console.log('INNNER', patient);

            let el = template({
                mode: payload.sender.state.initials,
                uuid: payload.sender.uuid
            });

            $('#typing').append(el);


            // Unread Messages
            if (uuid === payload.sender.uuid) {
                //console.log('START :: Active', uuid, myChat.unreadCount);
                myChat.unreadMessages.active();
                renderUnread();
            };
        });

        ChatEngine.global.on('$typingIndicator.stopTyping', (payload) => {
            // console.log(payload.sender.uuid, "is not typing.");

            $('#typing').find('#typing-' + payload.sender.uuid).remove();


            // Unread Messages
            if (uuid === payload.sender.uuid) {
                //console.log('STOP :: Inactive', uuid, myChat.unreadCount);
                myChat.unreadMessages.inactive();
            };

        });


        // bind our "send" button and return key to send message
        $('#sendMessage').on('submit', sendMessage)



    });

};

const loadMore = () => {
    $('#loadAll').remove();
    $('.chat-history ul').empty();
    searchRender(999999999);
};


// send a message to the Chat
const searchRender = (limit) => {
    limit = limit || 50;
    // search for 50 old `message` events
    myChat.search({
        event: 'message',
        limit: limit

    }).on('message', (data) => {

        // when messages are returned, render them like normal messages
        renderMessage(data, true);

    });
};

// send a message to the Chat
const sendMessage = () => {

    // get the message text from the text input
    let message = $('#message-to-send').val().trim();

    // if the message isn't empty
    if (message.length) {

        // emit the `message` event to everyone in the Chat
        var d = new Date();
        var n = d.toISOString();

        myChat.emit('message', {
            text: message,
            date_iso: n,
            date: getCurrentDate(),
            time: getCurrentTime()
        });

        // clear out the text input
        $('#message-to-send').val('');
    }

    // stop form submit from bubbling
    return false;
};

// render messages in the list
const renderMessage = (message, isHistory = false) => {

    // use the generic user template by default
    let template = userTemplate;

    // if I happened to send the message, use the special template for myself
    if (message.sender.uuid == me.uuid) {
        template = meTemplate;
    }

    let el = template({
        messageOutput: message.data.text,
        time: message.data.date,
        date: message.data.time,
        user: message.sender.state
    });

    // render the message
    if (isHistory) {

        $('.chat-history ul').prepend(el);
    } else {
        $('.chat-history ul').append(el);
    }

    // scroll to the bottom of the chat
    scrollToBottom();
};


// render patient in header
const renderPatient = (patient) => {

    formatDateCH = function(date_string) {
        date_string = date_string || null
        if (date_string !== null) {

            // 1952-11-19T00:00:00.000000000000Z
            var year = parseInt(date_string.substring(0, 4));
            var month = parseInt(date_string.substring(5, 7));
            var day = parseInt(date_string.substring(8, 10));
            var date_string_return = day + "." + month + "." + year

            return date_string_return;
        } else {
            return null;
        }
    };

    let template = titleTemplate;
    let el = template({
        title: patient.data.last_name + " " + patient.data.first_name,
        subtitle: formatDateCH(patient.data.birthdate)
    });

    // render the title
    $('.chat-header .chat-about').append(el);
};

// render unread_count
const renderUnread = (count) => {

    count = count || 0;

    if (count !== 0) {
        let template = unreadTemplate;

        let el = template({
            count: count || null
        });

        // render the title
        $('#unreadTemp').html(el);
    } else {
        $('#unreadTemp').empty();
    };
};

// scroll to the bottom of the window
const scrollToBottom = () => {
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
};

// get the current time in a nice format
const getCurrentTime = () => {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
};

// get the current date in a nice format
const getCurrentDate = () => {
    return new Date().toLocaleDateString();
};


var getCurrentUser = function() {

    api_url_user = '/users/' + helpers.getUserID();

    helpers.callAPI('GET', api_url_user, {}, {}, function(req_user) {
        if (req_user.status == 200) {
            var user = JSON.parse(req_user.response);
            // console.log('SUCCESS: getCurrentUserAndPatient', user);

            uuid = user.user.id;

            // Boot the app
            init(user.user);

        } else {
            console.error('ERROR: getCurrentUser', req_user);
        };

    });
};

var getCurrentPatient = function() {

    api_url_patient = '/patients/' + helpers.getPatientID();

    helpers.callAPI('GET', api_url_patient, {}, {}, function(req_patient) {
        if (req_patient.status == 200) {
            var patient = JSON.parse(req_patient.response);
            //console.log('SUCCESS: getCurrentUserAndPatient', user);

            // Render Title with Name / Birthdate
            renderPatient(patient.patient);

        } else {
            console.error('ERROR: getCurrentPatient', req_patient);
        };
    });
};

// Start & Boot
getCurrentUser();
getCurrentPatient();