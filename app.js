const { App } = require('@slack/bolt');

require("dotenv").config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  endpoints: "/slack/events",
});




app.message('dimelo', async ({ message, say }) => {
 
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `presiona aquí <@${message.user}>!`
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> me tocas :eyes:`);
});


//block con enlaces
app.message('enlaces', async ({ message, say }) => {
 
  await say({
    blocks: [
      {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `<@${message.user}>, aquí tienes los enlaces útiles a nuestros documentos.`
              
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Para reunion den Jitsi"
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Presiona",
                "emoji": true
              },
              "value": "click_me_123",
              "url": `${process.env.reunion}`,
              "action_id": "button-action"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Lista de tareas(el excel)."
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Presiona",
                "emoji": true
              },
              "value": "click_me_123",
              "url": `${process.env.excel}`,
              "action_id": "button-action"
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "El documento con notas(el word)."
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Presiona",
                "emoji": true
              },
              "value": "click_me_123",
              "url": `${process.env.word}`,
              "action_id": "button-action"
            }
         
      }
    ],
  });
});

app.message(/^(saludos|hola|hey).*/, async ({ context,message, say }) => {
  // RegExp matches are inside of context.matches
  const greeting = context.matches[0];

  await say(`${greeting} <@${message.user}>, que tal?`);
});


app.message('adios', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hasta luegoooo, <@${message.user}> :wave:`);
});


(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();


