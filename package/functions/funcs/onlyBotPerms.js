const keyPerms = require("../../util/permissions")
const embed = require("../../Handler/parsers.js"). ErrorHandler

module.exports = async d => {
    const code = d.command.code

    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return d.error(err)

    const fields = inside.splits

    const errorMsg = fields.pop()

    const perms = []

    for (const field of fields) {
        const perm = keyPerms[field]

        if (!perm) return d.error(`:x: Invalid perm '${field}' in \`$onlyBotPerms${inside}\``)

        else perms.push(perm)
    }

    if (!d.message.guild.me.hasPermission(perms)) return embed(d, errorMsg)

    return {
        code: code.replaceLast(`$onlyBotPerms${inside}`, "")
    }
}
