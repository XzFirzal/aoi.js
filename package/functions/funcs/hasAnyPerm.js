const permissions = require("../../util/permissions") 

module.exports = async d => {
    const code = d.command.code 
    
    const inside = d.unpack()
	const err = d.inside(inside)

	if (err) return d.error(err)
    
    const fields = inside.splits
    
    const userID = (Number(fields[0]) && fields[0].length > 17 && fields[0].length <= 19) ? fields.shift() : d.message.author.id 
    
    const member = await d.message.guild.members.fetch(userID).catch(err => null)
        
    if (!member) return d.error(`❌ Invalid user ID in \`$hasAnyPerm${inside}\``) 
    
    const perms = fields.map(p => permissions[p])
    
    if (perms.includes(undefined)) return d.error(`Invalid permission given in \`$hasAnyPerm${inside}\``) 
    
    return {
        code: code.replaceLast(`$hasAnyPerm${inside}`, member.permissions.any(perms))
    }
}
