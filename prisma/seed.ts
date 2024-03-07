// /* eslint-disable @typescript-eslint/no-misused-promises */

// import { sawblades } from "./sawblades";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   for (const post of sawblades) {
//     await prisma.sawblades.create({
//       data: post,
//     });
//   }
// }

// main()
//   .catch((e) => {
//     console.log(e);
//     console.log("Error: Seed failed");
    
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });