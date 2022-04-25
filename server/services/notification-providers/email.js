'use strict';
module.exports = ({strapi}) => ({
  async send(config, data){
    let recipients = await strapi.query('plugin::ezforms.recipient').findMany();
    let message = ""

    //Loop through data and construct message from data object
    for(let key in data){
      message += `<strong>${key}:</strong> ${data[key]}<br/>`
    }
    //loop through the recipients and send an email
    // https://docs.strapi.io/developer-docs/latest/plugins/email.html#programmatic-usage
    for(let recipient of recipients){
      try{
        await strapi.plugins['email'].services.email.send({
          to: recipient.email,
          from: config.from,
          replyTo: data.email,
          subject: 'Neue Anfrage über das Kontakformular',
          html: message,
        });
      } catch (e) {
        strapi.log.error(e)
      }
    }

  }


});
