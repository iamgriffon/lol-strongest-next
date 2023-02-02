import { prisma } from "../src/server/utils/prisma"

export async function doBackfill() {

  const championArray: any[] = []

  const parsedJSON: any = await fetch('http://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json').then(data => data.json());
  for (const key in parsedJSON.data) {
    championArray.push(parsedJSON.data[key]);
  }
    const CHAMPIONS_TO_DATABASE = championArray.map((champion, index ) => {
      const { name, title, image } = champion;
      return {
        id: index + 1,
        name,
        title,
        icon: `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${image.full}`,
      }
    });

    console.log(CHAMPIONS_TO_DATABASE);

    const deleteAll = await prisma.champion.deleteMany({});

    const creation = await prisma.champion.createMany({
      data: CHAMPIONS_TO_DATABASE
    });

    console.log("Deleted?", deleteAll)
    console.log("Created?", creation);
};



doBackfill()