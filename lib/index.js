import makeWASocket from './Socket/index.js';
import chalk from "chalk";

console.log(chalk.bold.gray("-----------------------------------------\n"));
console.log(chalk.bold.cyan(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣦⡀⠀⠀⠀⠀⢀⡄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣿⡿⠻⢶⣤⣶⣾⣿⠁⠀⢽⣆⡀⢀⣴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣀⣽⠉⠀⠀⠀⣠⣿⠃⠀⠀⢀⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠴⣾⣿⣀⣀⠀⠀⠈⠉⢻⣦⡀⠚⠻⠿⣿⣿⠿⠛⠂⠀⠀⢀⣧⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠉⢻⣇⠀⣾⣿⣿⣿⣿⣤⠀⠀⣿⠁⠀⠀⠀⢀⣴⣿⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠸⣿⣷⠏⠀⢀⠀⠀⠿⣶⣤⣤⣤⣄⣀⣴⣿⣿⢿⣿⡆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠟⠁⠀⢀⣾⠀⠀⠀⠩⣿⣿⠿⠿⠿⡿⠋⠀⠘⣿⣿⡆⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢳⣶⣶⣿⣿⣅⠀⠀⠀⠙⣿⣆⠀⠀⠀⠀⠀⠀⠛⠿⣿⣮⣤⣀⠀⠀
⠀⠀⠀⠀⠀⠀⣹⣿⣿⣿⣿⠿⠋⠁⠀⣹⣿⠳⠀⠀⠀⠀⠀⠀⢀⣤⣽⣿⣿⠟⠋
⠀⠀⠀⠀⠀⣴⠿⠛⠻⢿⣿⠀⠀⠀⣰⣿⠏⠀⠀⠀⠀⠀⠀⣾⣿⠟⠋⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⣰⣿⣿⣿⣿⣿⣿⣷⣄⢀⣿⣿⡁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠛⠉⠁⠀⠀⠀⠀⠙⢿⣿⣿⠇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀
¤═―— ⎧ 𝚂𝙴𝙽𝚉𝚈 𝙱𝙰𝙸𝙻𝙴𝚈𝚂 ⎭ ⊱―—═¤
Developer: @senzystur
Version: latest
Status: Baileys Berhasil Tersambung
`));
console.log(chalk.bold.gray("--------------------------------------------\n"));
console.log(chalk.bold.cyan("Follow Our Telegram Channel To See Update Information: t.me/FoxsSql\n"));;

export * from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export * from './Store/index.js';
export { makeWASocket };
export default makeWASocket;
//# sourceMappingURL=index.js.map
