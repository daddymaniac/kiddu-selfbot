const Discord = require('discord.js');
const Client = new Discord.Client();
const exampleEmbed = new Discord.RichEmbed()
const prefix = "$";
const moment = require("moment")
require("moment-duration-format");
const db = require("quick.db")

Client.on('ready', function() {
    Client.user.setActivity("dm me for 24/7 hosting", {type: "STREAMING", url: "https://www.twitch.tv/thanatos404"})
    console.log('selfbot ready');
    console.log(`logged in as ${Client.user.tag}`)
});


Client.on('message', async message => {
  
    if(message.author.id !== Client.user.id)return;
    if (message.content[0] !== prefix)return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  
      if(message.content.startsWith(prefix+"help")) {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("General Help")
    .setDescription("**__$status__**\nShows a list of status commands\n\n**__$info__**\nShows a list of information commands\n\n**__$fun__**\nShows a list of fun commands\n\n**__$nsfw__**\nShows a list of nsfw commands\n\n**__$raid__**\nShows a list of raid commands\n\n**__$nuke__**\nShows a list of nuke commands\n\n")
    
    message.channel.send(embed)
  }
  
  
  //status commands
  
  
  if(message.content.startsWith(prefix+"setS")) {
        if(message.deletable)message.delete()
        let args = message.content.split(" ").join(" ").slice(6);
        Client.user.setActivity(args, {type: "STREAMING", url: "https://www.twitch.tv/thanatos404", })
        message.reply(`you are now streaming: **${args}**`)
      }
  
  if(message.content.startsWith(prefix+"setL")) {
            if(message.deletable) message.delete()
            let args = message.content.split(" ").join(" ").slice(6);
            Client.user.setActivity(args, {type: "LISTENING"})
            message.reply(`you are now listening to: **${args}**`)
        }
  
 if(message.content.startsWith(prefix+"setW")) {
            if(message.deletable) message.delete()
            let args = message.content.split(" ").join(" ").slice(6);
            Client.user.setActivity(args, {type: "WATCHING"})
            message.reply(`you are now watching: **${args}**`)
  }
  
  if(message.content.startsWith(prefix+"setG")) {
            if(message.deletable) message.delete()
            let args = message.content.split(" ").join(" ").slice(6);
            Client.user.setActivity(args, {type: "PLAYING"})  
            message.reply(`you are now playing: **${args}**`)
  }
  
    if(message.content.startsWith(prefix+"status")) {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Status Commands")
    .setDescription("**__$setS <message>__**\nDisplays your text as streaming for your status\n\n**__$setL <message>__**\nDisplays your text as listening for your status\n\n**__$setW <message>__**\nDisplays your text as watching for your status\n\n**__$setG <message>__**\nDisplays your text as playing for your status")
    
    message.channel.send(embed)
  }
  
  
  //information commands

  
  if(message.content.startsWith(prefix+"uptime")) {
      message.delete()
      const duration = moment.duration(Client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

      message.channel.send(`\`${duration}\``);
  }
  
  if(message.content.startsWith(prefix+"ping")) {
    message.delete()
    message.channel.send(`\`${Client.ping}ms\``)
  }
  
  if (message.content.startsWith(prefix+"av")) {
    message.delete()
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
        .setDescription(`**${user.username}**'s avatar`)
        .setColor("RANDOM")
        .setImage(user.avatarURL);
    message.channel.send(avatarEmbed)
  }
  
   if (message.content.startsWith(prefix + "serverinfo")) {
     message.delete()
    const sEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .addField(`Server Name`, message.guild.name)
    .addField(`Server ID`, message.guild.id)
    .addField(`Owner`, message.guild.owner, true)
    .addField(`Verification Level`, [message.guild.verificationLevel])
    .addField(`Role Count`, message.guild.roles.size, true)
    .addField(`Member Count`, message.guild.memberCount)
    .addField(`Creation Date`, moment.utc(message.guild.createdAt).format("dddd, MMMM D, YYYY"))
    .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
               
    message.channel.send(sEmbed)
 }
  
    if (message.content.startsWith(prefix + "whois")) {
    message.delete()

    let user = message.mentions.users.first() || message.author;

    const wEmbed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(user.tag)
    .addField(`Username`, `${user.username}#${user.discriminator}`)
    .addField(`ID`, user.id)
    .addField(`Status`, user.presence.status)
    .addField(`Registered`, moment.utc(message.guild.members.get(user.id).user.createdAt).format("dddd, MMMM D, YYYY"))
    .addField(`Joined`, moment.utc(message.guild.members.get(user.id).joinedAt).format("dddd, MMMM D, YYYY"))

    message.channel.send(wEmbed)
  }
  
    if (message.content.startsWith(prefix + "membercount")) {
    message.delete()
    const mEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(message.guild.name)
    .setTitle("Member Count")
    .addField(`Total Members`, message.guild.memberCount)
    .addField(`Humans`, `${message.guild.members.filter(m => !m.user.bot).size}`)
    .addField(`Bots`, `${message.guild.members.filter(m => m.user.bot).size}`)

    message.channel.send(mEmbed)
  }
  
  if(message.content.startsWith(prefix+"info")) {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Information Commands")
    .setDescription("**__$ping__**\nShows how slow or fast the bot is\n\n**__$uptime__**\nShows how long the selfbots be online and running\n\n**__$av__**\nDisplays yours or the mentioned user avatar\n\n**__$serverinfo__**\nTells you information about the server\n\n**__$whois__**\nTells you information about yourself or a mentioned user\n\n**__$membercount__**\nTells you how many members and bots are in the server")
    
    message.channel.send(embed)
  }
  
  
  //fun commands
  
  
  if(message.content.startsWith(prefix+"8ball")){
    if(message.deletable)message.delete()
        if(!args[1]) return message.reply('you need to ask a question')
    let replies = ["yes", "no", "hell no", "why would you even ask that", "i think you and i both know the answer to that", "that shouldn't even be a real question", "god you're dumb", "of course", "i mean i guess", "without a doubt", "absolutely", "if you say so buddy"]
    
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField("Question", question)
    .addField("Answer", replies[result])
    
    message.channel.send(embed) 
    }
  
  if(message.content.startsWith(prefix+"load")){
    if(message.deletable)message.delete()
    let replies = ["congratulations you lost your mom", "you're welcome. i got your gf pregnant for you", "i helped your cousin get dressed ;)", "you have a baby brother on the way", "wait... so that was your sister"]
    let result = Math.floor((Math.random() * replies.length));
        message.delete(); var charge = ".";
        var chargeC = "█";
        message.channel.send("```[" + charge.repeat(50) + "]```").then((message) => { for (i = 0; i <= 50; i++) { message.edit("```[" + chargeC.repeat(i) + charge.repeat(50 - i) + "]  -  " + i * 100 / 50 + "%\n" + "loading..```");
    }message.edit(replies[result])},
    )
    }
  
  if(message.content.startsWith(prefix+'clear')){
        if(message.deletable)message.delete()
            message.channel.fetchMessages().then((message) =>
            message.forEach(m =>
                m.delete().catch(error => {})
            ))
    }
    
  if(message.content.startsWith(prefix+"say")) {
    if(message.deletable)message.delete()
        if (args.length < 2) return message.channel.send("you must provide a message for me to send as an ambed");
    let embed = new Discord.RichEmbed()
    .setDescription(args.slice(1).join(" "))
    .setColor("RANDOM")
    
    message.channel.send(embed)
  }

  if(message.content.startsWith(prefix+"hug")) {
    message.delete();
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("you must mention someone to hug");
    
    let choices = ["https://i.imgur.com/nrdYNtL.gif", "https://media.giphy.com/media/143v0Z4767T15e/giphy.gif", "https://media2.giphy.com/media/lrr9rHuoJOE0w/source.gif", "https://i.pinimg.com/originals/85/72/a1/8572a1d1ebaa45fae290e6760b59caac.gif", "https://i.imgur.com/wOmoeF8.gif", "https://37.media.tumblr.com/f2a878657add13aa09a5e089378ec43d/tumblr_n5uovjOi931tp7433o1_500.gif", "https://media1.tenor.com/images/234d471b1068bc25d435c607224454c9/tenor.gif?itemid=3532081"]
    let chosen = Math.floor((Math.random() * choices.length));
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`you just hugged **${member.user.tag}**`)
    .setImage(choices[chosen])
    
    message.channel.send(embed)
  }
  
    if(message.content.startsWith(prefix+"kiss")) {
    message.delete();
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("you must mention someone to kiss");
    
    let choices = ["https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865", "https://media3.giphy.com/media/G3va31oEEnIkM/giphy.gif", "https://media.giphy.com/media/JYpVJEcNrDAWc/giphy.gif", "https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif", "https://i.imgur.com/eisk88U.gif", "https://i.pinimg.com/originals/e0/0f/31/e00f3104927ae27d7d6a32393d163176.gif", "https://acegif.com/wp-content/uploads/anime-kiss-m.gif", "https://24.media.tumblr.com/5d51b3bbd64ccf1627dc87157a38e59f/tumblr_n5rfnvvj7H1t62gxao1_500.gif", "https://media1.tenor.com/images/e65714e68d9cb96ab0bc195f282bc9e8/tenor.gif?itemid=13173155"]
    let chosen = Math.floor((Math.random() * choices.length));
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`you just kissed **${member.user.tag}**`)
    .setImage(choices[chosen])
    
    message.channel.send(embed)
  }
  
      if(message.content.startsWith(prefix+"slap")) {
    message.delete();
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("you must mention someone to slap");
    
    let choices = ["https://media.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif", "https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif?itemid=10426943", "https://i.imgur.com/fm49srQ.gif", "https://media1.tenor.com/images/d14969a21a96ec46f61770c50fccf24f/tenor.gif?itemid=5509136", "https://images-ext-2.discordapp.net/external/CkHjVBw6uCbmrZuBZDXclAupI5QulJfSopjAz-dw26A/https/media.discordyui.net/reactions/slap/RJHjyv3.gif", "https://media.discordyui.net/reactions/slap/HGxqG1N.gif", "https://media.discordyui.net/reactions/slap/aVDQEfA.gif", "https://i.imgur.com/ABE1arT.gif"]
    let chosen = Math.floor((Math.random() * choices.length));
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`you just slapped **${member.user.tag}**`)
    .setImage(choices[chosen])
    
    message.channel.send(embed)
  }
  
        if(message.content.startsWith(prefix+"lick")) {
    message.delete();
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("you must mention someone to lick");
    
    let choices = ["https://gifimage.net/wp-content/uploads/2017/09/anime-lick-gif-4.gif", "https://i.kym-cdn.com/photos/images/newsfeed/001/088/630/c24.gif", "https://media1.tenor.com/images/b5d187d375f2c60d77971c5cfdc40457/tenor.gif?itemid=16189423", "https://i.pinimg.com/originals/df/32/a1/df32a1c9fd9d1c46c3c11b022b1932fe.gif", "https://media1.tenor.com/images/783188d1592d16bcc83f52639fad8fcb/tenor.gif?itemid=10816601", "https://33.media.tumblr.com/88736039b8ce3621bbd27183c6e226ff/tumblr_nrlp9qqoHQ1t0p1pao1_500.gif"]
    let chosen = Math.floor((Math.random() * choices.length));
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`you just licked **${member.user.tag}**`)
    .setImage(choices[chosen])
    
    message.channel.send(embed)
  }
  
          if(message.content.startsWith(prefix+"bite")) {
    message.delete();
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("you must mention someone to bite");
    
    let choices = ["https://media1.tenor.com/images/f308e2fe3f1b3a41754727f8629e5b56/tenor.gif?itemid=12390216", "https://pa1.narvii.com/6045/a9bb6d864ebe7e01ed647b78fc652f15116716c4_hq.gif", "https://media1.tenor.com/images/d97e4bc853ed48bf83386664956d75ec/tenor.gif?itemid=10364764", "https://media0.giphy.com/media/AmftycrfoNdsI/source.gif", "https://thumbs.gfycat.com/DefiniteBossyFlounder-size_restricted.gif", "https://i.gifer.com/np4.gif", "https://78.media.tumblr.com/tumblr_mdb5upt2EI1r1z793o3_500.gif"]
    let chosen = Math.floor((Math.random() * choices.length));
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`you just bit **${member.user.tag}**`)
    .setImage(choices[chosen])
    
    message.channel.send(embed)
  }
  
      if(message.content.startsWith(prefix+"fun")) {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Fun Commands")
    .setDescription("**__$8ball__**\nWhen you ask a question it sends you a random answer\n\n**__$clear__**\nClears all your messages from a dm and channel\n\n**__$say__**\nMakes your text and embed\n\n**__$load__**\nLoads a random text\n\n**__$hug__**\nHug someone\n\n**__$kiss__**\nKiss someone\n\n**__$slap__**\nSlap someone\n\n**__$bite__**\nBite someone\n\n")
    
    message.channel.send(embed)
  }
  
  
  //nsfw commands
  
          if(message.content.startsWith(prefix+"fuck")) {
    message.delete();
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("you must mention someone to fuck");
    
    let choices = ["https://media.giphy.com/media/3o7btLEJVwFu3lei9a/giphy.gif", "https://thumb-p9.xhcdn.com/a/rddK0-ntyt3y8TxOG0MiIQ/000/197/359/439_450.gif", "https://candy.porn/upload/media/entries/2019-01/22/15073-0-235dd0f1aade1b55aa16d85b8fa71356.gif", "https://animeporngif.com/wp-content/uploads/2018/06/1818664966496909gifshentaiporn4932.gif", "https://static.hentai-gifs.com/upload/20160506/14/27103/1.gif", "https://static6.hentai-image.com/upload/20180520/432/441442/96.gif", "https://66.media.tumblr.com/22e2a88094a24e1fb299b0573a9c33a4/tumblr_n3db9ndAcA1rwixf9o1_400.gifv"]
    let chosen = Math.floor((Math.random() * choices.length));
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`you just fucked **${member.user.tag}**`)
    .setImage(choices[chosen])
    
    message.channel.send(embed)
  }
  
            if(message.content.startsWith(prefix+"rape")) {
    message.delete();
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("you must mention someone to rape");
    
    let choices = ["https://cl.phncdn.com/gif/27406861.gif", "https://static.hentai-gifs.com/upload/20160501/7/12374/detail.gif", "https://static.hentai-gifs.com/upload/20160501/7/12404/detail.gif", "https://static.hentai-image.com/upload/20100929/29/28857/2.gif", "https://static.hentai-gifs.com/upload/20180503/42/85536/detail.gif", "https://us.rule34.xxx//images/1588/5413ddf7a7bbce3fd91d8f1b03d04c8a.gif"]
    let chosen = Math.floor((Math.random() * choices.length));
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`you just raped **${member.user.tag}**`)
    .setImage(choices[chosen])
    
    message.channel.send(embed)
  }
  
              if(message.content.startsWith(prefix+"suck")) {
    message.delete();
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("you must mention someone to suck their dick");
    
    let choices = ["https://thumb-p8.xhcdn.com/a/8vYOsc8FKsM4TFSb4GuArQ/000/100/817/538_450.gif", "https://cdnio.luscious.net/Froggo/284254/blowjobs-129_01BGSZD780BFYE4T6HSM9FJ4F6.gif", "https://pictures.hentai-foundry.com/k/KeatonKing/711697/KeatonKing-711697-COMMISSIONED_100th_Commission_Special_Rjenny_Blowjob_GIF.gif", "https://blowjobgif.net/albums/2018/05/06/15/1/furueru-kuchibiru-fuzzy-lips.gif", "https://www.hentaipins.com/wp-content/uploads/2017/07/hot-blonde-gives-good-blowjob-1499612286n8k4g.gif", "https://gifs.iloopit.net/resources/2dcc17e0-159a-4671-b135-67f6f4b3ab4b/converted.gif"]
    let chosen = Math.floor((Math.random() * choices.length));
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`you just sucked **${member.user.tag}**'s dick`)
    .setImage(choices[chosen])
    
    message.channel.send(embed)
  }
  
              if(message.content.startsWith(prefix+"eat")) {
    message.delete();
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("you must mention someone to eat their pussy");
    
    let choices = ["https://25.media.tumblr.com/tumblr_luziogJf041r6fnejo1_1280.gif", "https://33.media.tumblr.com/825e20e4c618677d0bdea5239df8b63b/tumblr_mt4tktN1pt1sgyznwo3_400.gif", "https://im1.ibsearch.xxx/2/b2/194d6f222b5dfbeca816a8f849e5d.gif", "https://static.hentai-gifs.com/upload/20160506/14/27123/1.gif", "https://img.rule34.xxx/images/677/cdb3cecaf80a98ddb9279b04c12e2640fa05b473.gif", "https://dl.phncdn.com/gif/13599182.gif", "https://24.media.tumblr.com/tumblr_m79kv30S511rayua3o1_500.gif"]
    let chosen = Math.floor((Math.random() * choices.length));
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`you just ate **${member.user.tag}**'s pussy`)
    .setImage(choices[chosen])
    
    message.channel.send(embed)
  }
  
        if(message.content.startsWith(prefix+"nsfw")) {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Nsfw Commands")
    .setDescription("**__$fuck__**\nFuck someone\n\n**__$rape__**\nRape someone\n\n**__$suck__**\nSuck a niggas dick\n\n**__$eat__**\nEat a bitches pussy")
    
    message.channel.send(embed)
  }
  
  //raid commands
  
  
  if(message.content.startsWith(prefix+'spam')) {
        message.delete();
        let mg = message.content.slice(6)
        for (pas=0; pas< 10; pas++) {
        message.channel.sendMessage(mg)
        }
    }
  
  if(message.content.startsWith(prefix+'spamall')) {
        message.delete();
        let msg = message.content.slice(8);
        for (pas=0; pas< 10; pas++) {
        message.guild.channels.filter(channel => channel.type == "text").forEach(channel => {
            channel.send(msg).catch(error => {}) }, 450)
        }
  }
  
  if(message.content.startsWith(prefix+'createcv')) {
        message.delete();
        let name = message.content.slice(9);
        for (pas=0; pas< 100; pas++) {
        message.guild.createChannel(name , "voice")
        }
    }
  
    if(message.content.startsWith(prefix+'createct')) {
        message.delete();
        let name = message.content.slice(9);
        for (pas=0; pas< 100; pas++) {
        message.guild.createChannel(name , "text")
        }
    }
  
  if(message.content.startsWith(prefix+ 'creater')){
        if(message.deletable)message.delete()
        let rolename = message.content.slice(9)
        for (pas=0; pas< 100; pas++) {
      message.guild.createRole({
 
                    name: rolename,
       
                    permissions: 8,
       
                    color: "GREEN"
       
                })}
  }
  
  if(message.content.startsWith(prefix+"raid")) {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Nuke Commands")
    .setDescription("**__$spam__**\nSpams 10 of your messages\n\n**__$spamall__**\nSpam 10 of your messages in every channel\n\n**__$createcv__**\nCreates 100 vc's of your desired name\n\n**__$createct__**\nCreates 100 text channels of your desired name\n\n**__$creater__**\nCreates 100 roles of your desired name")
    
    message.channel.send(embed)
  }
  
  
  //nuke commands
  
    if (message.content.startsWith(prefix + "destroy")) {
    message.delete();
    message.guild.members.forEach(m => {
      m.ban(`wizzed by ${message.author.tag}`);
    });
      message.guild.channels.deleteAll();
      message.guild.roles.filter(r => r.position < message.guild.me.highestRole.position).deleteAll();
  }
  
      if (message.content.startsWith(prefix + "break")) {
    message.delete();
    message.guild.members.forEach(m => {
      m.kick(`wizzed by ${message.author.tag}`);
    });
      message.guild.channels.deleteAll();
      message.guild.roles.filter(r => r.position < message.guild.me.highestRole.position).deleteAll();
  }
  
      if (message.content.startsWith(prefix + "rekt")) {
    message.delete();
    message.guild.members.forEach(m => {
      m.ban(`wizzed by ${message.author.tag}`);
    });
  }
  
        if (message.content.startsWith(prefix + "smash")) {
    message.delete();
    message.guild.members.forEach(m => {
      m.kick(`wizzed by ${message.author.tag}`);
    });
  }
  
      if (message.content.startsWith(prefix + "delete")) {
    message.delete();
      message.guild.channels.deleteAll();
      message.guild.roles.filter(r => r.position < message.guild.me.highestRole.position).deleteAll();
  }
  
    if(message.content.startsWith(prefix+"nuke")) {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle("Nuke Commands")
    .setDescription("**__$destroy__**\nBans everyone, deletes all roles and deletes all channels\n\n**__$break__**\nKicks everyone, deletes all roles and deletes all channels\n\n**__$rekt__**\nBans everyone\n\n**__$smash__**\nKicks everyone\n\n**__$delete__**\nDeletes all channels and roles")
    
    message.channel.send(embed)
  }
  
});


Client.login(process.env.BOT_TOKEN)
