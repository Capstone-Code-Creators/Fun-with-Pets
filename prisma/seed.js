const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()



const main = async() => {
    // Create Users
    await prisma.user.create({
        data: {
            firstName: "Shaggy",
            lastName: "Rogers",
            username: "ZoinksScoob68",
            location: "Crystal Cove, California",
            email: "makingSandwichesShaggy@mysteryinc.com",
            profilePic: "https://static.wikia.nocookie.net/oneyplays/images/8/82/Shaggy_Rogers.png/revision/latest/scale-to-width-down/1000?cb=20180907203725",
            password: 'ripCaseyKasem2014'
        },
    });
    await prisma.user.create({
        data: {
            firstName: "Jon",
            lastName: "Arbuckle",
            username: "selfInsertJim",
            location: "Muncie, Indiana",
            email: "poorCartoonist@pawsinc.com",
            profilePic: "https://i.kym-cdn.com/entries/icons/original/000/039/527/jon-arbuckle-dancing.jpg",
            password: 'dontHitOdie1976'
        },
    });
    await prisma.user.create({
        data: {
            firstName: "Tommy",
            lastName: "Baumeister",
            username: "TommyB",
            location: "Mineapolis, Minnesota",
            email: "TommyB@petbook.com",
            password: 'TOMMYB123'
        },
    });
    await prisma.user.create({
        data: {
            firstName: "Boone",
            lastName: "Waldvogel",
            username: "BooneW",
            location: "Toledo, Ohio",
            email: "BooneW@petbook.com",
            password: 'BOONEW123'
        },
    });
    await prisma.user.create({
        data: {
            firstName: "Nathan",
            lastName: "Kim",
            username: "NathanK",
            location: "Queens, New York",
            email: "NateK@petbook.com",
            password: 'NathanK123'
        },
    });

    
};

main();