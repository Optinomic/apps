// Make sure to import ChatEngine first!
ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-231082a7-7ad8-4a41-a6cd-eed5540629a4',
    subscribeKey: 'sub-c-ab15b472-4214-11e8-b20a-be401e5b340a'
});

// use a helper function to generate a new profile
let newPerson = generatePerson(true);

// create a bucket to store our ChatEngine Chat object
let myChat;

// create a bucket to store 
let me;

// compile handlebars templates and store them for use later
let peopleTemplate = Handlebars.compile($("#person-template").html());
let meTemplate = Handlebars.compile($("#message-template").html());
let userTemplate = Handlebars.compile($("#message-response-template").html());

const source_language = "en";
const target_language = "es";

// this is our main function that starts our chat app
const init = () => {

    // connect to ChatEngine with our generated user
    ChatEngine.connect(newPerson.uuid, newPerson);

    // when ChatEngine is booted, it returns your new User as `data.me`
    ChatEngine.on('$.ready', function(data) {

        // store my new user as `me`
        me = data.me;

        // create a new ChatEngine Chat
        myChat = new ChatEngine.Chat('Optinomic');

        // when we recieve messages in this chat, render them
        myChat.on('message', (message) => {
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

            // search for 50 old `message` events
            myChat.search({
                event: 'message',
                limit: 50
            }).on('message', (data) => {

                console.log(data)

                // when messages are returned, render them like normal messages
                renderMessage(data, true);

            });

        });

        // bind our "send" button and return key to send message
        $('#sendMessage').on('submit', sendMessage)

    });

};

// send a message to the Chat
const sendMessage = () => {

    // get the message text from the text input
    let message = $('#message-to-send').val().trim();

    // if the message isn't empty
    if (message.length) {

        // emit the `message` event to everyone in the Chat
        myChat.emit('message', {
            text: message,
            translate: {
                text: message,
                source: source_language,
                target: target_language
            }
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
        time: getCurrentTime(),
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

// scroll to the bottom of the window
const scrollToBottom = () => {
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
};

// get the current time in a nice format
const getCurrentTime = () => {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
};

// boot the app
init();