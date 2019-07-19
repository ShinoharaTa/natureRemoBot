const Command = new require(process.cwd() + "/src/Model/Command")
const utils = require(process.cwd() + "/src/utils")

module.exports = class extends Command {
    constructor() {
        super()
        this.name = "kaden"
        this.enable = true
        this.hide = false
        this.shortHelp = "現在の状態を取得します"
        this.help = {
            " ": [
                ""
            ]
        }
    }

    async call(client, message, args) {
        args.shift()
        let natureRemo = process.Updater
        let embed = this.embed(client)
        let config = process.CoreConfig

        let devices = await natureRemo.getAppliances()
        // console.log(devices)
        devices.forEach(device => {
            let name = device.nickname;
            let val = "1";
            switch (device.type) {
                case "AC":
                    // console.log(device.aircon.range)
                    // name = "エアコン"
                    val = "状態：" + device.settings.button
                    break
                case "LIGHT":
                    // name += " :flashlight:"
                    val = "電源：" + device.light.state.power
                    break
                default:
            }
            embed.fields.push({
                name: name,
                value: val,
                inline: true
            })
        });

        message.channel.send(message.author, { embed: embed })
        this.good(message)
    }
}